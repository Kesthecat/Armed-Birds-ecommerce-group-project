import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";

//grid of all the product preview cards, on the shop page
const ProductsListing = () => {

    const { state: { status, products } } = useContext(ProductsContext);
    
    
    return (
        <Wrapper>
            {( status === "idle" &&
            <>
            {products.map((product) => {
                return (
                    <NavLink to={`/shop/${product._id}` } key={product._id} >
                        <ProductPreview imageSrc={product.imageSrc} name={product.name} price={product.price} />
                    </NavLink>
                    )
            })}
            </>
            )}
        </Wrapper>
    )
}

//might be better to use grid layout
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 30px;
    column-gap: 30px;
    padding: 50px;
`

export default ProductsListing;