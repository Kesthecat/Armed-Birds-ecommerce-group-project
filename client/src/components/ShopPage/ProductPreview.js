import styled from styledComponents;

const ProductPreview = ({ imageSrc, name, price }) => {

    return (
        <Wrapper>
            <img src={imageSrc}/>
            <Info>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Info>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 15px;

    img { 
        /* width: 100%; */
    }
`

const Info = styled.div`
    display: flex;
    justify-content: center;
`

const Name = styled.h3`
    font-weight: bold;
`

const Price = styled.p`
`


export default ProductPreview;