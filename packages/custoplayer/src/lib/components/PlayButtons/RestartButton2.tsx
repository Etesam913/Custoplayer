import styled from 'styled-components';

function RestartButton2({ isIndicator }: { isIndicator?: boolean }) {
  return (
    <svg
      data-cy='restartButton2-svg'
      width={isIndicator ? '128' : '32'}
      height={isIndicator ? '128' : '32'}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <RestartButtonPath d="M7 17.415C7 22.7087 11.2533 27 16.5 27C21.7467 27 26 22.7087 26 17.415C26 14.701 24.9777 11.973 22.8333 10.1122C21.906 9.30744 20.7061 8.71157 18.7619 8.28647C17.8755 8.09265 17 8 15.5 8.28647C14.4569 8.48568 14.0652 8.65987 13.5 9C12.1363 9.82063 12 10 11.5 10.5" />
      <RestartButtonPath d="M11.5485 4.99999L10.3232 11.5799L15.6147 13.3869" />

    </svg>
  );
}

const RestartButtonPath = styled.path`
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: square;
`;

export default RestartButton2;
