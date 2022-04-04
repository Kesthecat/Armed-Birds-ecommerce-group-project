import { useHistory } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import PageWrapper from "./PageWrapper";
import ItemLoader from "./ShopPage/ItemLoader";
import CartTable from "./Order/CartTable";

const MyOrder = () => {
  //set states for the id, order and loading status
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState("idle"); //"loading", "done", "fetch-error"
  const history = useHistory();

  let lastFour = "";

  const handleClick = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingStatus("loading");

    fetch(`/get-order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        const creditCard = data.data.creditCard;
        console.log("creditCard", creditCard.slice(-4));
        lastFour = creditCard.slice(-4);
        setOrder(data.data);
        setLoadingStatus("done");
      })
      .catch((error) => {
        setLoadingStatus("fetch-error");
        setOrder(error);
      });
  };
  console.log("id", orderId);
  console.log("order", order);
  //   console.log("order credicard", order.creditCard);

  //   if (.order) {
  //      = data.creditCard.slice(-4);
  //   }

  return (
    <PageWrapper>
      <h1>Enter your order number to search for your order:</h1>
      <div>
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => setOrderId(e.target.value)} />
          <button>Search</button>
        </StyledForm>
      </div>
      <div>
        {loadingStatus === "loading" && <ItemLoader />}
        {loadingStatus === "fetch-error" && <h2>{order}</h2>}
        {loadingStatus === "done" && (
          <Container>
            <h2>This is your order accoring to your order number {orderId}</h2>
            <Confirmwrapper>
              <Orderinfo>Order Number: {order._id}</Orderinfo>
              <Orderinfo>
                Shipping Address: {order.streetAddress}, {order.city},{" "}
                {order.province} {order.postalCode} {order.country}
              </Orderinfo>
              <Orderinfo>Email: {order.email}</Orderinfo>
              <Orderinfo>
                Payment Information: xxxx-xxxx-xxxx-{lastFour}
              </Orderinfo>
              <Orderinfo>Expiry Date: {order.expiration}</Orderinfo>
              <Orderinfo>Total: ${order.grandTotal}</Orderinfo>
              <Orderinfo>Item Summary:</Orderinfo>
              <CartTable itemArray={order.products} type="confirmation" />
            </Confirmwrapper>
          </Container>
        )}
      </div>

      <ReturnButton onClick={handleClick}>BACK TO ARMED BIRDS!</ReturnButton>
    </PageWrapper>
  );
};

const StyledForm = styled.form``;
const Container = styled.div``;

const Confirmwrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 1000px;
  height: max-content;
  border-radius: 5px;
  margin-top: 50px;
  border: 1px solid white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 4px 14px 1px rgba(125, 125, 125, 0.63);
  box-shadow: 0px 4px 14px 1px rgba(125, 125, 125, 0.63);
`;

const Orderinfo = styled.p`
  font-size: 20px;
  padding: 10px;
  font-weight: bold;
`;

const ReturnButton = styled.button`
  margin-top: 50px;
  color: var(--color-main);
  background-color: white;
  width: 400px;
  font-size: 18px;
  align-self: center;
`;
export default MyOrder;
