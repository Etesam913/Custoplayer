import { CustoplayerItem } from '@root/types';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { Fragment } from 'react';
import styled from 'styled-components';
import {
  myScope,
  PlayState,
  playStateAtom,
  showControlsBarAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import { getSvgPath, handlePlayState } from '@root/lib/utils';

interface PlayButtonsProps {
  item: CustoplayerItem;
}

function PlayButtons({ item }: PlayButtonsProps) {
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const playState = useAtomValue(playStateAtom, myScope);
  // const [showControlsBar, setShowControlsBar] = useAtom(
  //   showControlsBarAtom,
  //   myScope,
  // );
  /* 
    Prevent default onKeyUp to prevent space from triggering onClick
    <PlayerWrapper> handles key presses
  */

  return (
    <PlayButtonContainer
      onMouseMove={(e) => e.preventDefault}
      onClick={() => handlePlayState(videoElem)}
      onKeyUp={(e) => e.preventDefault()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ scale: 1.05 }}
      data-testid={item.id}
    >
      {item.id === 'playButton1' && (
        <>
          {playState === PlayState.paused || playState === PlayState.playing ? (
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {playState === PlayState.playing ? (
                <Fragment>
                  {getSvgPath(
                    'M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  {getSvgPath(
                    'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
                  )}
                  {getSvgPath(
                    'M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29239L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z',
                  )}
                </Fragment>
              )}
            </svg>
          ) : (
            <svg
              width='80%'
              height='80%'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {getSvgPath(
                'M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001',
                '2.3',
              )}
            </svg>
          )}
        </>
      )}
      {item.id === 'playButton2' && (
        <>
          {playState === PlayState.paused || playState === PlayState.playing ? (
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {playState === PlayState.playing ? (
                <Fragment>
                  {getSvgPath(
                    'M9.5 15V9M14.5 15V9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z',
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  {getSvgPath(
                    'M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29239L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z',
                  )}
                  {getSvgPath(
                    'M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z',
                  )}
                </Fragment>
              )}
            </svg>
          ) : (
            <svg
              width='80%'
              height='80%'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {getSvgPath(
                'M11 2L14 5M14 5L11 8M14 5H6.8C5.11984 5 4.27976 5 3.63803 5.32698C3.07354 5.6146 2.6146 6.07354 2.32698 6.63803C2 7.27976 2 8.11984 2 9.8V15.5C2 15.9644 2 16.1966 2.02567 16.3916C2.2029 17.7378 3.26222 18.7971 4.60842 18.9743C4.80337 19 5.03558 19 5.5 19M10 19H17.2C18.8802 19 19.7202 19 20.362 18.673C20.9265 18.3854 21.3854 17.9265 21.673 17.362C22 16.7202 22 15.8802 22 14.2V8.5C22 8.03558 22 7.80337 21.9743 7.60842C21.7971 6.26222 20.7378 5.2029 19.3916 5.02567C19.1966 5 18.9644 5 18.5 5M10 19L13 22M10 19L13 16',
                '2.3',
              )}
            </svg>
          )}
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
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default PlayButtons;
