import { useContext, useState } from "react";
import PageWrapper from "../PageWrapper";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";

const Checkout = () => {

    const { state: { itemsToPurchase }, displayModal, setDisplayModal} = useContext(OrderContext);

    //error state to keep track of errors in front end form validation 
    //and messages from server to display to user
    const [error, setError] = useState(null);


    //close modal
    setDisplayModal(false);

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

    //     const newOrder = {
    
    //     }

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
            <CartTable itemArray={itemsToPurchase}/>
{/* 
            <form onSubmit={handleSubmit}>
                
            </form> */}
        </PageWrapper>
    )
}

export default Checkout;