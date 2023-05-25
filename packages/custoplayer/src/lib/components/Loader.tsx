import styled, { keyframes } from 'styled-components';

function Loader() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}

const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  width: 128px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.span`
  height: 86px;
  width: 86px;
  border: 10px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotationAnimation} 1s linear infinite;
`;

export default Loader;
