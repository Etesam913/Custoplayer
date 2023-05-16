import { myScope, subtitlesAtom, currentTextTrackAtom } from '@root/lib/atoms';
import { selectSubtitleTrack } from '@root/lib/utils';
import { useAtom, useAtomValue } from 'jotai';
import { CheckIcon, MenuButton, MenuItem } from './styles';
import { SettingsButtonItem } from '@root/lib/types';

interface SubtitlesProps {
  item: SettingsButtonItem;
}

function Subtitles({ item }: SubtitlesProps) {
  const [subtitles, setSubtitles] = useAtom(subtitlesAtom, myScope);
  const currentTextTrack = useAtomValue(currentTextTrackAtom, myScope);

  if (subtitles !== null) {
    const subtitleElements = subtitles.map((textTrack: TextTrack, i) => (
      <MenuItem key={`subtitle-${i}`}>
        <MenuButton
          layout
          settingsMenuColor={item.settingsMenuColor}
          onClick={() => selectSubtitleTrack(setSubtitles, i)}
        >
          {textTrack.label}
          {currentTextTrack?.label === textTrack.label && <CheckIcon />}
        </MenuButton>
      </MenuItem>
    ));
    return <>{subtitleElements}</>;
  }
  return <></>;
}

export default Subtitles;
