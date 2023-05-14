import { myScope, videoQualitiesAtom } from '@root/lib/atoms';
import { useAtomValue } from 'jotai';
import { objectKeys } from 'ts-extras';
import { MenuButton, MenuItem } from './styles';
import { SettingsButtonItem } from '@root/lib/types';

interface QualityProps {
  item: SettingsButtonItem;
}

function Quality({ item }: QualityProps) {
  const videoQualities = useAtomValue(videoQualitiesAtom, myScope);
  const qualities = objectKeys(videoQualities);
  const qualityElements = qualities.map((quality) => {
    const src = videoQualities[quality];

    if (src !== null) {
      return (
        <MenuItem>
          <MenuButton settingsMenuColor={item.settingsMenuColor}>
            {quality + 'p'}
          </MenuButton>
        </MenuItem>
      );
    }
  });
  return <>{qualityElements}</>;
}

export default Quality;
