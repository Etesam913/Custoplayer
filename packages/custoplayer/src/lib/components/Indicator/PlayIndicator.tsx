import { useAtom, useAtomValue } from 'jotai';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import {
  isSeekingAtom,
  itemsAtom,
  myScope,
  PlayState,
  playStateAtom,
  showControlsBarAtom,
  valuesAtom,
  videoDimensionsAtom,
  videoElemAtom,
} from '@root/lib/atoms';
import { Fragment, useMemo } from 'react';
import { clamp, getSvgPath } from '../../utils';
import { CustoplayerItem } from '@root/types';

function PlayIndicator() {
  const videoValues = useAtomValue(valuesAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);
  const videoDimensions = useAtomValue(videoDimensionsAtom, myScope);
  const videoPlayState = useAtomValue(playStateAtom, myScope);
  const isControlsBarShowing = useAtomValue(showControlsBarAtom, myScope);
  const items = useAtomValue(itemsAtom, myScope);
  const isSeeking = useAtomValue(isSeekingAtom, myScope);

  const iconWidth =
    videoElem === null
      ? 160
      : clamp(
          (videoDimensions.width / videoElem.videoWidth) * 160 * 1.2,
          80,
          160,
        );
  const iconHeight =
    videoElem === null
      ? 160
      : clamp(
          (videoDimensions.height / videoElem.videoHeight) * 160 * 1.2,
          80,
          160,
        );

  function getPlayButtonColor(items: (CustoplayerItem | undefined)[]) {
    const item = items.find(
      (item) => item !== undefined && item.id.startsWith('playButton'),
    );
    return item?.color;
  }

  function getPlayIndicatorAnimation() {
    if (
      videoPlayState === PlayState.paused ||
      videoPlayState === PlayState.ended
    ) {
      return {
        opacity: isControlsBarShowing ? 1 : 0.5,
        scale: isControlsBarShowing ? 1.1 : 0.9,
      };
    } else {
      return {
        opacity: 0,
        scale: 0.2,
        transition: { delay: isSeeking ? 2 : 0 },
      };
    }
  }

  const playVariants = {
    init: {
      opacity: 0,
      scale: 0.5,
    },
    anim: getPlayIndicatorAnimation(),
  };
  return useMemo(() => {
    return (
      <IndicatorContainer
        variants={playVariants}
        initial='init'
        animate='anim'
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.9, type: 'spring' },
        }}
        height={iconHeight + 'px'}
        width={iconWidth + 'px'}
        color={
          videoValues.playIndicator?.color !== undefined
            ? videoValues.playIndicator?.color
            : getPlayButtonColor(items)
        }
        left={videoDimensions.width / 2 - iconWidth / 2 + 'px'}
        playIndicator={videoValues.playIndicator?.id}
        bottom={videoDimensions.height / 2 - iconHeight / 2 + 'px'}
      >
        <IndicatorSvg
          viewBox='0 0 24 24'
          width={videoPlayState === PlayState.paused ? iconWidth + 'px' : '85%'}
          height={
            videoPlayState === PlayState.paused ? iconHeight + 'px' : '85%'
          }
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color={
            videoValues.playIndicator?.color !== undefined
              ? videoValues.playIndicator?.color
              : getPlayButtonColor(items)
          }
        >
          <>
            {videoPlayState === PlayState.paused && (
              <>
                {getSvgPath(
                  'M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29239L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z',
                  '1.5',
                )}
              </>
            )}
            {videoPlayState === PlayState.playing && (
              <>
                {getSvgPath(
                  'M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 ',
                  '1.5',
                )}
              </>
            )}

            {videoPlayState === PlayState.ended && (
              <>
                {getSvgPath(
                  'M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001',
                  '1.5',
                )}
              </>
            )}
          </>
        </IndicatorSvg>
      </IndicatorContainer>
    );
  }, [
    videoPlayState,
    videoValues,
    videoDimensions,
    isControlsBarShowing,
    isSeeking,
  ]);
}

const IndicatorContainer = styled(motion.div)<{
  color: string | undefined;
  left: string;
  bottom: string;
  height: string;
  width: string;
  playIndicator: number | undefined;
}>`
  position: absolute;
  z-index: 2;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  pointer-events: none;
  border-radius: ${(props) =>
    props.playIndicator === 1 ? '10rem' : '1.25rem'};
  border: 6.5px solid ${(props) => (props.color ? props.color : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.color ? props.color : 'white')};
`;

const IndicatorSvg = styled(motion.svg)<{
  color: string | undefined;
  height: string;
  width: string;
}>`
  color: ${(props) => (props.color ? props.color : 'white')};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

export default PlayIndicator;
