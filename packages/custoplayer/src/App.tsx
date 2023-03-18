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
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/brownlee.mp4'
        playsInline={true}
        onClick={() => console.log('📝')}
        values={{
          previewTooltip: {
            id: 'text',
          },
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
            id: 'progressBar1',
          },
          item5: {
            id: 'duration',
            hideOnMobile: true,
          },
          item6: {
            id: 'fullscreenButton2',
            buttonColor: 'rgb(137, 178, 245)',
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
