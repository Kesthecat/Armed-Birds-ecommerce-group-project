import styled from "styled-components";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

//Cart modal that pops up when you click the cart icon
const CartModal = () => {
    const history = useHistory();

    const { displayModal, setDisplayModal, actions: { beginOrderProcess }} = useContext(OrderContext);

    const {selectedItems} = useContext(OrderContext);

    //make sure price is a number before doing this
    const orderTotal = selectedItems.reduce((acc, item) => {
        const priceNum = Number(item.price.slice(1))
        return acc + priceNum * item.quantity;
    }, 0);

    const handleClose = () => {
        setDisplayModal(false);
    }

    const handleClick = () => {
        beginOrderProcess();
        history.push("/checkout");
    }
    
    return (
        <Modal isDisplay={displayModal}>
                <CloseButton onClick={handleClose}>&times;</CloseButton>
            <ModalContent>
                <h2>Your Cart</h2>
                <CartTable itemArray={selectedItems} />

                <Total>TOTAL: ${Math.round(orderTotal*100)/100}</Total>

                <Button onClick={handleClick} disabled={(selectedItems.length === 0)}>CHECKOUT</Button>
    
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
    overflow: scroll;
    

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

const Button = styled.button`
    text-align: center;
    font-size: 25px;
    font-family: var(--font-heading);
    background-color: var(--color-main);
    color: white;
    padding: 15px 18px;
    border-radius: 5px;
    margin: 10px 0;
    width: 200px;
    cursor: pointer;
`

export default CartModal; 