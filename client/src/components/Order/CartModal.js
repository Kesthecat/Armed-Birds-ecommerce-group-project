import styled from "styled-components";
import { OrderContext } from "./OrderContext";
import CartTable from "./CartTable";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

//Cart modal that pops up when you click the cart icon
const CartModal = () => {
    const history = useHistory();

    const nodeRef = useRef();

    const { displayModal, setDisplayModal, actions: { beginOrderProcess }} = useContext(OrderContext);

    const {selectedItems} = useContext(OrderContext);

    //calculate subtotal of cart so far
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

    //close modal if we click outside of it
    window.onclick = function(event) {
        if (event.target === nodeRef.current) {
            setDisplayModal(false);
        }
        }
        return (
            <Modal isDisplay={displayModal} ref={nodeRef}>
                <ModalContent>
                    <CloseDiv>
                        <CloseButton onClick={handleClose}>&times;</CloseButton>
                    </CloseDiv>
                    <h2>Your Cart</h2>
                    <CartTable itemArray={selectedItems} type="checkout"/>
    
                    <Total>SUBTOTAL:  ${(Math.round(orderTotal*100)/100).toFixed(2)}</Total>
    
                    <Button onClick={handleClick} disabled={(selectedItems.length === 0)}>CHECKOUT</Button>
        
                </ModalContent>
            </Modal>
        )
    }
    
    const Modal = styled.div`
        display: ${props => (props.isDisplay ? 'block' : 'none')};
        position: fixed; 
        z-index: 1; 
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        overflow: auto; 
        
        h2 {
            font-size: 30px;
            margin-bottom: 10px;
        }
    `
    const ModalContent = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 10px 30px 30px 30px;
        border-radius: 5px;
        box-shadow: 0 0 10px 5px var(--color-main);
        width: 50vw;
        margin-left: 50vw;
        margin-top: 83px;
    `
    const CloseDiv = styled.div`
        display: flex;
        justify-content: flex-end;
        width: 100%;
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
        font-size: 16px;
        text-align: right;
        width: 100%;
        margin-right: 50px;
    `
    
    const Button = styled.button`
        text-align: center;
        font-size: 18px;
        font-family: var(--font-heading);
        background-color: ${props => props.disabled ? 'grey' : 'var(--color-main)'};
        color: white;
        padding: 15px 18px;
        border-radius: 5px;
        margin: 10px 0;
        width: 140px;
        cursor: pointer;

    `
    
    export default CartModal; 