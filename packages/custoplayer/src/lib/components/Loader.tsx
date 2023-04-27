import styled, { keyframes } from 'styled-components';

function Loader() {
  return <Spinner />;
}

const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 86px;
  height: 86px;
  border: 9px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotationAnimation} 1s linear infinite;
`;

export default Loader;
