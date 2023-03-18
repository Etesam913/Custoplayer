import {
  isCurrentTime,
  isDuration,
  isFullscreenButton,
  isPlayButton,
  isProgressBar,
  isVolumeComponent,
} from '../utils';
import { CustoplayerItem } from '../types';
import PlayButtons from './PlayButtons';
import ProgressBars from './ProgressBars';
import VolumeButtons from './VolumeButtons';
import CurrentTime from './CurrentTime';
import Duration from './Duration';
import FullscreenButtons from './FullscreenButtons';
import { useAtomValue } from 'jotai';
import { isFullscreenAtom, myScope } from '../atoms';

function ItemRenderer({ item }: { item: CustoplayerItem }) {
  const isFullscreen = useAtomValue(isFullscreenAtom, myScope);

  if (isPlayButton(item)) return <PlayButtons item={item} />;
  else if (isProgressBar(item)) return <ProgressBars item={item} />;
  else if (isVolumeComponent(item)) return <VolumeButtons item={item} />;
  else if (isCurrentTime(item)) return <CurrentTime />;
  else if (isDuration(item)) return <Duration />;
  else if (isFullscreenButton(item))
    return <FullscreenButtons item={item} isFullscreen={isFullscreen} />;
  else return <></>;
}

export default ItemRenderer;
