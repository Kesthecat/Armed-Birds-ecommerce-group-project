import styled from "styled-components";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

//Cart modal that pops up when you click the cart icon
const CartModal = () => {
    const { displayModal, setDisplayModal } = useContext(OrderContext);

    // will use this once we get the add to cart function working on the item details page
    // const {selectedItems} = useContext(OrderContext);

    //dummy array to test formatting
    const selectedItems = [{_id: 43, name: "stuff", price: "44", quantity: 2}]

    //make sure price is a number before doing this
    const orderTotal = selectedItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const handleClose = () => {
        setDisplayModal(false);
    }
    
    return (
        <Modal isDisplay={displayModal}>
                <CloseButton onClick={handleClose}>&times;</CloseButton>
            <ModalContent>
                <h2>Your Cart</h2>
                <CartTable itemArray={selectedItems} />

                <Total>TOTAL: ${orderTotal}</Total>

                <StyledNavLink to="/checkout">CHECKOUT</StyledNavLink>
            </ModalContent>
        </Modal>
    )
}

const Modal = styled.div`
    display: ${props => (props.isDisplay ? 'block' : 'none')};
    position: fixed; 
    z-index: 1; 
    top: 87px;
    right: 10px;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px 5px var(--color-main);
    width: 50vw;
    background-color: white;
    

    h2 {
        margin: 15px 0 20px 0;
    }

`
const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CloseButton = styled.span`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    font-size: 30px;

    &:hover{
        color: var(--color-background);
    }
    
`
const Total = styled.h4`
    margin: 15px 0;
`

const StyledNavLink = styled(NavLink)`
    font-size: 22px;
    font-family: var(--font-heading);
    text-decoration: none;
    background-color: var(--color-main);
    color: white;
    padding: 12px 18px;
    border-radius: 5px;
    margin: 10px 0;
`
export default CartModal; 