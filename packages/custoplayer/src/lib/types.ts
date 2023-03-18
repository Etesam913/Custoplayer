import { ComponentPropsWithoutRef } from 'react';

export interface CustoplayerProps extends ComponentPropsWithoutRef<'video'> {
  values: CustoplayerValues;
}

export interface CustoplayerValues {
  playIndicator?: {
    id?: number;
    color?: string;
  };
  previewTooltip?: PreviewTooltipItem;
  item1?: CustoplayerItem;
  item2?: CustoplayerItem;
  item3?: CustoplayerItem;
  item4?: CustoplayerItem;
  item5?: CustoplayerItem;
  item6?: CustoplayerItem;
  item7?: CustoplayerItem;
}

export interface PreviewTooltipItem {
  id: 'text' | 'thumbnail' | 'textAndThumbnail';
}

export interface VolumeItem {
  id: 'volumeButton1' | 'volumeButton2';
  barId: 'volumeBar1' | 'volumeBar2';
  volumeColor?: string;
  barColor?: string;
  buttonColor?: string;
  hideOnMobile?: boolean;
}

export interface PlayButtonItem {
  id: 'playButton1' | 'playButton2';
  buttonColor?: string;
  hideOnMobile?: boolean;
}

export interface ProgressBarItem {
  id: 'progressBar1' | 'progressBar2';
  progressColor?: string;
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
