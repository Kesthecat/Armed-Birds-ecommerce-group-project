import styled from "styled-components";
import LoadingPreview from "./LoadingPreview";
import PageWrapper from "../PageWrapper";

const ProductsLoading = () => {
  let loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <PageWrapper>
      <Wrapper>
        {loadingArr.map(() => {
          return <LoadingPreview />;
        })}
      </Wrapper>
    </PageWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 30px;
  padding: 50px;
`;

export default ProductsLoading;