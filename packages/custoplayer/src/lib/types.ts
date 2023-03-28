import { ComponentPropsWithoutRef } from 'react';

export interface EntryPointProps extends ComponentPropsWithoutRef<'video'> {
  /** You can define video attributes here. Things like playButtons, previewTooltips, and fullscreenButtons.
  @example
  values={{
    previewTooltip: {
      id: 'text'
    },
    item1: {
      id: 'playButton1'
    },
    item2: {
      id: 'volumeButton1',
      barId: 'volumeBar1',
      buttonColor: 'rgb(137, 178, 245)',
      volumeColor: 'rgb(137, 178, 245)',
      hideOnMobile: true
    },
    item3: {
      id: 'currentTime',
      hideOnMobile: true
    },
    item4: {
      id: 'progressBar1'
    },
    item5: {
      id: 'duration',
      hideOnMobile: true
    },
    item6: {
      id: 'fullscreenButton2',
      buttonColor: 'rgb(137, 178, 245)'
    },
  }}
  */
  values: CustoplayerValues;
}

export interface CustoplayerValues {
  controlsBar?: ControlsBarItem;
  // playIndicator?: {
  //   id?: number;
  //   color?: string;
  // };
  /** You can define the video preview tooltip here.
  @example
  previewTooltip: {
    id: 'text'
  }
  */
  previewTooltip?: PreviewTooltipItem;
  /** You can define a component in this item container. This container is the leftmost container.
  @example
  item1: {
    id: 'volumeButton1',
    barId: 'volumeBar1',
    buttonColor: 'rgb(137, 178, 245)',
    volumeColor: 'rgb(137, 178, 245)'
  } */
  item1?: CustoplayerItem;
  /** You can define a component in this item container. This container is the second container from the left.
  @example
  item2: {
    id: 'fullscreenButton2',
    buttonColor: 'rgb(137, 178, 245)'
  } */
  item2?: CustoplayerItem;
  /** You can define a component in this item container. This container is the third container from the left.
  @example
  item3: {
    id: 'progressBar1',
    progressColor: 'rgb(137, 178, 245)'
  } */
  item3?: CustoplayerItem;
  /** You can define a component in this item container. This container is the fourth container from the left.
  @example
  item4: {
    id: 'duration',
    textColor: 'rgb(137, 178, 245)'
  } */
  item4?: CustoplayerItem;
  /** You can define a component in this item container. This container is the fifth container from the left.
  @example
  item5: {
    id: 'volumeButton1',
    barId: 'volumeBar2',
    buttonColor: 'rgb(137, 178, 245)',
    volumeColor: 'rgb(137, 178, 245)'
  } */
  item5?: CustoplayerItem;
  /** You can define a component in this item container. This container is the sixth container from the left.
  @example
  item6: {
    id: 'fullscreenButton1',
    buttonColor: 'rgb(137, 178, 245)'
  } */
  item6?: CustoplayerItem;
  /** You can define a component in this item container. This container is the seventh container from the left.
  @example
  item7: {
    id: 'currentTime',
    textColor: 'rgb(137, 178, 245)'
  } */
  item7?: CustoplayerItem;
}

export interface ControlsBarItem {
  barColor: string;
}

export interface PreviewTooltipItem {
  /** Accepts values of "text" */
  id: 'text' | 'thumbnail' | 'textAndThumbnail';
}

export interface VolumeItem {
  id: 'volumeButton1' | 'volumeButton2';
  barId?: 'volumeBar1' | 'volumeBar2';
  volumeColor?: string;
  barColor?: string;
  buttonColor?: string;
  hideOnMobile?: boolean;
}

export interface PlayButtonItem {
  /** Accepts values of "playButton1" or "playButton2" */
  id: 'playButton1' | 'playButton2';
  /** Changes the color of the playButton. Accepts any hex or rgb color code. */
  buttonColor?: string;
  /** Hides the playButton when the video's width is less than 768px. Accepts values of true or false*/
  hideOnMobile?: boolean;
}

export interface ProgressBarItem {
  /** Accepts values of "progressBar1" or "progressBar2" */
  id: 'progressBar1' | 'progressBar2';
  /** Changes the color of the progress of the progress bar. Accepts any hex or rgb color code. */
  progressColor?: string;
  /** Hides the progress bar when the video's width is less than 768px. Accepts values of true or false*/
  hideOnMobile?: boolean;
}

export interface TimeItem {
  id: 'currentTime' | 'duration';
  textColor?: string;
  hideOnMobile?: boolean;
}

export interface FullscreenItem {
  id: 'fullscreenButton1' | 'fullscreenButton2';
  buttonColor?: string;
  hideOnMobile?: boolean;
}

export type CustoplayerItem =
  | ProgressBarItem
  | PlayButtonItem
  | VolumeItem
  | TimeItem
  | FullscreenItem;
