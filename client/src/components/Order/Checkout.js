import { useContext } from "react";
import PageWrapper from "../PageWrapper";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";

const Checkout = () => {

    const { state: { itemsToPurchase }} = useContext(OrderContext);

    const handleSubmit = () => {

    }

    return (
        <PageWrapper>
            <h1>CHECKOUT</h1>
            <CartTable itemArray={itemsToPurchase}/>

            <form>
                
            </form>
        </PageWrapper>
    )
}

export default Checkout;