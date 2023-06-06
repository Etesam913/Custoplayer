import styled from 'styled-components';
import Custoplayer from './lib/EntryPoint';
import { useEffect, useState } from 'react';
import { testing } from './lib/presets';

function App() {
  const [previewTooltipId, setPreviewTooltipId] = useState<
    'text' | 'thumbnail' | 'textAndThumbnail'
  >('text');

  useEffect(() => {
    const handleFocus = () => {
      console.log(document.activeElement);
    };

    window.addEventListener('focus', handleFocus, true); // the last parameter "true" is to capture the event in the capturing phase

    // Cleanup on unmount
    return () => {
      window.removeEventListener('focus', handleFocus, true);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <MainContainer>
      <Wrapper>
        <Custoplayer
          width='min(95%, 60rem)'
          poster='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-poster.png'
          playsInline={true}
          crossOrigin='anonymous'
          preload='auto'
          values={{
            ...testing,

            previewTooltip: {
              id: previewTooltipId,
              atlasImage:
                'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/thumbs.jpg',
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
        >
          <source
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-1080.mp4'
            type='video/mp4'
            id='custoplayer-1080'
          />
          <source
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-720.mp4'
            type='video/mp4'
            id='custoplayer-720'
          />
          <source
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-480.mp4'
            type='video/mp4'
            id='custoplayer-480'
          />
          <source
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-240.mp4'
            type='video/mp4'
            id='custoplayer-240'
          />
          <source
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-144.mp4'
            type='video/mp4'
            id='custoplayer-144'
          />
          <track
            label='English'
            kind='metadata'
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/english.vtt'
            srcLang='en'
            default
          />
          <track
            label='Spanish'
            kind='metadata'
            srcLang='es'
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/spanish.vtt'
          />
          <track
            kind='metadata'
            id='custoplayer-thumbnails'
            src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/thumbs.vtt'
          />
          yolo swag
        </Custoplayer>
        <h2>Options:</h2>
        <button
          data-cy='changePreviewTooltipIdButton'
          onClick={() => setPreviewTooltipId('thumbnail')}
        >
          Change previewTooltip to thumbnail
        </button>
      </Wrapper>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  background-color: #1d1d1dff;
  min-height: 100vh;
  width: 100vw;
  color: white;
`;

const Wrapper = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default App;
