import styled from "styled-components";
import PageWrapper from "../PageWrapper";
import CartTable from "./CartTable";
import { useContext } from "react";
import ProductsLoading from "../ShopPage/ProductsLoading";
import { OrderContext } from "./OrderContext";

const Confirmation = () => {
  //the lastOrder object is the exact order object that has been sent to the server
  //the itemsPurchased object is an array of the items purchased with details -- this
  //array will be used in the call to CartTable below (see **** ) to render the items
  //purchased
  //itemsPurchased has shape [{_id, name, imageSrc, price, quantity, itemTotal}]
  //since we have these in state, we don't need to do a fetch for the confirmation
  const {
    lastOrder,
    state: { itemsPurchased, status },
    actions: { afterPurchaseReset },
  } = useContext(OrderContext);
  console.log("last order", lastOrder, "itemsPurchased", itemsPurchased);

  if (status === "order-processing") {
    return <ProductsLoading />;
  } else {
    //****************************
    //need to have this reset state for the order context, so include this call right before your return
    //   afterPurchaseReset();

    //*********************
    //use cartTable component in the return to render the items purchased -- can go before or after all
    //the order information you are displaying

    let lastFour = lastOrder.creditCard.slice(-4);

    afterPurchaseReset();

    return (
      <PageWrapper>
        <h1>Thank you for your order!</h1>
        <Confirmwrapper>
          <Orderinfo>Order Number: {lastOrder._id}</Orderinfo>
          <Orderinfo>
            Shipping Address: {lastOrder.streetAddress}, {lastOrder.city},{" "}
            {lastOrder.province} {lastOrder.postalCode} {lastOrder.country}
          </Orderinfo>
          <Orderinfo>Email: {lastOrder.email}</Orderinfo>
          <Orderinfo>Payment Information: xxxx-xxxx-xxxx-{lastFour}</Orderinfo>
          <Orderinfo>Expiry Date: {lastOrder.expiration}</Orderinfo>
          <Orderinfo>Total: ${lastOrder.grandTotal}</Orderinfo>
          <Orderinfo>Item Summary:</Orderinfo>
          <CartTable itemArray={itemsPurchased} type="confirmation" />
        </Confirmwrapper>
      </PageWrapper>
    );
  }
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

export default Confirmation;
