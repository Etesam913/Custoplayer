import styled from "styled-components";

function PauseButton1() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PauseButtonRect x="7.1" y="7.1" width="5.8" height="17.8" rx="2.9" />
      <PauseButtonRect x="19.1" y="7.1" width="5.8" height="17.8" rx="2.9" />
    </svg>
  );
}

const PauseButtonRect = styled.rect`
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
`;

export default PauseButton1
