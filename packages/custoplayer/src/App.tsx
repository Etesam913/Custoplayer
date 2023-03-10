import { useEffect } from 'react';
import styled from 'styled-components';
import Custoplayer from './lib/Custoplayer';

function App() {
  useEffect(() => {
    window.setInterval(() => {
      console.log(document.activeElement);
    }, 2000);
  }, []);

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
          },
          item2: {
            id: 'volumeButton1',
            barId: 'volumeBar1',
          },
          item3: {
            id: 'progressBar1',
          },
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
`;

export default App;
