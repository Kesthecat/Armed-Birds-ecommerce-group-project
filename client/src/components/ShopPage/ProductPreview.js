import styled from "styled-components";


//product preview card, part of the product listing grid on the shop page
const ProductPreview = ({ imageSrc, name, price, type, soldOut}) => {
    console.log("soldOut in product preview", soldOut);

    return (
        <Wrapper featured={(type === "featured")}>
            {(soldOut && 
                <SoldOutTag>SOLD OUT</SoldOutTag>
            )}
            <ImgDiv>
                <img src={imageSrc}/>
            </ImgDiv>
            <Info>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Info>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 300px;
    height: 400px;
    background-color: var(--color-background); 
    border-radius: 5px;
    box-shadow: ${props => (props.featured ? "0 0 3px 3px var(--color-secondary)" : "")};
`
const SoldOutTag = styled.p`
    position: absolute;
    /* transform: rotate(35deg); */
    top: 13px;
    right: 13px;
    text-align: right;
    z-index: 1;
    font-family: Mulish;
    font-size: 18px;
    color: var(--color-secondary);
    background: rgba(175, 112, 24, 0.3);
    padding: 8px;
    border-radius: 5px;
`

const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    height: 200px;
    margin: 15px;
    border-radius: 10px;
    /* border: 2px solid var(--color-secondary); */

    img {
        height: 160px;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-main);
`

const Name = styled.h4`
    font-weight: bold;
    text-align: center;
    margin: 20px 0 0 0;
    line-height: 1.3;
    word-wrap: break-word;
    
`

const Price = styled.p`
    text-align: center;
    margin: 10px 0 0 0;
`


export default ProductPreview;