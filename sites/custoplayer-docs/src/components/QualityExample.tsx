import React from 'react';
import { Custoplayer } from 'custoplayer';

export default function QualityExample() {
  return (
    <Custoplayer
      crossOrigin='anonymous'
      values={{
        controlsBar: {
          animate: 'movement',
          barColor: 'rgba(28, 28, 28, 0.85)',
        },
        item1: {
          id: 'settingsButton1',
          settingsMenuOrientation: 'right',
          options: {
            quality: true,
          },
        },
        item2: {
          id: 'progressBar3',
        },
      }}
    >
      <source
        id='custoplayer-1080'
        type='video/mp4'
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-video-qualities/custoplayer-demo-1080.mp4'
      />

      <source
        id='custoplayer-720'
        type='video/mp4'
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-video-qualities/custoplayer-demo-720.mp4'
      />

      <source
        id='custoplayer-480'
        type='video/mp4'
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-video-qualities/custoplayer-demo-480.mp4'
      />
    </Custoplayer>
  );
}
