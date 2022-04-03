import styled from "styled-components";
import { useContext } from "react";
import { OrderContext } from "./OrderContext";

//table of items in cart to display in cart and checkout components
const CartTable = ({itemArray}) => {

    const { selectedItems, setSelectedItems } = useContext(OrderContext);

   
    //make refs for each close div generated, in loop
    const handleDelete = () => {

    }

    if (selectedItems.length === 0) {
        return (
            <Wrapper>
                <h4>Your cart is empty!</h4>
            </Wrapper>
        )
    }

    return (
        <Wrapper>

            <Row>
                <HeaderDiv></HeaderDiv>
                <HeaderDiv></HeaderDiv>
                <HeaderDiv><p>SKU</p></HeaderDiv>
                <HeaderDiv><p>Item</p></HeaderDiv>
                <HeaderDiv><p>Qty</p></HeaderDiv>
                <HeaderDiv><p>Price</p></HeaderDiv>
                <HeaderDiv><p>Item Subtotal</p></HeaderDiv>
            </Row>

            {selectedItems.map((item, index) => {
                const priceNum = Number(item.price.slice(1));
                return <Row shaded={(index%2 === 0)}>
                    <DeleteDiv onClick={handleDelete}>&times;</DeleteDiv>
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

`

export default CartTable;