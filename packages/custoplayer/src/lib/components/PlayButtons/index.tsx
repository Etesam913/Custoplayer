import { PlayButtonItem } from '@root/lib/types';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  myScope,
  PlayState,
  playStateAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import { handlePlayState } from '@root/lib/utils';
import PauseButton2 from './PauseButton2';
import PlayButton2 from './PlayButton2';
import PlayButton1 from './PlayButton1';
import PauseButton1 from './PauseButton1';

interface PlayButtonsProps {
  item: PlayButtonItem;
}

function PlayButtons({ item }: PlayButtonsProps) {
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);

  /*
    Prevent default onKeyUp to prevent space from triggering onClick
    <PlayerWrapper> handles key presses
  */

  return (
    <PlayButtonContainer
      onMouseMove={(e) => e.preventDefault}
      onClick={() => handlePlayState(videoElem)}
      onKeyUp={(e) => e.preventDefault()}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      data-cy={item.id}
    >
      {item.id === 'playButton1' && (
        <>
          {playState === PlayState.paused && <PlayButton1 />}
          {playState === PlayState.playing && <PauseButton1 />}
        </>
      )}
      {item.id === 'playButton2' && (
        <>
          {playState === PlayState.paused && <PlayButton2 />}
          {playState === PlayState.playing && <PauseButton2 />}
        </>
      )}
    </PlayButtonContainer>
  );
}

const PlayButtonContainer = styled(motion.button)`
  cursor: pointer;
  background: transparent;
  border: 0;
  padding: 0;
  color: currentColor;
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 2.5px dashed ${(props) => props.theme.focusColor};
  }
`;
export default PlayButtons;
