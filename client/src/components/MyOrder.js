import { useState } from "react";
import styled from "styled-components";

import PageWrapper from "./PageWrapper";
import ItemLoader from "./ShopPage/ItemLoader";
import CartTable from "./Order/CartTable";

const MyOrder = () => {
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState("idle"); //"loading", "done", "fetch-error"
  const [lastFour, setLastFour] = useState("");

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
        setOrder(data.data);
        console.log("data", data);
        if (data.status === 200) {
          const creditCard = data.data.creditCard;
          setLastFour(creditCard.slice(-4));
          setLoadingStatus("done");
        }
        if (data.status !== 200) {
          setLoadingStatus("fetch-error");
        }
      })
      .catch((error) => {
        setLoadingStatus("fetch-error");
        setOrder(error);
      });
    setOrderId("");
  };

  return (
    <PageWrapper>
      <h1>Enter your order number to search for your order:</h1>
      <StyledDiv>
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
          <StyledInput
            type="text"
            value={orderId}
            required
            onChange={(e) => setOrderId(e.target.value)}
          />
          <StyledButton>Search</StyledButton>
        </StyledForm>
      </StyledDiv>
      <StyledDiv>
        {loadingStatus === "loading" && <ItemLoader />}
        {loadingStatus === "fetch-error" && (
          <>
            <StyledH3>
              Order number: <span>{order}</span> not found.
            </StyledH3>
            <StyledH3>Please contact customer services.</StyledH3>
          </>
        )}
        {loadingStatus === "done" && (
          <>
            <StyledH3>
              This is your order according to your order number :
            </StyledH3>
            <StyledH3>
              <span>{order._id}</span>
            </StyledH3>
            <Confirmwrapper>
              <Orderinfo>
                <span>Order Number: </span> {order._id}
              </Orderinfo>
              <Orderinfo>
                <span>Shipping Address: </span>
                {order.streetAddress}, {order.city}, {order.province}{" "}
                {order.postalCode} {order.country}
              </Orderinfo>
              <Orderinfo>
                <span>Email: </span>
                {order.email}
              </Orderinfo>
              <Orderinfo>
                <span>Payment Information: </span>xxxx-xxxx-xxxx-{lastFour}
              </Orderinfo>
              <Orderinfo>
                <span>Expiry Date: </span>
                {order.expiration}
              </Orderinfo>
              <Orderinfo>
                <span>Total: </span>${order.grandTotal}
              </Orderinfo>
              <Orderinfo>
                <span>Item Summary:</span>
              </Orderinfo>
              <CartTable itemArray={order.products} type="confirmation" />
            </Confirmwrapper>
            <Message>
              Please contact customer services for any question regarding your
              order.
            </Message>
          </>
        )}
      </StyledDiv>
    </PageWrapper>
  );
};

const StyledH3 = styled.h3`
  margin: 10px 0;

  span {
    font-style: italic;
  }
`;

const StyledForm = styled.form`
  margin-bottom: 20px;
`;
const StyledInput = styled.input`
  height: 30px;
  width: 465px;
  padding: 0 10px;
  font-size: 25px;
  margin: 25px 0;
`;
const StyledButton = styled.button`
  height: 35px;
  font-size: 25px;
  margin-left: 10px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

  span {
    font-weight: bold;
  }
`;

const Message = styled.h3`
  margin-top: 40px;
`;

export default MyOrder;
