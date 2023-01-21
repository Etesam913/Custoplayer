import styled from 'styled-components';
import Custoplayer from './lib/Custoplayer';

function App() {
  return (
    <Wrapper>
      <Custoplayer
        values={{
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
          item1: {
            id: 'playButton1',
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
