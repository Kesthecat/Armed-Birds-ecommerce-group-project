import styled from "styled-components";
import ProductsListing from "./ProductsListing";
import PageWrapper from "../PageWrapper";

const Shop = () => {

    return (
        <PageWrapper>
            <PageTitle>SHOP</PageTitle>
            {/* shop page banner
                side bar with filters */}
            <ProductsListing />
        </PageWrapper>
    )
}

export default Shop;

const PageTitle = styled.h1`
    font-size: 64px;
    letter-spacing: 20px;
    font-weight: bold;
    margin: 20px;
`