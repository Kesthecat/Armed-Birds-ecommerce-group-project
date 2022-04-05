import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";
import styled from "styled-components";

const Checkout = () => {

  const {
      state: { error },
      actions: { cancelOrderProcess, orderRequested, orderFailure, 
          orderSuccess }, selectedItems,
          setDisplayModal, setLastOrderId
      } = useContext(OrderContext);
      
  //shipping is a flat rate for now
  const SHIPPING = 10.00;

  const history = useHistory();

  //error state to keep track of errors in front end form validation
  const [formError, setFormError] = useState(null);

  //discount amount
  const [discountedAmount, setDiscountedAmount] = useState(0);
  //msg to show discount status
  const [discountMsg, setDiscountMsg] = useState("");

  // useState to save all the inputs
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [streetAddress, setStreetAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState(null);
  const [creditCard, setCreditCard] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [discountCode, setDiscountCode] = useState(null);

  let subtotal = selectedItems.reduce((acc, item) => {
        return acc + Number(item.itemTotal);
      }, 0);

  //GST only
  let taxes = Number((0.05*subtotal).toFixed(2));

  //close CartModal if we enter Checkout
  setDisplayModal(false);

  //discount codes -- these would be stored in the database for a deployment ready situation
  const discountCodes = [
    { code: "ARMED", reduction: 0.25 },
    { code: "SUMMER", reduction: 0.1 },
  ];

  //handling when a user submits a discount
  const handleSubmitDiscount = (e) => {
    setDiscountMsg("");
    e.preventDefault();

    //search to see if the code entered is valid
    const discountObj = discountCodes.find(
      (discount) => discount.code === discountCode
    );

    if (!discountObj) {
        setDiscountMsg("Discount not valid.");
        return;
    }

    //set reduction and result message
    setDiscountedAmount((subtotal * discountObj.reduction)*-1);
    setDiscountMsg(`${discountCode} discount applied!`)
  };

  //final order total
  let total = (Math.round((subtotal - discountedAmount + taxes + SHIPPING)*100)/100).toFixed(2);

  //handling the submit of an order
  const handleSubmit = (e) => {

      e.preventDefault();

      //validate to if any of the fields are empty and set the appropriate error message
      if (!firstName || !lastName || !streetAddress || !city || !province || !country || !email || !postalCode) {
          setFormError("All fields are required!")
          return;
      }

      if (!creditCard || !expiration) {
          setFormError("Payment information is required!")
          return;
      }

      //did not set shape for the credit card and expiration to make testing of the Checkout easier
      if (isNaN(+creditCard)) {
        setFormError("Credit card number must be in numerals, no spaces.")
          return;
      }

      if (isNaN(+expiration)) {
        setFormError("Expiration date must be in MMYY numeric form.")
          return;
      }

      const provinces = [ "newfoundland", "nl", 
                        "prince edward island", "pe",
                        "nova scotia", "ns", 
                        "new brunswick", "nb", 
                        "quebec", "qc", 
                        "ontario", "on", 
                        "manitoba", "mb", 
                        "saskatchewan", "sk", 
                        "alberta", "ab", 
                        "british columbia", "bc", 
                        "yukon", "yt", 
                        "northwest territories", "nt", 
                        "nunavut", "nu"]

    //We are only shipping to Canada so check to see if customer has entered a complete Canadian address:
    
    //check whether country code is valid 
    if ((country.toLowerCase().trim() !== 'canada' && country.toLowerCase().trim() !== 'ca')) {
      setFormError("We can only deliver to Canadian addresses, sorry :(")
        return;
    }

    //check whether province entered is valid
    const isValidProvince = provinces.some((prov) => prov === province.toLowerCase());
    if (!isValidProvince) {
        setFormError("Please enter a Canadian province.")
        return;
    }

    //check whether address and city are non-empty, and whether postal code is 6 characters 
    if (streetAddress.trim().length === "" || postalCode.split(" ").join("").length !== 6 || city.trim().length === "") {
        setFormError("Please enter a valid address.")
        return;
    }

    //check validity of name entries
    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
        setFormError("Please enter your full name.")
        return;
    }

    //check validity of email
    if (email.trim().length < 3 || !(email.includes("@"))) {
        setFormError("Please enter a valid email address.")
        return;
    }

    // array of products to purchase to send to server
    let products = selectedItems.map((item) => { 
        return {
            productId: item._id, 
            name: item.name,
            price: item.price,
            quantity: item.quantity, 
            imageSrc: item.imageSrc,
        }
    });

    //order object to submit to server
    const newOrder = {
        products: products,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        city: city,
        province: province,
        country: country,
        email: email,
        creditCard: creditCard,
        expiration: expiration,
        postalCode: postalCode,
        grandTotal: total
    }

    //update state of the order in OrderContext
    orderRequested();

    //submit order
    fetch("/add-order", {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            return res.json()})
        .then((data) => {
            //if posting order succeeds
            if (data.status === 200) {
                //keep this order id in session storage for the confirmation page
                setLastOrderId(data.data._id);
                
                //redirect to confirmation page
                history.push("./confirmation");
                
                //reset order state and empty the cart
                orderSuccess();
            }
            //for any other non-500 errors, keep track of server message
            else {
                orderFailure(data.message);
            }
        })
        .catch((err) => {
            orderFailure(err);
        })
  }

  //if user clicks cancel order on Checkout page, they are redirected to 
  //the Shop Page but the cart is still kept in session storage
  const handleCancelOrder = () => {
    cancelOrderProcess();
    history.push("/shop");
  }
 
  return (
    <PageWrapper>
      <PageTitle>CHECKOUT</PageTitle>
      <CartTable itemArray={selectedItems} type="checkout" />

    <SummaryWrapper>
        <DiscountWrapper>
            <div>
                <SubtotalChanges>DISCOUNT CODE: </SubtotalChanges>
                <StyledFormDiscount onSubmit={(e) => handleSubmitDiscount(e)}>
                    <input type="text" placeholder="ex: ARMED" onChange={(e) => setDiscountCode(e.target.value)}/>
                    <button>Add discount</button>
                </StyledFormDiscount>
            </div>

                <Message>{discountMsg}</Message>

        </DiscountWrapper>
        <TotalWrapper>
            <SubtotalChanges>
            SUBTOTAL:  ${(Math.round(subtotal*100)/100).toFixed(2)}
            </SubtotalChanges>
            <SubtotalChanges>
            DISCOUNT: ${(Math.round(discountedAmount*100)/100).toFixed(2)}
            </SubtotalChanges>
            <SubtotalChanges>
            TAXES: ${(Math.round(taxes*100)/100).toFixed(2)}
            </SubtotalChanges>
            <SubtotalChanges>SHIPPING: ${SHIPPING.toFixed(2)}</SubtotalChanges>
            <SubtotalChanges>
            TOTAL: ${(Math.round(total*100)/100).toFixed(2)}
            </SubtotalChanges>
        </TotalWrapper>
      </SummaryWrapper>  

      <Styledform onSubmit={(e) => handleSubmit(e)}>
        <LeftWrapper>
          <StyledH3>Your information</StyledH3>
          <Wrapper>
            <StyledInput
              type="text"
              placeholder="First Name"   
              onChange={(e) => setFirstName(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Wrapper>
          <StyledInput
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Apt# - Street Address"
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <Wrapper>
            <StyledInput
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Postal Code"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Wrapper>
          <Wrapper>
            <StyledInput
              type="text"
              placeholder="Province/State"
              onChange={(e) => setProvince(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Wrapper>
        </LeftWrapper>
        <RightWrapper>
          <StyledH3>Payment information</StyledH3>
          <Wrapper>
            <StyledInput
              type="text"
              placeholder="Credit Card number"
              onChange={(e) => setCreditCard(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="expiration"
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Wrapper>
          <Message>{formError}{error}</Message>
          <BtnWrapper>
            <ConfirmBtn>CONFIRM ORDER</ConfirmBtn>
          </BtnWrapper>
            <CancelButton onClick={handleCancelOrder}>CANCEL ORDER</CancelButton>
        </RightWrapper>
      </Styledform>
    </PageWrapper>
  );
};

const PageTitle = styled.h1`
    font-size: 64px;
    letter-spacing: 15px;
    font-weight: bold;
    margin: 20px 20px 30px 20px;
`

const SubtotalChanges = styled.p`
    font-family: var(--font-subheading);
`;

const SummaryWrapper = styled.div`
    display: flex;
    justify-content: space-around;
   
    div {
        margin: 25px;
    }
`

const DiscountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
    }
`;

const StyledFormDiscount = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    input {
        margin-left: 10px;
    }

    button {
      padding: 6px 12px;
      font-family: var(--font-heading);
      font-size: 13px;
      margin: 5px 0;
    }
`;


const TotalWrapper = styled.div`
    right: 0;
    text-align: right;

    p {
        margin: 7px 0;
    }
`;

const Styledform = styled.form`
  margin-top: 100px;
  display: flex;
  gap: 50px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  font-size: 20px;
  height: 30px;
`;

const StyledH3 = styled.h3`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Message = styled.p`
    text-align: center;
    margin: 8px 0;
    color: var(--color-secondary);
    font-style: italic;
    font-weight: bold;
    height: 25px;
`;

const ConfirmBtn = styled.button`
    text-align: center;
    font-size: 25px;
    font-family: var(--font-heading);
    background-color: var(--color-main);
    color: white;
    padding: 15px 18px;
    margin: 10px 0;
    width: 300px;
`;

const CancelButton = styled.button`
    color: var(--color-main);
    background-color: white;
    width: 200px;
    font-size: 18px;
    align-self: center;
`;

export default Checkout;
