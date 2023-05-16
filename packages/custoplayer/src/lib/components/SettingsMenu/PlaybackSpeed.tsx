import { myScope, playbackSpeedAtom, videoElemAtom } from '@root/lib/atoms';
import { useAtomValue } from 'jotai';
import { CheckIcon, MenuButton, MenuItem } from './styles';
import { SettingsButtonItem } from '@root/lib/types';

interface PlaybackSpeedProps {
  item: SettingsButtonItem;
}

function PlaybackSpeed({ item }: PlaybackSpeedProps) {
  const playbackSpeed = useAtomValue(playbackSpeedAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);

  const subtitleElements = item.options?.playbackSpeed.map(
    (speed: number, i: number) => (
      <MenuItem key={`settingsMenuSpeedButton-${i}`}>
        <MenuButton
          data-cy={`settingsMenuSpeedButton-${speed + ''}x`}
          onClick={() => (videoElem ? (videoElem.playbackRate = speed) : null)}
          settingsMenuColor={item.settingsMenuColor}
          layout
        >
          {speed} {playbackSpeed === speed && <CheckIcon />}
        </MenuButton>
      </MenuItem>
    ),
  );
  return <>{subtitleElements}</>;
}

export default PlaybackSpeed;
