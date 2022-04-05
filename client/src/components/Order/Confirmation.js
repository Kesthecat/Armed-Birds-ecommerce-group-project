import styled from "styled-components";
import PageWrapper from "../PageWrapper";
import CartTable from "./CartTable";
import { useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import ItemLoader from "../ShopPage/ItemLoader";
import { OrderContext } from "./OrderContext";

//tracking state for load of last order data

const initialState = {
    status: "loading", //idle, fetch-failed
    order: null,
    error: null,
  };

const reducer = (state, action) => {
  switch (action.type) {
    case "order-loaded-from-server": {
      return {
        ...state,
        status: "idle",
        order: action.order,
      };
    }
    case "error-fetching-order-from-server": {
      return {
        ...state,
        status: "fetch-failed",
        error: action.error,
      };
    }
  }
};

//Confirmation Page component
const Confirmation = () => {

  const {
    lastOrderId,
    state: { status },
    actions: { afterPurchaseReset },
  } = useContext(OrderContext);

  const history = useHistory();

  const [lastOrder, dispatch] = useReducer(reducer, initialState);

  //fetch the last order by id from the server
  useEffect(() => {
      fetch(`/get-order/${lastOrderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "order-loaded-from-server",
          order: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "error-fetching-order-from-server",
          error: error,
        });
      });
    }, []);

    //last four digits of the credit card number for formatting
    let lastFour = "";
    if (lastOrder.order) {
      lastFour = lastOrder.order.creditCard.slice(-4);
    }
    
    //redirect to homepage when clicked, and OrderContext state is reset
    const handleClick = () => {
      history.push("/");
      afterPurchaseReset();
    }
    
    //show loading component while order is processing
    if (status === "order-processing" || lastOrder.status === "loading") {
        return <ItemLoader />;
      } 

    return (
      <PageWrapper>
        <h1>Thank you for your order!</h1>

        <Confirmwrapper>
          <Orderinfo><span>Order Number:</span> {lastOrder.order._id}</Orderinfo>
          <Orderinfo>
            <span>Shipping Address:</span> {lastOrder.order.streetAddress}, {lastOrder.order.city},{" "}
            {lastOrder.order.province} {lastOrder.order.postalCode} {lastOrder.order.country}
          </Orderinfo>
          <Orderinfo><span>Email:</span> {lastOrder.order.email}</Orderinfo>
          <Orderinfo><span>Payment Information:</span> xxxx-xxxx-xxxx-{lastFour}</Orderinfo>
          <Orderinfo><span>Expiry Date:</span> {lastOrder.order.expiration}</Orderinfo>
          <Orderinfo><span>Total:</span> ${lastOrder.order.grandTotal}</Orderinfo>
          <Orderinfo><span>Item Summary:</span></Orderinfo>
          <CartTable itemArray={lastOrder.order.products} type="confirmation" />
        </Confirmwrapper>

        <ReturnButton onClick={handleClick}>BACK TO ARMED BIRDS!</ReturnButton>
      </PageWrapper>
    );
  };

const Confirmwrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
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

const ReturnButton = styled.button`
    margin-top: 50px;
    color: var(--color-main);
    background-color: white;
    width: 400px;
    font-size: 18px;
    align-self: center;
`;

export default Confirmation;
