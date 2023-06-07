import React from 'react';
import { Custoplayer } from 'custoplayer';

export default function ThumbnailExample() {
  return (
    <Custoplayer
      src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/custoplayer-demo.mp4'
      crossOrigin='anonymous'
      values={{
        previewTooltip: {
          id: 'thumbnail',
          atlasImage:
            'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/thumbs.jpg',
        },
        controlsBar: {
          barColor: '#78a8ecd3',
        },
        item1: {
          id: 'progressBar1',
          progressColor: 'orange',
        },
      }}
    >
      <track
        kind='metadata'
        id='custoplayer-thumbnails'
        src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/thumbs.vtt'
      />
    </Custoplayer>
  );
}
