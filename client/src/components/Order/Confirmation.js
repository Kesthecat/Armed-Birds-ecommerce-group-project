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

    return (
      <PageWrapper>
        <h1>Thank you for your order!</h1>
        <Confirmwrapper>
          <Orderinfo>Order Number: 1093874987</Orderinfo>
          <Orderinfo>Item Summary:</Orderinfo>
          <CartTable itemArray={itemsPurchased} type="confirmation" />
        </Confirmwrapper>
      </PageWrapper>
    );
  }
};

const Itemdiv = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  width: max-content;
`;

const Itemimg = styled.img`
  border-radius: 5px;
`;
const Confirmwrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 625px;
  height: max-content;
  background-color: var(--color-background);
  border-radius: 5px;
  margin-top: 50px;
`;

const Orderinfo = styled.h4`
  font-size: 20px;
  padding: 10px;
`;
const Item = styled.p`
  font-size: 20px;
  padding: 10px;
  word-wrap: 400px;
`;

export default Confirmation;
