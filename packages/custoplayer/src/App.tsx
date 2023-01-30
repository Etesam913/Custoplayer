import styled from 'styled-components';
import Custoplayer from './lib/Custoplayer';

function App() {
  return (
    <Wrapper>
      <Custoplayer
        values={{
          src: 'https://etesam.nyc3.cdn.digitaloceanspaces.com/Custoplayer/placeholder-video-720',
          playIndicator: {
            id: 1,
          },
          item1: {
            id: 'playButton1',
            color: 'rgb(191, 232, 208)',
          },
          item2: {
            id: 'progressBar1',
          },
        }}
      ></Custoplayer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
`;

export default App;
