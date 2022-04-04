import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";
import ProductsLoading from "./ProductsLoading";

//grid of all the product preview cards, on the shop page
const ProductsListing = () => {

    const { state: { status, products }, filter, subfilter } = useContext(ProductsContext);
    
    if (status === "loading") {
        return <ProductsLoading />;
    }

    //array of products to display
    let productsToRender = null;

    //product key -- as the filter terms are not the same strings as the keys in each product object
    let key = null;
    if (filter === "Category") {
        key = "category";
    }
    else if (filter === "Body Location") {
        key = "body_location";
    }
    else if (filter === "Brand") {
        key = "company"
    }
    
    if (filter === "All" || !filter) {
        productsToRender = products;
    }
    else {
        //filter products by the filter/subfilter set
        productsToRender = products.filter((item) => {
            console.log("item[`${key}`]", item[`${key}`]);
            if (item[`${key}`] === subfilter) {
                return item;
            }
        })  
    }
    console.log("productstorender", productsToRender);
    
    return (
        <Wrapper>
            {( status === "idle" &&
            <>
            {productsToRender.map((product) => {
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