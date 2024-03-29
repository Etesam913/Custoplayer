import styled from 'styled-components';
import Custoplayer from './lib/EntryPoint';
import { useEffect, useRef, useState } from 'react';
import { testing } from './lib/presets';
import { useVideoElem } from './lib/hooks';

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

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <MainContainer>
      <Wrapper>
        <Custoplayer
          ref={videoRef}
          width='min(95%, 60rem)'
          poster='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/grain-video-poster.png'
          playsInline={true}
          crossOrigin='anonymous'
          preload='auto'
          values={{
            ...testing,
            previewTooltip: {
              id: previewTooltipId,
              atlasImage:
                'https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/thumbs.jpg',
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
          onSuspend={() => console.log('video suspend')}
          onWaiting={() => console.log('video waiting')}
          onError={() => console.log('video error')}
          onStalled={() => console.log('video stalled')}
          onVolumeChange={() => console.log('muted')}
        >
          <source
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/grain-video-1080.mp4'
            type='video/mp4'
            id='custoplayer-1080'
          />
          <source
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/grain-video-720.mp4'
            type='video/mp4'
            id='custoplayer-720'
          />
          <source
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/grain-video-480.mp4'
            type='video/mp4'
            id='custoplayer-480'
          />
          <source
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/grain-video-240.mp4'
            type='video/mp4'
            id='custoplayer-240'
          />
          <source
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/grain-video-144.mp4'
            type='video/mp4'
            id='custoplayer-144'
          />
          <track
            label='English'
            kind='metadata'
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/english.vtt'
            srcLang='en'
            default
          />
          <track
            label='Spanish'
            kind='metadata'
            srcLang='es'
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/spanish.vtt'
          />
          <track
            kind='metadata'
            id='custoplayer-thumbnails'
            src='https://project-dev.nyc3.cdn.digitaloceanspaces.com/custoplayer-testing/thumbs.vtt'
          />
          yolo swag
        </Custoplayer>
        <h2>Options:</h2>
        <OptionButton
          data-cy='changePreviewTooltipIdButton'
          onClick={() => setPreviewTooltipId('thumbnail')}
        >
          Change previewTooltip to thumbnail
        </OptionButton>

        <OptionButton
          onClick={() =>
            videoRef.current?.paused
              ? videoRef.current?.play()
              : videoRef.current?.pause()
          }
        >
          Play/Pause Video
        </OptionButton>

        <OptionButton onClick={() => videoRef.current?.requestFullscreen()}>
          Fullscreen Button
        </OptionButton>
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

const OptionButton = styled.button`
  margin: 0.5rem;
`;

export default App;
