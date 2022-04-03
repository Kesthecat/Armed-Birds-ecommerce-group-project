import styled from "styled-components";

//table of items in cart to display in cart and checkout components
const CartTable = ({itemArray}) => {

    console.log(itemArray);

    return (
        <Wrapper>
           <table>
               <tr>
                   <th></th>
                   <th>Item</th>
                   <th>Quantity</th>
                   <th>Price</th>
                   <th>Item Subtotal</th>
               </tr>

                {itemArray.map((item) => {
                    const priceNum = Number(item.price.slice(1));
                   return <tr>
                        <td><img src={item.imageSrc} width="100px"/></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>${priceNum*item.quantity}</td>
                    </tr>
                })
                }
           </table>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    /* display: flex;
    justify-content: space-evenly;
    align-items: center; */
    padding: 10px;
    /* background-color: var(--color-background); */
    border-radius: 5px;
    margin: 15px 0;

    table {
        font-family: var(--font-body);
        border-collapse: collapse;
        width: 100%;
    }

    td, th { 
        text-align: center;
        padding: 10px 20px;
    }

    tr:nth-child(even) {
        background-color: var(--color-background);
}

`

export default CartTable;