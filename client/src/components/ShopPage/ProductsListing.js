import styled from styledComponents;
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";

const ProductsListing = () => {

    const { products } = useContext(ProductsContext);
    
    return (
        <Wrapper>
            {products.map((product) => {
                return (
                    <NavLink to={`/shop/${_id}`}>
                        <ProductPreview key={product._id} name={product.name} price={product.price} />
                    </NavLink>
                    )
            })}
        </Wrapper>
    )
}

//might be better to use grid layout
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 25px;
    column-gap: 25px;
`

export default ProductsListing;