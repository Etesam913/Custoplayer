import PlayButton1 from '../components/PlayButtons/PlayButton1';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  isSeekingAtom,
  itemsAtom,
  myScope,
  PlayState,
  playStateAtom,
  videoElemAtom,
} from '../atoms';
import { CustoplayerItem, PlayButtonItem } from '../types';
import { handlePlayState } from '../utils';
import { motion } from 'framer-motion';
import PlayButton2 from './PlayButtons/PlayButton2';
import PauseButton2 from './PlayButtons/PauseButton2';
import PauseButton1 from './PlayButtons/PauseButton1';
import { playIndicatorAnimation } from '../variants';
import Loader from './Loader';

function findPlayButton(items: (CustoplayerItem | undefined)[]) {
  if (items === undefined) return undefined;
  const playButton = items.find(
    (item) => item && item.id.startsWith('playButton'),
  );
  if (!playButton) {
    return undefined;
  }
  return playButton as PlayButtonItem;
}

function PlayIndicator() {
  const playState = useAtomValue(playStateAtom, myScope);
  const isSeeking = useAtomValue(isSeekingAtom, myScope);
  const items = useAtomValue(itemsAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const playButtonItem: PlayButtonItem | undefined = findPlayButton(items);

  function renderPlayButton() {
    if (isSeeking) {
      return <Loader />;
    }
    if (playButtonItem?.id === 'playButton2') {
      if (playState === PlayState.playing) {
        return <PauseButton2 isIndicator />;
      } else if (playState === PlayState.paused) {
        return <PlayButton2 isIndicator />;
      }
    } else {
      if (playState === PlayState.playing) {
        return <PauseButton1 isIndicator />;
      } else if (playState === PlayState.paused) {
        return <PlayButton1 isIndicator />;
      }
    }
  }

  return (
    <Container>
      <IndicatorContainer
        data-cy='playIndicator'
        playButtonColor={playButtonItem?.buttonColor ?? 'white'}
        variants={playIndicatorAnimation}
        animate='anim'
        custom={isSeeking || playState === PlayState.paused}
      >
        {renderPlayButton()}
      </IndicatorContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const IndicatorContainer = styled(motion.button)<{
  playButtonColor: string | undefined;
}>`
  color: ${(props) => props.playButtonColor};
  background-color: transparent;
  filter: drop-shadow(rgba(0, 0, 0, 0.35) 0px 5px 15px);
  padding: 0;
  border: 0;
`;

export default PlayIndicator;
