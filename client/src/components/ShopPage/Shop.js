import styled from styledComponents;
import ProductsListing from "./ProductsListing";
import PageWrapper from "../PageWrapper";

const Shop = () => {

    return (
        <PageWrapper>
            {/* shop page banner
                side bar with filters */}
            <ProductsListing />
        </PageWrapper>
    )
}

export default Shop;