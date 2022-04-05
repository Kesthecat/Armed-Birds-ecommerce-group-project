import styled from "styled-components";
import LoadingPreview from "./LoadingPreview";
import PageWrapper from "../PageWrapper";

//loading component to show while Shop page is loading
const ProductsLoading = () => {
  let loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <Wrapper>
      {loadingArr.map(() => {
        return <LoadingPreview />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 30px;
  width: 75vw;
  margin-top: 50px;
`;

export default ProductsLoading;
