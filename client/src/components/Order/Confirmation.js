import styled from "styled-components";
import PageWrapper from "../PageWrapper";
import CartTable from "./CartTable";
import { useContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import ProductsLoading from "../ShopPage/ProductsLoading";
import { OrderContext } from "./OrderContext";

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

const Confirmation = () => {

  const {
    lastOrderId,
    state: { status },
    actions: { afterPurchaseReset },
  } = useContext(OrderContext);
  console.log("last order", lastOrderId);

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
          console.log("fetch last order data", data, data.data);
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

    let lastFour = "";
    if (lastOrder.order) {
      lastFour = lastOrder.order.creditCard.slice(-4);
    }
    
    const handleClick = () => {
      history.push("/");
      afterPurchaseReset();
    }
    
    if (status === "order-processing" || lastOrder.status === "loading") {
        return <ProductsLoading />;
      } 

    return (
      <PageWrapper>
        <h1>Thank you for your order!</h1>
        <Confirmwrapper>
          <Orderinfo>Order Number: {lastOrder.order._id}</Orderinfo>
          <Orderinfo>
            Shipping Address: {lastOrder.order.streetAddress}, {lastOrder.order.city},{" "}
            {lastOrder.order.province} {lastOrder.order.postalCode} {lastOrder.order.country}
          </Orderinfo>
          <Orderinfo>Email: {lastOrder.order.email}</Orderinfo>
          <Orderinfo>Payment Information: xxxx-xxxx-xxxx-{lastFour}</Orderinfo>
          <Orderinfo>Expiry Date: {lastOrder.order.expiration}</Orderinfo>
          <Orderinfo>Total: ${lastOrder.order.grandTotal}</Orderinfo>
          <Orderinfo>Item Summary:</Orderinfo>
          <CartTable itemArray={lastOrder.order.products} type="confirmation" />
        </Confirmwrapper>

        <ReturnButton onClick={handleClick}>BACK TO ARMED BIRDS!</ReturnButton>
      </PageWrapper>
    );
  };

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
`
export default Confirmation;
