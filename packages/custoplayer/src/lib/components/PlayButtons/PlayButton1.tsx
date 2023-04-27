import styled from 'styled-components';

function PlayButton1({ isIndicator }: { isIndicator?: boolean }) {
  return (
    <svg
      data-cy='playButton1-svg'
      width={isIndicator ? '128' : '32'}
      height={isIndicator ? '128' : '32'}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <PlayButtonPath d='M22.2468 17.6645L11.8588 24.5847C10.5297 25.4701 8.75 24.5173 8.75 22.9202L8.75 9.0798C8.75 7.48272 10.5297 6.52988 11.8588 7.41533L22.2468 14.3355C23.435 15.1271 23.435 16.8729 22.2468 17.6645Z' />
    </svg>
  );
}

const PlayButtonPath = styled.path`
  stroke: currentColor;
  stroke-width: 2.75;
  stroke-linecap: round;
`;

export default PlayButton1;
