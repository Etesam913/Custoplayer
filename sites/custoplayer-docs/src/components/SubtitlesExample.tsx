import React from 'react';
import { Custoplayer } from 'custoplayer';

export default function SubtitlesExample() {
  return (
    <Custoplayer
      src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/compressed-custoplayer-demo.mp4'
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
            subtitles: true,
          },
        },
      }}
    >
      <track
        label='English'
        kind='metadata'
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-subtitles/English.vtt'
        srcLang='en'
        default
      />
      <track
        label='Spanish'
        kind='metadata'
        srcLang='es'
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-subtitles/Spanish.vtt'
      />
    </Custoplayer>
  );
}
