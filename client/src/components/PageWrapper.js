import styled from "styled-components";

//page wrapper with set margins and padding

const PageWrapper = ({children}) => {
    return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
    padding: 50px;
`
export default PageWrapper;