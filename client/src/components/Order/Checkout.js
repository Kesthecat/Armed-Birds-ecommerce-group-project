import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";
import styled from "styled-components";

const Checkout = () => {

    const {
        state: { itemsToPurchase, error, status },
        actions: { cancelOrderProcess, orderRequested, orderFailure, 
            orderSuccess },
            setDisplayModal, setLastOrder
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

  let subtotal = itemsToPurchase.reduce((acc, item) => {
        console.log("item total ltype", typeof item.itemTotal)
        return acc + Number(item.itemTotal);
      }, 0);

  console.log("subtot", subtotal, typeof subtotal)


  let taxes = Number((0.149975*subtotal).toFixed(2));


  //close modal
  setDisplayModal(false);

  // discount handle
  const discountCodes = [
    { code: "ARMED", reduction: 0.25 },
    { code: "SUMMER", reduction: 0.1 },
  ];
  const handleSubmitDiscount = (e) => {
    setDiscountMsg("");
    e.preventDefault();

    const discountObj = discountCodes.find(
      (discount) => discount.code === discountCode
    );
    if (!discountObj) {
        setDiscountMsg("Discount not valid.");
        return;
    }
    setDiscountedAmount((subtotal * discountObj.reduction)*-1);
    setDiscountMsg(`${discountCode} discount applied!`)
  };

  let total = (subtotal - discountedAmount + taxes + SHIPPING);


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

    //check to see if customer has entered a complete Canadian address:
    
    //check whether country code is valid 
    if ((country.toLowerCase().trim() !== 'canada' && country.toLowerCase().trim() !== 'ca')) {
      setFormError("We can only deliver to Canadian addresses, sorry :(")
        return;
    }

    //check whether province entered is valid
    console.log("prov type", typeof province)
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

    // array of products to purchase formatted to server expectation
    let products = itemsToPurchase.map((item) => { 
        return {
            productId: item._id, 
            quantity: item.quantity
        }
    });

    console.log( "products", products);

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
        postalCode: expiration,
        grandTotal: total
    }

    orderRequested();

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

            console.log("order posted response", data)

            if (data.status === 200) {
            
                //keep this order in state for the confirmation page
                setLastOrder(data.data);
                
                //redirect to confirmation page
                history.push("./confirmation");
                
                //reset order state and empty the cart
                orderSuccess();
            }
            //any other errors
            else {
                orderFailure(data.message);
                console.log("order failed", data.message)
            }

        })
        .catch((err) => {
            console.log("500", err)
            orderFailure(err);

        })
  }

  const handleCancelOrder = () => {
    cancelOrderProcess();
    history.push("/shop");
  }

  //this done here or conditional rendering in app
  if (status === "order-processing") {
      //loading component
  }
 
  return (
    <PageWrapper>
      <h1>CHECKOUT</h1>
      <CartTable itemArray={itemsToPurchase} />

    <SummaryWrapper>
        <DiscountWrapper>
            <div>
                <SubtotalChanges>DISCOUNT CODE: </SubtotalChanges>
                <StyledFormDiscount onSubmit={(e) => handleSubmitDiscount(e)}>
                    <input type="text" placeholder="ex: ARMED" onChange={(e) => setDiscountCode(e.target.value)}/>
                </StyledFormDiscount>
            </div>

                <Message>{discountMsg}</Message>

        </DiscountWrapper>
        <TotalWrapper>
            <SubtotalChanges>
            SUBTOTAL:  ${subtotal.toFixed(2)}
            </SubtotalChanges>
            <SubtotalChanges>
            DISCOUNT: ${discountedAmount.toFixed(2)}
            </SubtotalChanges>
            <SubtotalChanges>
            TAXES: ${taxes.toFixed(2)}
            </SubtotalChanges>
            <SubtotalChanges>SHIPPING: ${SHIPPING.toFixed(2)}</SubtotalChanges>
            <SubtotalChanges>
            TOTAL: ${total.toFixed(2)}
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
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </Wrapper>
          <StyledInput
            type="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Apt# - Street Address"
            required
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <Wrapper>
            <StyledInput
              type="text"
              placeholder="City"
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Postal Code"
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Wrapper>
          <Wrapper>
            <StyledInput
              type="text"
              placeholder="Province/State"
              required
              onChange={(e) => setProvince(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="Country"
              required
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
              required
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


const SubtotalChanges = styled.p`
    font-family: "Poppins";
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
    input {
        margin-left: 10px;
}`;


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
  /* border: 2px solid red; */
`;
const RightWrapper = styled.div`
  /* border: 2px solid orange; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  /* border: 2px solid green; */
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
`

const ConfirmBtn = styled.button`

    text-align: center;
    font-size: 25px;
    font-family: var(--font-heading);
    background-color: var(--color-main);
    color: white;
    padding: 15px 18px;
    margin: 10px 0;
    width: 300px;


  transition: 0.1s ease-in-out;

  &:hover {

    transform: scale(1.05);
  }
`;

const CancelButton = styled.button`
    color: var(--color-main);
    background-color: white;
    width: 200px;
    font-size: 18px;
    align-self: center;

`

export default Checkout;
