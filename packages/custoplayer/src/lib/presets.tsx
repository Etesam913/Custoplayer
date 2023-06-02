import { CustoplayerValues } from './types';

export const midnightBlue: CustoplayerValues = {
  previewTooltip: {
    id: 'text',
  },
  controlsBar: {
    barColor: '#392f5ad4',
    animate: 'movement',
  },
  item1: {
    id: 'playButton1',
    buttonColor: '#efefef',
  },
  item2: {
    id: 'volumeButton1',
    barId: 'volumeBar1',
    buttonColor: '#efefef',
    barColor: '#efefef',
    volumeColor: '#4f91cb',
  },
  item3: {
    id: 'currentTime',
    hideOnMobile: true,
    textColor: '#efefef',
  },
  item4: {
    id: 'progressBar1',
    barColor: '#efefef',
    progressColor: '#4f91cb',
  },
  item5: {
    id: 'duration',
    hideOnMobile: true,
    textColor: '#efefef',
  },
  item7: {
    id: 'fullscreenButton1',
    buttonColor: '#efefef',
  },
  focusColor: '#efefef',
};

export const fieryRed: CustoplayerValues = {
  previewTooltip: {
    id: 'text',
  },
  controlsBar: {
    animate: 'opacity',
    barColor: '#d90427b8',
  },
  item1: {
    id: 'playButton1',
    buttonColor: '#ffd3d3',
  },
  item2: {
    id: 'volumeButton1',
    barId: 'volumeBar2',
    buttonColor: '#ffd3d3',
    barColor: '#ffd3d3',
    volumeColor: '#552525',
  },
  item3: {
    id: 'currentTime',
    hideOnMobile: true,
    textColor: '#fee1e1',
  },
  item4: {
    id: 'progressBar2',
    barColor: '#ffd3d3',
    progressColor: '#552525',
  },
  item5: {
    id: 'duration',
    hideOnMobile: true,
    textColor: '#fee1e1',
  },

  item7: {
    id: 'fullscreenButton1',
    buttonColor: '#ffd3d3',
  },
  focusColor: '#ffd3d3',
};

export const milkyWhite: CustoplayerValues = {
  previewTooltip: {
    id: 'text',
  },
  controlsBar: {
    animate: 'movement',
    barColor: '#ffffffdd',
  },
  item1: {
    id: 'playButton1',
    buttonColor: '#353535',
  },
  item2: {
    id: 'volumeButton1',
    barId: 'volumeBar2',
    buttonColor: '#353535',
    barColor: '#e7e7e7',
    volumeColor: '#353535',
    scrubberBorderColor: 'transparent',
    scrubberColor: 'transparent',
  },
  item3: {
    id: 'currentTime',
    textColor: '#353535',
  },
  topProgressBar: {
    id: 'progressBar1',
    barColor: '#e7e7e7',
    progressColor: '#353535',
    scrubberColor: 'transparent',
    scrubberBorderColor: 'none',
  },
  item5: {
    id: 'duration',
    textColor: '#353535',
    marginLeft: 'auto',
  },

  item7: {
    id: 'fullscreenButton1',
    buttonColor: '#353535',
  },
  focusColor: '#353535',
};

export const grassyGreen: CustoplayerValues = {
  previewTooltip: {
    id: 'text',
  },
  controlsBar: {
    animate: 'movement',
    barColor: '#2c6e49d4',
  },
  item1: {
    id: 'playButton2',
    buttonColor: '#EEE5E5',
  },
  item2: {
    id: 'volumeButton1',
    barId: 'volumeBar1',
    volumeColor: '#67ba8b',
    scrubberColor: 'transparent',
    scrubberBorderColor: '#67ba8b',
    barColor: '#EEE5E5',
  },
  item3: {
    id: 'fullscreenButton2',
    buttonColor: '#EEE5E5',
  },
  item4: {
    id: 'progressBar3',
    progressColor: '#67ba8b',
  },

  focusColor: '#EEE5E5',
};

export const mint: CustoplayerValues = {
  previewTooltip: {
    id: 'text',
  },
  controlsBar: {
    animate: 'movement',
    barColor: '#a9e5bbd3',
  },
  topProgressBar: {
    id: 'progressBar1',
    scrubberColor: 'transparent',
    barColor: '#a9e5bbd3',
    progressColor: '#26352a',
    bufferedColor: '#46464695',
  },
  item2: {
    id: 'currentTime',
  },
  item1: {
    id: 'volumeButton1',
    barId: 'volumeBar2',
    scrubberColor: 'transparent',
    barColor: '#a9e5bbd3',
    volumeColor: '#26352a',
  },
  item4: {
    id: 'playButton1',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  item6: {
    id: 'settingsButton1',
    settingsMenuColor: '#a9e5bbec',
    settingsMenuOrientation: 'left',
    options: {
      playbackSpeed: [0.25, 0.5, 1, 1.25, 1.5, 2],
    },
  },
  item7: {
    id: 'fullscreenButton1',
  },
};

export const testing: CustoplayerValues = {
  previewTooltip: {
    id: 'thumbnail',
    atlasImage:
      'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/thumbs.jpg',
  },
  controlsBar: {
    barColor: '#386641',
    animate: 'movement',
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
  },
  item6: {
    id: 'duration',
    hideOnMobile: true,
  },
  item5: {
    id: 'settingsButton1',
    buttonColor: '#a7c957',
    settingsMenuColor: '#386641',
    settingsMenuOrientation: 'left',
    options: {
      subtitles: true,
      playbackSpeed: [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2],
      quality: true,
    },
  },
  item7: {
    id: 'fullscreenButton1',
    buttonColor: '#a7c957',
  },
  focusColor: '#a7c957',
};
