import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";
import ProductsLoading from "./ProductsLoading";
import { CompaniesContext } from "../BrandsPage/CompaniesContext";

//grid of all the ProductPreview cards, on the Shop page
const ProductsListing = () => {

    //get all the product and company data from contexts
    const { state: { status, products }, filter, subfilter } = useContext(ProductsContext);
    const { state: { companiesStatus, companies } } = useContext(CompaniesContext);

    //if fetch is still happening for the product and company data, show the loading component
    if (status === "loading" || companiesStatus === "loading") {
        return <ProductsLoading />;
    }

    //array of products to display -- by default, it is all the products
    let productsToRender = products;

    //product key -- as the filter terms are not the same strings as the keys in each product object
    let key = null;
    if (filter === "Category") {
        key = "category";
    }
    else if (filter === "Body Location") {
        key = "body_location";
    }
    else if (filter === "Brand") {
        key = "companyId"
    }
    
    //if All is chosen or if no filter is applied
    if (filter === "All" || !filter) {
        productsToRender = products;
    }
    else if (filter === "Brand") {
        //subfilter value is a string, but company is represented by id in each product object
        //find id for the brand selected and match all products with that id
        let brandId = null;
        const chosenBrand = companies.find((brand) => brand.name === subfilter);
        
        if (chosenBrand) {
            brandId = chosenBrand._id;
            productsToRender = products.filter((item) => item[`${key}`] === chosenBrand._id);
        }

    }
    //filter all the in stock products
    else if (filter === "In Stock") {
        productsToRender = products.filter((item) => item.numInStock > 0);
    }
    else {
        //filter products by the filter and subfilter combination
        productsToRender = products.filter((item) => item[`${key}`] === subfilter);
    }

    return (
        <Wrapper>
            {( status === "idle" && companiesStatus === "idle" &&
            <>
            {productsToRender.map((product) => {
                return (
                    <NavLink to={`/shop/${product._id}` } key={product._id} >
                        <ProductPreview imageSrc={product.imageSrc} name={product.name} price={product.price} 
                        type="listing" soldOut={(product.numInStock === 0)}/>
                    </NavLink>
                    )
            })}
            </>
            )}
        </Wrapper>
    )
}

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