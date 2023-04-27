import styled from 'styled-components';

function PlayButton2({ isIndicator }: { isIndicator?: boolean }) {
  return (
    <svg
      data-cy='playButton2-svg'
      width={isIndicator ? '128' : '32'}
      height={isIndicator ? '128' : '32'}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <PlayButtonPath d='M10 25.5V6L26 16.2632L10 25.5Z' />
    </svg>
  );
}

const PlayButtonPath = styled.path`
  stroke: currentColor;
  stroke-width: 2.75;
  stroke-linecap: round;
`;

export default PlayButton2;
