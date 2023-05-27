import {
  myScope,
  playbackSpeedAtom,
  valuesAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import { useAtomValue } from 'jotai';
import { CheckIcon, MenuItem } from './styles';
import MenuButton from './MenuButton';
import { SettingsButtonItem } from '@root/lib/types';

interface PlaybackSpeedProps {
  item: SettingsButtonItem;
}

function PlaybackSpeed({ item }: PlaybackSpeedProps) {
  const playbackSpeed = useAtomValue(playbackSpeedAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const videoValues = useAtomValue(valuesAtom, myScope);
  const settingsMenuColor =
    item.settingsMenuColor ?? videoValues?.controlsBar?.barColor;

  const subtitleElements =
    item.options?.playbackSpeed &&
    item.options?.playbackSpeed.map((speed: number, i: number) => (
      <MenuItem key={`settingsMenuSpeedButton-${i}`}>
        <MenuButton
          dataCy={`settingsMenuSpeedButton-${speed + ''}x`}
          onClick={() => (videoElem ? (videoElem.playbackRate = speed) : null)}
          settingsMenuColor={settingsMenuColor}
        >
          {speed} {playbackSpeed === speed && <CheckIcon />}
        </MenuButton>
      </MenuItem>
    ));
  return <>{subtitleElements}</>;
}

export default PlaybackSpeed;
