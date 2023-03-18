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
        /* The below handlers are for the cypress tests. They do not change any styles */
        onClick={() => console.log('video clicked')}
        onPlay={() => console.log('video playing')}
        onPause={() => console.log('video paused')}
        onLoadStart={() => console.log('video data load start')}
        onLoadedData={() => console.log('video data loaded')}
        onTimeUpdate={() => console.log('time updated')}
        onDurationChange={() => console.log('video duration changed')}
        onSeeked={() => console.log('video seeked')}
        onSeeking={() => console.log('video seeking')}
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
