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
    const { state: { status, products }, filter, subfilter, sort } = useContext(ProductsContext);
    const { state: { companiesStatus, companies } } = useContext(CompaniesContext);

    //if fetch is still happening for the product and company data, show the loading component
    if (status === "loading" || companiesStatus === "loading") {
        return <ProductsLoading />;
    }

    //array of filtered products -- by default, also is all the products
    let filteredProducts = products;

    //array of filtered then sorted products -- by default, also is all the products
    let filteredAndSortedProducts = products;

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
    
    //if a filter is chosen but no subfilter, render all products
    if (!subfilter) {
        filteredAndSortedProducts = products;
    }
    //if All is chosen or if no filter is applied
    else if ((filter === "All" || !filter) && (sort === "None" || !sort)) {
        filteredAndSortedProducts = products;
    }
    else if (filter === "All" || !filter) {
        filteredProducts = products;
    }
    else if (filter === "Brand") {
        //subfilter value is a string, but company is represented by id in each product object
        //find id for the brand selected and match all products with that id
        let brandId = null;
        const chosenBrand = companies.find((brand) => brand.name === subfilter);
        
        if (chosenBrand) {
            brandId = chosenBrand._id;
            filteredProducts = products.filter((item) => item[`${key}`] === chosenBrand._id);
        }
    }
    //filter for all the in-stock products
    else if (filter === "In Stock") {
        filteredProducts = products.filter((item) => item.numInStock > 0);
    }
    else {
        //filter products by the filter and subfilter combination
        filteredProducts = products.filter((item) => item[`${key}`] === subfilter);
    }

    //after the products are filtered, apply a sort if one is chosen
    // "None", "Price", "Name", "Most Stock", "Least Stock"

    if (sort === "None" || !sort ) {
        filteredAndSortedProducts = filteredProducts;
    }
    else if (sort === "Price") {
        filteredAndSortedProducts = filteredProducts.sort((a, b) => (Number(a.price.slice(1)) > Number(b.price.slice(1))) ? 1 : -1);
    }
    else if (sort === "Name") {
        filteredAndSortedProducts = filteredProducts.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
    else if (sort === "Most Stock") {
        filteredAndSortedProducts = filteredProducts.sort((a, b) => (Number(a.numInStock) > Number(b.numInStock)) ? -1 : 1);
    }
    else if (sort === "Least Stock") {
        filteredAndSortedProducts = filteredProducts.sort((a, b) => (Number(a.numInStock) > Number(b.numInStock)) ? 1 : -1);
    }

    return (
        <Wrapper>
            {( status === "idle" && companiesStatus === "idle" &&
            <>
            {filteredAndSortedProducts.map((product) => {
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 75vw;
    row-gap: 40px;
    column-gap: 40px;
    padding: 50px;
`

export default ProductsListing;