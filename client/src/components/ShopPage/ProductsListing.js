import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";
import ProductsLoading from "./ProductsLoading";

//grid of all the product preview cards, on the shop page
const ProductsListing = () => {

    const { state: { status, products } } = useContext(ProductsContext);
    
    if (status === "loading") {
        return <ProductsLoading />;
    }
    
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
    width: 75vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 40px;
    column-gap: 40px;
    padding: 50px 0;
`

export default ProductsListing;