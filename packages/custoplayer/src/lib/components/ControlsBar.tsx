import { CustoplayerItem } from '@root/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { Fragment } from 'react';
import styled from 'styled-components';
import ItemRenderer from './ItemRenderer';
import {
  draggableSymbol,
  isProgressDraggingAtom,
  isVolumeDraggingAtom,
  itemsAtom,
  myScope,
  showControlsBarAtom,
  valuesAtom,
  videoDimensionsAtom,
} from '@root/lib/atoms';
import {
  getReadableTextColor,
  isCurrentTime,
  isDuration,
  isFullscreenButton,
  isPlayButton,
  isProgressBar,
  isSettingsButton,
  isVolumeComponent,
} from '@root/lib/utils';
import {
  controlsBarMovementAnimation,
  controlsBarOpacityAnimation,
} from '@root/lib/variants';
import ProgressBars from './ProgressBars/index';

function extractColor(curItem: CustoplayerItem) {
  if (
    isPlayButton(curItem) ||
    isVolumeComponent(curItem) ||
    isFullscreenButton(curItem) ||
    isSettingsButton(curItem)
  )
    return curItem.buttonColor;
  else if (isDuration(curItem) || isCurrentTime(curItem))
    return curItem.textColor;
  return undefined;
}

function ControlsBar() {
  const isControlsBarShowing = useAtomValue(showControlsBarAtom, myScope);
  const items = useAtomValue(itemsAtom, myScope);
  const isProgressDragging = useAtomValue(isProgressDraggingAtom, myScope);
  const isVolumeDragging = useAtomValue(isVolumeDraggingAtom, myScope);
  const videoDimensions = useAtomValue(videoDimensionsAtom, myScope);
  const videoValues = useAtomValue(valuesAtom, myScope);

  function renderItem(curItem: CustoplayerItem | undefined, i: number) {
    if (
      curItem === undefined ||
      (curItem.hideOnMobile && videoDimensions.width < 768)
    ) {
      return <></>;
    }

    const firstItemToRight = items
      .slice(i + 1)
      .find(
        (item: CustoplayerItem | undefined) =>
          item !== undefined &&
          (!item.hideOnMobile ||
            (item.hideOnMobile && videoDimensions.width >= 768)),
      );

    // findLast does not seem to be supported by ts so I have to do this instead
    let firstItemToLeft = undefined;
    for (let j = i - 1; j > -1; j--) {
      const curItem = items[j];
      if (
        curItem !== undefined &&
        (!curItem.hideOnMobile ||
          (curItem.hideOnMobile && videoDimensions.width >= 768))
      ) {
        firstItemToLeft = items[j];
        break;
      }
    }

    return (
      <ItemContainer
        marginLeft={curItem.marginLeft}
        marginRight={curItem.marginRight}
        isProgressBarNextItem={
          firstItemToRight ? isProgressBar(firstItemToRight) : false
        }
        isProgressBarPreviousItem={
          firstItemToLeft ? isProgressBar(firstItemToLeft) : false
        }
        onClick={(e) => e.stopPropagation()}
        isProgressBar={isProgressBar(curItem)}
        color={
          extractColor(curItem) ??
          getReadableTextColor(videoValues.controlsBar?.barColor ?? '')
        }
      >
        <ItemRenderer item={curItem} />
      </ItemContainer>
    );
  }
  const shouldShowControlsBar =
    isProgressDragging || isVolumeDragging || isControlsBarShowing;

  return (
    <AnimatePresence>
      {shouldShowControlsBar && (
        <ControlsContainer
          className={draggableSymbol.toString()}
          variants={
            videoValues.controlsBar?.animate === 'movement'
              ? controlsBarMovementAnimation
              : controlsBarOpacityAnimation
          }
          initial='init'
          animate='anim'
          exit='exit'
          data-cy='controlsBar'
        >
          {videoValues.topProgressBar && (
            <TopProgressBarContainer>
              <ProgressBars onTop={true} item={videoValues.topProgressBar} />
            </TopProgressBarContainer>
          )}

          <Controls
            height='45px'
            backgroundColor={videoValues.controlsBar?.barColor}
          >
            {items.map((curItem, idx) => {
              return (
                <Fragment key={`item-${idx}`}>
                  {renderItem(curItem, idx)}
                </Fragment>
              );
            })}
          </Controls>
        </ControlsContainer>
      )}
    </AnimatePresence>
  );
}

const ControlsContainer = styled(motion.div)`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Controls = styled.div<{
  height: string;
  backgroundColor: string | undefined;
}>`
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'rgba(28, 28, 28, 0.7)'};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
`;

export const ItemContainer = styled.div<{
  isProgressBar: boolean;
  color: string;
  marginRight: string | undefined;
  marginLeft: string | undefined;
  isProgressBarNextItem: boolean;
  isProgressBarPreviousItem: boolean;
}>`
  height: 100%;
  width: auto;
  color: ${(props) => props.color};
  flex: ${(props) => (props.isProgressBar ? '1' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  /*
  Progress bars don't have margin by default
  If the next item is a progress bar the margin is increased (the scrubber takes up space)
  Otherwise use the default margin of 0.35rem
  */
  margin-right: ${(props) =>
    props.marginRight
      ? props.marginRight
      : props.isProgressBarNextItem
      ? '0.85rem'
      : props.isProgressBar
      ? '0'
      : '0.35rem'};

  margin-left: ${(props) =>
    props.marginLeft
      ? props.marginLeft
      : props.isProgressBarPreviousItem
      ? '0.85rem'
      : '0'};

  :last-child {
    margin-right: ${(props) => (props.marginRight ? props.marginRight : '0')};
  }
`;

export const TopProgressBarContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default ControlsBar;
