import styled from "styled-components";
import { keyframes } from "styled-components";

const LoadingPreview = () => {
  return (
    <Wrapper>
      <LoadingImgDiv />
      <LoadingInfoDiv>
        <LoadingTextDiv />
        <LoadingTextDiv />
        <LoadingPriceDiv />
      </LoadingInfoDiv>
    </Wrapper>
  );
};
const loadingAnimation = keyframes`
0% {opacity: 1}
100% {opacity: 0}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  height: 400px;
  border-radius: 5px;
  background-color: var(--color-background);
  animation-name: ${loadingAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
  opacity: 0.6;
`;
const LoadingImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 200px;
  margin: 15px;
  border-radius: 10px;
`;

const LoadingInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const LoadingTextDiv = styled.div`
  margin: 20px 0 0 0;
  width: 250px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
`;
const LoadingPriceDiv = styled.div`
  margin: 20px 0 0 0;
  width: 75px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
`;

export default LoadingPreview;
