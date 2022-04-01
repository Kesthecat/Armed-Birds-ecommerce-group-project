import styled from "styled-components";

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
    justify-content: center;
    padding: 15px;
    width: 250px;
    height: 325px;
    background-color: var(--color-background); 
    border-radius: 5px;
`
const ImgDiv = styled.div`
    display: flex;
    justify-content: center;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-main);
`

const Name = styled.h3`
    font-weight: bold;
    text-align: center;
    margin: 20px 0 0 0;
    
`

const Price = styled.p`
    text-align: center;
    margin: 10px 0 0 0;
`


export default ProductPreview;