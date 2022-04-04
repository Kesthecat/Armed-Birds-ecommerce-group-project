import styled from "styled-components";
import { useContext } from "react";
import { OrderContext } from "./OrderContext";

//table of items in cart to display in cart and checkout components
const CartTable = ({itemArray, type}) => {

    //itemArray passed is the selectedItems array if using CartTable in CartModal or Checkout
    //and itemArray is the itemsPurchased array from OrderContext if using on Confirmation page
    
    const { selectedItems, setSelectedItems } = useContext(OrderContext);

    const handleDelete = (e) => {

        //get className of the DeleteDiv, which contains the itemId
        //comes in this form: sc-grREDI lKRWh 6547
        //so we will use the last 4 digits, which is the itemId
        const className = e.target.className; 
        const itemId = className.slice(-4);
        console.log("itemId", itemId);

        //filter itemArray array to remove the item
        console.log("selected items before remove", itemArray)
        console.log("typeof itemId", typeof itemId)
        console.log("typoef item._id", )
        const removedArray = itemArray.filter((item) => {
            if (item._id !== Number(itemId)) {
                console.log("typoef item._id", typeof item._id );
                return item;
            }
        });
        console.log("removedarray", removedArray);
        setSelectedItems(removedArray);

    }

    if (type === "confirmation" && (itemArray.length === 0 || !itemArray)) {
        return <Wrapper></Wrapper>
    }
    
    if (itemArray.length === 0) {
        return (
            <Wrapper>
                <h4>Your cart is empty!</h4>
            </Wrapper>
        )
    }

    return (
        <Wrapper>

            <Row>
                {(type === "checkout" &&
                    <HeaderDiv></HeaderDiv>
                )}
                <HeaderDiv></HeaderDiv>
                <HeaderDiv><p>SKU</p></HeaderDiv>
                <HeaderDiv><p>Item</p></HeaderDiv>
                <HeaderDiv><p>Qty</p></HeaderDiv>
                <HeaderDiv><p>Price</p></HeaderDiv>
                <HeaderDiv><p>Item Subtotal</p></HeaderDiv>
            </Row>

            {itemArray.map((item, index) => {
                const priceNum = Number(item.price.slice(1));
                return <Row shaded={(index%2 === 0)}>
                     {(type === "checkout" &&
                        <DeleteDiv className={`${item._id}`} onClick={handleDelete}>&times;</DeleteDiv>
                     )}
                    <div><img src={item.imageSrc} width="40px"/></div>
                    <div>{item._id}</div>
                    <div>{item.name}</div>
                    <div>{item.quantity}</div>
                    <div>{item.price}</div>
                    <div>${priceNum*item.quantity}</div>
                </Row>
            })
            }

        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 10px;
    div {
        overflow-wrap: normal;
        text-align: center;
        margin: auto 0;
        font-family: var(--font-body);
        font-size: 14px;
        padding: 5px;
    }

    h4 {
        font-style: italic;
    }
`
const HeaderDiv = styled.div`
    p {
        font-weight: bold;
        font-size: 14px;
    }
`

const Row = styled.div`
    width: 100%;
    display: grid;
    /* grid-template-columns: 2fr 1fr 5fr 1fr 1fr 1fr; */
    grid-template-columns: 5% 11% 9% 41% 8% 12% 14%;
    grid-auto-rows: minmax(20px, auto);

    background-color: ${props => (props.shaded ? `var(--color-background)` : "white")};

`
const DeleteDiv = styled.div`
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        font-size: 30px;
    
        &:hover{
            color: var(--color-background);
        }
`

export default CartTable;