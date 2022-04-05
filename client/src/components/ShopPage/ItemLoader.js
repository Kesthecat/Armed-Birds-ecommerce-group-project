import { keyframes } from "styled-components";
import styled from "styled-components";

//loading animation used while ItemDetails and Confirmation Pages are loading
const ItemLoader = () => {
  return (
    <LoadingDotDiv>
      <span></span>
      <span></span>
      <span></span>
    </LoadingDotDiv>
  );
};
const wave = keyframes`

100% {
    transform: scale(1);
}
`;

const LoadingDotDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65vh;

  span {
    display: inline-block;
    background-color: var(--color-main);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 10px;
    animation-name: ${wave};
    animation-duration: 0.75s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transform: scale(0);

    &:nth-child(2) {
      animation-delay: 0.25s;
    }

    &:nth-child(3) {
      animation-delay: 0.5s;
    }
  }
`;
export default ItemLoader;
