import styled from 'styled-components';
import Custoplayer from './lib/Custoplayer';

function App() {
  // useEffect(() => {
  //   window.setInterval(() => {
  //     console.log(document.activeElement);
  //   }, 2000);
  // }, []);

  return (
    <Wrapper>
      <Custoplayer
        values={{
          src: 'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/brownlee.mp4',
          item1: {
            id: 'playButton1',
          },
          item2: {
            id: 'volumeButton1',
            barId: 'volumeBar1',
            hideOnMobile: true,
          },
          item3: {
            id: 'currentTime',
          },
          item4: {
            id: 'duration',
            hideOnMobile: true,
          },
          item7: {
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
