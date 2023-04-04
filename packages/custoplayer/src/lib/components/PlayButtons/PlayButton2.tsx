// <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M10 27V5L26 16.5789L10 27Z" stroke="black" stroke-width="2.5"/>
// </svg>


import styled from "styled-components";

function PlayButton2() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <PlayButtonPath d="M10 25.5V6L26 16.2632L10 25.5Z" />
    </svg>
  );
}

const PlayButtonPath = styled.path`
      stroke: currentColor;
      stroke-width: 2.75;
      stroke-linecap: round;
`;

export default PlayButton2
