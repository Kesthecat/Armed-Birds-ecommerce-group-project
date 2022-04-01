import styled from "styled-components";
import { useContext, useEffect, useReducer, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import PageWrapper from "./PageWrapper"
import { ProductsContext } from "./ShopPage/ProductsContext";
import { OrderContext } from "./Order/OrderContext";
import Dropdown from "./ShopPage/Dropdown";

const initialState = {
    status: "loading", //idle, fetch-failed
    item: null,
    error: null 
}

const reducer = (state, action) => {
    switch (action.type) {
        case ("item-loaded-from-server") : {
            return {
                ...state, 
                status: "idle",
                item: action.item,
            }
        }
        case ("error-fetching-item-from-server") : {
            return {
                ...state,
                status: "fetch-failed",
                error: action.error
            }

        }
    }
}

//item detail page
const ItemDetails = () => {

    //array of selectedItems that is stored in session storage
    //has shape [{_id, name, price, quantity}]
    const { selectedItems, setSelectedItems } = useContext(OrderContext);

    //state to keep track of quantity selected for purchase 
    const [ quantity, setQuantity ] = useState(0);

    //state and loading of item details
    const [ state, dispatch ] = useReducer(reducer, initialState);
    
    // const { id } = useParams(); //hook error coming from useParams

    const dropdownArray = [];

    useEffect(() => {
        fetch(`/get-item/6553`, { 
        // fetch(`/get-item/${id}`, { 
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) => {

            console.log("fetch item data", data, data.data)
            dispatch ({
                type: "item-loaded-from-server", 
                item: data.data //verify what is being sent by server
            })
            
        })
        .catch((error) => {
            dispatch ({
                type: "error-fetching-item-from-server",
                error: error
            })
        })
    }, [])

    //populating number array for the quantity dropdown
    if (state.status === "idle") {
        console.log("state.item.numInStock", state.item.numInStock)
        for (let i = 0; i < state.item.numInStock; i++) {
            dropdownArray[i] = i+1;
        }
        
    }

    //click function for the BUY button
    const handleClick = () => {
        const currentItem = {
            _id: state.item._id, 
            name: state.item.name, 
            price: state.item.price, 
            quantity: quantity
        }
        setSelectedItems([...selectedItems, currentItem]);

        //set modal to true
        //history.push to shop page
    }

    return (
        <PageWrapper>
            {/* <NavLink to="/shop">BACK TO SHOP</NavLink> */}
            {( state.status === "idle" && 
            <ProductCard>
                <ImgDiv>
                    <img src={state.item.imageSrc}/>
                </ImgDiv>
                <InfoDiv>
                    <ProductName>{state.item.name}</ProductName>
                    {/* <Company>{state.item.company}</Company> */}
                    <Price>{state.item.price}</Price>
                    <Description>Wear it on your {state.item.body_location}!</Description>
                    
                    <InStock>{(state.item.numInStock > 0) ? "In Stock" : "Out of Stock"}</InStock>
                    <Dropdown array={dropdownArray} label="Quantity" stateSetter={setQuantity}/>
                    <BuyButton onClick={handleClick} disabled={(state.item.numInStock === 0)}>BUY</BuyButton>
                </InfoDiv>
            </ProductCard>
            )}
        </PageWrapper>

    )
}

const ProductCard = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const ImgDiv = styled.div`
    margin: 0 auto;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;

    div * {
        margin: 10px 0;
    }
`

const ProductName = styled.h2`
`

//make this a NavLink later
const Company = styled.h3`
`

const Price = styled.h4`
`

const Description = styled.p`
`

const InStock = styled.p`
`

const BuyButton = styled.button`
`



export default ItemDetails;