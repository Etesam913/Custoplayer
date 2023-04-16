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
  /** You can define properties related to the controls bar here:
  @example
  controlsBar: {
    barColor: "#386641",
    animate: "movement"
  } */
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
  /** Changes the color of the controlsBar. This also changes the default backgroundColor for the previewToolip. Accepts any hex or rgb color code. */
  barColor: string;
  /** Changes how the controlsBar animates. Accepts values of "opacity" and "movement". Setting animate to "opacity" will do a simple fade in animation. Setting animate to "movement" will animate the controls bar from bottom -> up*/
  animate?: 'opacity' | 'movement';
}

export interface PreviewTooltipItem {
  /** Accepts value of "text" */
  id: 'text' | 'thumbnail' | 'textAndThumbnail';
}

export interface VolumeItem {
  /** Accepts values of "volumeButton1" or "volumeButton2" */
  id: 'volumeButton1' | 'volumeButton2';
  /** Accepts values of "volumeBar1" or "volumeBar2". volumeBar1 is horizontal and volumeBar2 is vertical. */
  barId?: 'volumeBar1' | 'volumeBar2';
  /** Changes the color of the volume progress in the bar. Accepts any hex or rgb color code. */
  volumeColor?: string;
  /** Changes the volume background color of the bar. Accepts any hex or rgb color code. */
  barColor?: string;
  /** Changes the color of the volume button icon. Accepts any hex or rgb color code. */
  buttonColor?: string;
  /** Hides the volumeButton and the volumeBar when the video's width is less than 768px. Accepts values of true or false*/
  hideOnMobile?: boolean;
  /** Changes the color of the volume bar scrubber. Accepts any hex or rgb color code. Set both scrubberColor and scrubberBorderColor properties to "transparent" to disable the scrubber. */
  scrubberColor?: string;
  /** Changes the border color of the volume bar scrubber. Accepts any hex or rgb color code. Set both scrubberColor and scrubberBorderColor properties to "transparent" to disable the scrubber. */
  scrubberBorderColor?: string;
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
  /** Changes the background color of the bar. Accepts any hex or rgb color code. */
  barColor?: string;
  /** Changes the color of the progress of the progress bar. Accepts any hex or rgb color code. */
  progressColor?: string;
  /** Hides the progress bar when the video's width is less than 768px. Accepts values of true or false*/
  hideOnMobile?: boolean;
  /** Changes the color of the progress bar scrubber. Accepts any hex or rgb color code. Set both scrubberColor and scrubberBorderColor properties to "transparent" to disable the scrubber. */
  scrubberColor?: string;
  /** Changes the border color of the progress bar scrubber. Accepts any hex or rgb color code. Set both scrubberColor and scrubberBorderColor properties to "transparent" to disable the scrubber. */
  scrubberBorderColor?: string;
}

export interface TimeItem {
  /** Accepts values of "currentTime" or "duration" */
  id: 'currentTime' | 'duration';
  /** Changes the color of the time text. Accepts any hex or rgb color code. */
  textColor?: string;
  /** Hides the currentTime text or duration text when the video's width is less than 768px. Accepts values of true or false*/
  hideOnMobile?: boolean;
}

export interface FullscreenItem {
  /** Accepts values of "fullscreenButton1" or "fullscreenButton2" */
  id: 'fullscreenButton1' | 'fullscreenButton2';
  /** Changes the color of the fullscreen button. Accepts any hex or rgb color code. */
  buttonColor?: string;
  /** Hides the fullscreen button when the video's width is less than 768px. Accepts values of true or false*/
  hideOnMobile?: boolean;
}

export type CustoplayerItem =
  | ProgressBarItem
  | PlayButtonItem
  | VolumeItem
  | TimeItem
  | FullscreenItem;
