import {
  myScope,
  subtitlesAtom,
  currentTextTrackAtom,
  valuesAtom,
  currentSubtitleAtom,
} from '@root/lib/atoms';
import { hideAllSubtitleTracks, selectSubtitleTrack } from '@root/lib/utils';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { CheckIcon, MenuItem } from './styles';
import { SettingsButtonItem } from '@root/lib/types';
import MenuButton from './MenuButton';

interface SubtitlesProps {
  item: SettingsButtonItem;
}

function Subtitles({ item }: SubtitlesProps) {
  const videoValues = useAtomValue(valuesAtom, myScope);
  const settingsMenuColor =
    item.settingsMenuColor ?? videoValues?.controlsBar?.barColor;
  const [subtitles, setSubtitles] = useAtom(subtitlesAtom, myScope);
  const [currentTextTrack, setCurrentTextTrack] = useAtom(
    currentTextTrackAtom,
    myScope,
  );
  const setCurrentSubtitle = useSetAtom(currentSubtitleAtom, myScope);

  if (subtitles !== null) {
    const subtitleElements = subtitles.map((textTrack: TextTrack, i) => (
      <MenuItem key={`subtitle-${i}`}>
        <MenuButton
          dataCy={`settingsMenuSubtitleButton${textTrack.label}`}
          settingsMenuColor={settingsMenuColor}
          onClick={() => selectSubtitleTrack(setSubtitles, i)}
        >
          {textTrack.label}
          {currentTextTrack?.label === textTrack.label && <CheckIcon />}
        </MenuButton>
      </MenuItem>
    ));
    return (
      <>
        <MenuItem>
          <MenuButton
            dataCy={`settingsMenuSubtitleButtonNone`}
            settingsMenuColor={settingsMenuColor}
            onClick={() =>
              hideAllSubtitleTracks(
                setSubtitles,
                setCurrentSubtitle,
                setCurrentTextTrack,
              )
            }
          >
            None
            {currentTextTrack === null && <CheckIcon />}
          </MenuButton>
        </MenuItem>
        {subtitleElements}
      </>
    );
  }
  return <></>;
}

export default Subtitles;
