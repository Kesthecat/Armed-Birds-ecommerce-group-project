import styled from "styled-components";
import ProductsListing from "./ProductsListing";
import PageWrapper from "../PageWrapper";
import ShopSidebar from "./ShopSidebar";

//Shop page component, displaying all the products
const Shop = () => {

    return (
        <PageWrapper>
            <Container>
                <ShopSidebar />
                <Main>
                    <PageTitle>SHOP</PageTitle>
                    <ProductsListing />
                </Main>
            </Container>
        </PageWrapper>
    )
}

export default Shop;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PageTitle = styled.h1`
    font-size: 64px;
    letter-spacing: 20px;
    font-weight: bold;
    margin: 20px auto;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
`;