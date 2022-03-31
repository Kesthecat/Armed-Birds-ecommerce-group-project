import styled from "styled-components";
import { useContext } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import PageWrapper from "./PageWrapper"
import { ProductsContext } from "./ProductsContext";
import Dropdown from "./ShopPage/Dropdown";

const ItemDetails = () => {
    const history = useHistory();
    
    const { id } = useParams();
    //fetch via id

    return (
        <PageWrapper>
            <button onClick={history.goBack}>BACK TO SHOP</button>
            <ProductCard>
                <ImgDiv>
                    <img />
                </ImgDiv>
                <InfoDiv>
                    <ProductName></ProductName>
                    <Company></Company>
                    <Price></Price>
                    <Description>Wear it on your (bodypart)!</Description>
                    <InStock></InStock>
                    <Dropdown />
                    <BuyButton></BuyButton>
                </InfoDiv>
            </ProductCard>
        </PageWrapper>

    )
}

const ProductCard = styled.div`
`

const ProductName = styled.h1`
`

const Company = styled(NavLink)`
`

const Price = styled.h4`
`

const Description = styled.p`
`

const InStock = styled.p`
`

const BuyButton = styled.button`
`



export default ItemDetails;