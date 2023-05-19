import {
  currentQualityAtom,
  myScope,
  videoElemAtom,
  videoQualitiesAtom,
} from '@root/lib/atoms';
import { useAtomValue } from 'jotai';
import { objectKeys } from 'ts-extras';
import { CheckIcon, MenuItem } from './styles';
import MenuButton from './MenuButton';
import { SettingsButtonItem } from '@root/lib/types';

interface QualityProps {
  item: SettingsButtonItem;
}

function Quality({ item }: QualityProps) {
  const videoQualities = useAtomValue(videoQualitiesAtom, myScope);
  const currentQuality = useAtomValue(currentQualityAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const qualities = objectKeys(videoQualities).map((keyStr) => Number(keyStr));
  // Reverse sort so it goes from 1440p -> 144p
  qualities.sort((a, b) => b - a);

  function changeQuality(qualitySrc: string) {
    if (videoElem) {
      const curTime = videoElem.currentTime;
      const isPaused = videoElem.paused;
      videoElem.src = qualitySrc;
      videoElem.currentTime = curTime;

      if (!isPaused) {
        videoElem.play();
      }
    }
  }

  const qualityElements = qualities.map((quality) => {
    const src = videoQualities[quality];

    if (src !== null) {
      return (
        <MenuItem key={`quality-${quality}`}>
          <MenuButton
            dataCy={`settingsMenuQualityButton${quality}p`}
            settingsMenuColor={item.settingsMenuColor}
            onClick={() => changeQuality(src)}
          >
            {quality + 'p'}

            {currentQuality === quality && <CheckIcon />}
          </MenuButton>
        </MenuItem>
      );
    }
  });
  return <>{qualityElements}</>;
}

export default Quality;
