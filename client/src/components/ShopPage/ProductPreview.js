import styled from "styled-components";


//product preview card, part of the product listing grid on the shop page
const ProductPreview = ({ imageSrc, name, price }) => {

    return (
        <Wrapper>
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
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 300px;
    height: 400px;
    background-color: var(--color-background); 
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
    
`

const Price = styled.p`
    text-align: center;
    margin: 10px 0 0 0;
`


export default ProductPreview;