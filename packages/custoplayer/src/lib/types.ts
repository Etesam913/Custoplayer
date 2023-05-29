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
  /** You can define your progress bar to be on top of your controls bar here:
  @example
  topProgressBar: {
    id: 'progressBar1',
    progressColor: 'rgb(137, 178, 245)'
  } */
  topProgressBar?: ProgressBarItem;
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
    progressColor: 'rgb(137, 178, 245)',
    barColor: "white"
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
  /** Changes the color of the dashed outline that appears when you use the tab key to focus an item. Accepts any hex or rgb color code. */
  focusColor?: string;
}

export interface ControlsBarItem {
  /** Changes the color of the controlsBar. This also changes the default backgroundColor for the previewToolip. Accepts any hex or rgb color code. */
  barColor?: string;
  /** Changes how the controlsBar animates. Accepts values of "opacity" and "movement". Setting animate to "opacity" will do a simple fade in animation. Setting animate to "movement" will animate the controls bar from bottom -> up*/
  animate?: 'opacity' | 'movement';
}

export interface PreviewTooltipItem {
  /** Accepts value of "text" */
  id: 'text' | 'thumbnail' | 'textAndThumbnail';
  /** Accepts a string to the url of the image of the video */
  atlasImage?: string;
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
}

export interface ProgressBarItem {
  /** Accepts values of "progressBar1" or "progressBar2" */
  id: 'progressBar1' | 'progressBar2' | 'progressBar3';
  /** Changes the background color of the bar. Accepts any hex or rgb color code. */
  barColor?: string;
  /** Changes the border color of the third progress bar. Accepts any hex or rgb color code. */
  barBorderColor?: string;
  /** Changes the color of the progress of the progress bar. Accepts any hex or rgb color code. */
  progressColor?: string;
  /** Changes the color of the progress bar scrubber. Accepts any hex or rgb color code. Set both scrubberColor and scrubberBorderColor properties to "transparent" to disable the scrubber. */
  scrubberColor?: string;
  /** Changes the border color of the progress bar scrubber. Accepts any hex or rgb color code. Set both scrubberColor and scrubberBorderColor properties to "transparent" to disable the scrubber. */
  scrubberBorderColor?: string;
  bufferedColor?: string;
}

export interface TimeItem {
  /** Accepts values of "currentTime" or "duration" */
  id: 'currentTime' | 'duration';
  /** Changes the color of the time text. Accepts any hex or rgb color code. */
  textColor?: string;
}

export interface FullscreenButtonItem {
  /** Accepts values of "fullscreenButton1" or "fullscreenButton2" */
  id: 'fullscreenButton1' | 'fullscreenButton2';
  /** Changes the color of the fullscreen button. Accepts any hex or rgb color code. */
  buttonColor?: string;
}

export interface SettingsButtonItem {
  /** Accepts values of "settingsButton1" or "settingsButton2" */
  id: 'settingsButton1' | 'settingsButton2';
  /** Changes the color of the settings button. Accepts any hex or rgb color code. */
  buttonColor?: string;
  /** Changes the color of the settings menu. Accepts any hex or rgb color code. */
  settingsMenuColor?: string;
  /** Changes the orientation of the settings menu. Accepts values of 'left', 'right', or 'middle'.
   * This property is used to prevent the settings menu from being cut off.
   * For example if your settings menu is in item position 6 or 7, you may want to set the settingsMenuOrientation to 'left'
   */
  settingsMenuOrientation?: 'left' | 'middle' | 'right';
  /** Used to specify the things that can be customized in the settings menu.
    @example
    options: {
      subtitles: true,
      quality: true,
      playbackSpeed: [0.5, 1, 1.5, 2]
    }

    For quality to be extracted in the menu you have to have source tags defined as children of your video tag.
    The id property has to be `custoplayer-${quality}` for it to be found in the menu. The supported quality values
    are: [144, 240, 360, 480, 720, 1080, 1440, 2160]

    @example
    <video>
      <source
        src='1080p.mp4'
        type='video/mp4'
        id='custoplayer-1080'
      />
      <source
        src='720p.mp4'
        type='video/mp4'
        id='custoplayer-720'
      />
      <source
        src='480p.mp4'
        type='video/mp4'
        id='custoplayer-480'
      />
      <source
        src='240p.mp4'
        type='video/mp4'
        id='custoplayer-240'
      />
      <source
        src='144p.mp4'
        type='video/mp4'
        id='custoplayer-144'
      />
    </video>


    Subtitles can be extracted from the video by putting <track> tags as children to your video. Make sure to specify a label so that
    the subtitle option is available in the settings menu. It is recommended to set kind='metadata'

    @example
    <video>
      <track
        label='English'
        kind='metadata'
        src='english.vtt'
        default
        srcLang='en'
      />
      <track
        label='Spanish'
        kind='metadata'
        srcLang='es'
        src='spanish.vtt'
      />
    </video>
  */

  options?: {
    subtitles?: boolean;
    playbackSpeed?: number[];
    quality?: boolean;
  };
}

export type CustoplayerItem = (
  | ProgressBarItem
  | PlayButtonItem
  | VolumeItem
  | TimeItem
  | FullscreenButtonItem
  | SettingsButtonItem
) & {
  /** Hides the item when the video's width is less than 768px. Accepts values of true or false */
  hideOnMobile?: boolean;
  marginLeft?: string;
  marginRight?: string;
};

export type videoQualitiesAtomType = {
  [num: number]: null | string;
};
