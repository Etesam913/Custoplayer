import styled from 'styled-components';
import Custoplayer from './lib/EntryPoint';

function App() {
  return (
    <Wrapper>
      <Custoplayer
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/brownlee.mp4'
        playsInline={true}
        preload='auto'
        values={{
          previewTooltip: {
            id: 'text',
          },
          controlsBar: {
            barColor: '#386641',
            animate: 'opacity',
          },
          item1: {
            id: 'playButton1',
            buttonColor: '#a7c957',
          },
          item2: {
            id: 'volumeButton1',
            barId: 'volumeBar1',
            buttonColor: '#a7c957',
            volumeColor: '#6a994e',
            hideOnMobile: true,
          },
          item3: {
            id: 'currentTime',
            hideOnMobile: true,
          },

          item4: {
            id: 'progressBar1',
            progressColor: '#6a994e',
            barColor: 'white',
          },
          item5: {
            id: 'duration',
            hideOnMobile: true,
          },
          item6: {
            id: 'fullscreenButton2',
            buttonColor: '#a7c957',
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
        onVolumeChange={(e) => console.log('muted')}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0.75rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default App;
