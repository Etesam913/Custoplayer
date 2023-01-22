import { useAtom } from 'jotai';
import styled from 'styled-components';
import { AnimatePresence, easeInOut, motion, spring } from 'framer-motion';
import {
  getPlayStateAtom,
  getShowControlsBarAtom,
  getVideoDimensionsAtom,
  getVideoElemAtom,
  myScope,
  PlayState,
} from '../atoms';
import { Fragment } from 'react';
import { clamp, getSvgPath } from '../utils';

function PlayIndicator() {
  const [videoElem] = useAtom(getVideoElemAtom, myScope);
  const [videoDimensions] = useAtom(getVideoDimensionsAtom, myScope);
  const [videoPlayState] = useAtom(getPlayStateAtom, myScope);
  const [isControlsBarShowing] = useAtom(getShowControlsBarAtom, myScope);

  const iconWidth =
    videoElem === null
      ? 160
      : clamp((videoDimensions.width / videoElem.videoWidth) * 160, 110, 160);
  const iconHeight =
    videoElem === null
      ? 160
      : clamp((videoDimensions.height / videoElem.videoHeight) * 160, 110, 160);

  return (
    <AnimatePresence>
      {(videoPlayState === PlayState.paused ||
        videoPlayState === PlayState.ended) && (
        <PlayIndicatorIcon
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isControlsBarShowing ? 1 : 0.5,
            scale: isControlsBarShowing ? 1.1 : 0.9,
          }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.7, type: 'spring' },
          }}
          height={iconHeight + 'px'}
          width={iconWidth + 'px'}
          left={videoDimensions.width / 2 - iconWidth / 2 + 'px'}
          bottom={videoDimensions.height / 2 - iconHeight / 2 + 'px'}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {videoPlayState === PlayState.paused ? (
            <Fragment>
              {getSvgPath(
                'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
                '1.3',
              )}
              {getSvgPath(
                'M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29239L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z',
                '1.3',
              )}
            </Fragment>
          ) : (
            <Fragment>
              {getSvgPath(
                'M12 20.5001C16.6944 20.5001 20.5 16.6945 20.5 12.0001C20.5 9.17456 19.1213 6.67103 17 5.1255M13 22.4001L11 20.4001L13 18.4001M12 3.5001C7.30558 3.5001 3.5 7.30568 3.5 12.0001C3.5 14.8256 4.87867 17.3292 7 18.8747M11 5.6001L13 3.6001L11 1.6001',
                '1.3',
              )}
            </Fragment>
          )}
        </PlayIndicatorIcon>
      )}
    </AnimatePresence>
  );
}

const PlayIndicatorIcon = styled(motion.svg)<{
  left: string;
  bottom: string;
  height: string;
  width: string;
}>`
  position: absolute;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  color: white;
  cursor: pointer;
  pointer-events: none;
`;

export default PlayIndicator;
