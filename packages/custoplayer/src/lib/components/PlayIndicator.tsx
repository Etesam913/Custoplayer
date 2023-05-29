import PlayButton1 from '../components/PlayButtons/PlayButton1';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  currentSubtitleAtom,
  isSeekingAtom,
  itemsAtom,
  myScope,
  PlayState,
  playStateAtom,
  showControlsBarAtom,
  videoElemAtom,
} from '../atoms';
import { CustoplayerItem, PlayButtonItem } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import PlayButton2 from './PlayButtons/PlayButton2';
import PauseButton2 from './PlayButtons/PauseButton2';
import PauseButton1 from './PlayButtons/PauseButton1';
import {
  playIndicatorAnimation,
  subtitleAnimation,
  subtitleTransition,
} from '../variants';
import Loader from './Loader';
import RestartButton1 from './PlayButtons/RestartButton1';
import RestartButton2 from './PlayButtons/RestartButton2';
import { handlePlayState } from '../utils';

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
  const currentSubtitle = useAtomValue(currentSubtitleAtom, myScope);
  const isControlsShowing = useAtomValue(showControlsBarAtom, myScope);
  const playButtonItem: PlayButtonItem | undefined = findPlayButton(items);
  const videoElem = useAtomValue(videoElemAtom, myScope);

  function renderPlayButton() {
    if (isSeeking) {
      return <Loader />;
    }
    if (playButtonItem?.id === 'playButton2') {
      if (playState === PlayState.playing) {
        return <PauseButton2 isIndicator />;
      } else if (playState === PlayState.paused) {
        return <PlayButton2 isIndicator />;
      } else if (playState === PlayState.ended) {
        return <RestartButton2 isIndicator />;
      }
    } else {
      if (playState === PlayState.playing) {
        return <PauseButton1 isIndicator />;
      } else if (playState === PlayState.paused) {
        return <PlayButton1 isIndicator />;
      } else if (playState === PlayState.ended) {
        return <RestartButton1 isIndicator />;
      }
    }
  }

  const showPlayIndicator =
    isSeeking ||
    playState === PlayState.paused ||
    playState === PlayState.ended;

  return (
    <Container>
      <IndicatorContainer
        data-cy='playIndicator'
        tabIndex={showPlayIndicator ? 0 : -1}
        playButtonColor={playButtonItem?.buttonColor ?? 'white'}
        variants={playIndicatorAnimation}
        whileHover={{ scale: 1.1 }}
        animate='anim'
        custom={showPlayIndicator}
        onKeyDown={(e) => e.key === 'Enter' && handlePlayState(videoElem)}
      >
        {renderPlayButton()}
      </IndicatorContainer>
      <AnimatePresence>
        {currentSubtitle && (
          <SubtitleContainer
            data-cy='currentSubtitle'
            custom={isControlsShowing}
            initial='init'
            animate='anim'
            exit='exit'
            variants={subtitleAnimation}
            transition={subtitleTransition}
          >
            {currentSubtitle.text}
          </SubtitleContainer>
        )}
      </AnimatePresence>
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
  pointer-events: none;
  flex-direction: column;
`;

const IndicatorContainer = styled(motion.button)<{
  playButtonColor: string | undefined;
}>`
  color: ${(props) => props.playButtonColor};
  background-color: transparent;
  filter: drop-shadow(rgba(0, 0, 0, 0.35) 0px 5px 15px);
  padding: 0;
  border: 0;
  pointer-events: none;
  will-change: transform;
  :focus-visible {
    outline: 3.25px dashed ${(props) => props.theme.focusColor};
  }
`;

const SubtitleContainer = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  text-align: center;
  padding: 0.5rem;
  background-color: black;
  margin: 1rem;
  opacity: 0.75;
  font-size: 1.1em;
`;

export default PlayIndicator;
