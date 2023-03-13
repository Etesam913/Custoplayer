import { CustoplayerItem } from '@root/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { Fragment } from 'react';
import styled from 'styled-components';
import {
  myScope,
  draggableSymbol,
  showControlsBarAtom,
  itemsAtom,
  isProgressDraggingAtom,
  isVolumeDraggingAtom,
} from '../atoms';
import {
  isCurrentTime,
  isDuration,
  isPlayButton,
  isProgressBar,
  isVolume,
  renderItemFromData,
} from '../utils';

function extractColor(curItem: CustoplayerItem) {
  if (isPlayButton(curItem) || isVolume(curItem)) return curItem.buttonColor;
  else if (isDuration(curItem) || isCurrentTime(curItem))
    return curItem.textColor;

  return undefined;
}

function ControlsBar() {
  const isControlsBarShowing = useAtomValue(showControlsBarAtom, myScope);
  const items = useAtomValue(itemsAtom, myScope);
  const isProgressDragging = useAtomValue(isProgressDraggingAtom, myScope);
  const isVolumeDragging = useAtomValue(isVolumeDraggingAtom, myScope);

  return (
    <AnimatePresence>
      {(isProgressDragging || isVolumeDragging || isControlsBarShowing) && (
        <ControlsContainer
          className={draggableSymbol.toString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-cy='controlsBar'
        >
          <Controls height='45px'>
            {items.map((curItem, idx) => {
              return (
                <Fragment key={`item-${idx}`}>
                  {curItem === undefined ? (
                    <></>
                  ) : (
                    <ItemContainer
                      isProgressBar={isProgressBar(curItem)}
                      color={extractColor(curItem)}
                    >
                      {renderItemFromData(curItem)}
                    </ItemContainer>
                  )}
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

const Controls = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background-color: rgba(28, 28, 28, 0.7);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  box-sizing: border-box;
`;

export const ItemContainer = styled.div<{ isProgressBar: boolean }>`
  height: 100%;
  width: auto;
  color: ${(props) => (props.color ? props.color : 'white')};
  flex: ${(props) => (props.isProgressBar ? '1' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.35rem;

  :last-child {
    margin-right: 0;
  }
`;

export default ControlsBar;
