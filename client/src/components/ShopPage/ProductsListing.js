import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";

const ProductsListing = () => {

    const { state: { status, products } } = useContext(ProductsContext);
    
    
    return (
        <Wrapper>
            {( status === "idle" &&
            <>
            {products.map((product) => {
                return (
                    <NavLink to={`/shop/${products._id}`}>
                        <ProductPreview key={product._id} imageSrc={product.imageSrc} name={product.name} price={product.price} />
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
    row-gap: 25px;
    column-gap: 25px;
`

export default ProductsListing;