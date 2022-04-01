import { useContext, useState } from "react";
import PageWrapper from "../PageWrapper";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";
import styled from "styled-components";

const Checkout = () => {
  const {
    state: { itemsToPurchase },
    displayModal,
    setDisplayModal,
  } = useContext(OrderContext);

  //error state to keep track of errors in front end form validation
  //and messages from server to display to user
  const [error, setError] = useState(null);
  // useState to save all the inputs
  const [products, setProducts] = useState([]);
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

  //close modal
  setDisplayModal(false);

  //temporary handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("Temporary handleSubmit response.");
  };

  // const handleSubmit = (e) => {

  //     e.preventDefault();
  //     beginOrderProcess();

  //     //validate to if any of the fields are empty and set the appropriate error message
  //     if (!firstName || !lastName || !streetAddress || !city || !province || !country || !email || !postalCode) {
  //         setError("All fields are required!")
  //         return;
  //     }

  //     if (!creditCard || !expiration) {
  //         setError("Payment information is required!")
  //         return;
  //     }

  //     //need to validate if some of the fields are in the correct format
  //     //TODO

  // const newOrder = {
  // products: itemsToPurchase,
  // firstName: firstName,
  // lastName: lastName,
  // streetAddress: streetAddress,
  // city: city,
  // province: province,
  // country: country,
  // email: email,
  // creditCard: creditCard,
  // expiration: expiration,
  // postalCode: expiration
  // }

  //     fetch("/add-order", {
  //         method: "POST",
  //         body: JSON.stringify(newOrder),
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //         },
  //     })
  //         .then((res) => {
  //             return res.json()})
  //         .then((data) => {

  //             console.log("order posted response", data)

  //            if (data.status === 200) {
  //                //redirect to confirmation page
  //               history.push("./confirmation");
  //            }

  //         })
  //         .catch((err) => {
  //             setError(err);
  //         })
  // }

  //have checkout button disabled if cart is empty
  return (
    <PageWrapper>
      <h1>CHECKOUT</h1>
      <CartTable itemArray={itemsToPurchase} />

      {/* <Styledform onSubmit={handleSubmit}> */}
      <Styledform onSubmit={(e) => handleSubmit(e)}>
        <LeftWrapper>
          <StyledH3>Buyer's infomation</StyledH3>
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
            placeholder="Number Street appt"
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
              required
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Wrapper>
          <BtnWrapper>
            <ConfirmBtn>Confirm Order</ConfirmBtn>
          </BtnWrapper>
        </RightWrapper>
      </Styledform>
    </PageWrapper>
  );
};

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
const ConfirmBtn = styled.button`
  margin-top: 50px;
  height: 80px;
  width: 350px;
  font-size: 40px;
  transition: 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export default Checkout;
