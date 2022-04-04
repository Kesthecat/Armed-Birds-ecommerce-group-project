import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./ProductsContext";
import ProductPreview from "./ProductPreview";
import ProductsLoading from "./ProductsLoading";
import { CompaniesContext } from "../BrandsPage/CompaniesContext";

//grid of all the product preview cards, on the shop page
const ProductsListing = () => {

    const { state: { status, products }, filter, subfilter } = useContext(ProductsContext);
    const { state: { companiesStatus, companies } } = useContext(CompaniesContext);

    if (status === "loading" || companiesStatus === "loading") {
        return <ProductsLoading />;
    }

    //array of products to display
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
    else {
        //filter products by the filter/subfilter set
        productsToRender = products.filter((item) => item[`${key}`] === subfilter);
    }

    return (
        <Wrapper>
            {( status === "idle" && companiesStatus === "idle" &&
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