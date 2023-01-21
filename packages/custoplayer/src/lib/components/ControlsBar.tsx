import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import styled from 'styled-components';
import {
  getControlsBarAtom,
  getItemsAtom,
  getVideoDimensionsAtom,
  myScope,
  videoElemReadAtom,
} from '../atoms';
import { renderItemFromData } from '../utils';

function ControlsBar() {
  const [videoElem] = useAtom(videoElemReadAtom, myScope);
  const [isControlsBarShowing] = useAtom(getControlsBarAtom, myScope);
  const [videoDimensions] = useAtom(getVideoDimensionsAtom, myScope);
  const [items] = useAtom(getItemsAtom, myScope);

  return (
    <AnimatePresence>
      {true && (
        <ControlsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Controls height='45px'>
            {items.map((curItem) => {
              return (
                <ItemContainer>{renderItemFromData(curItem)}</ItemContainer>
              );
            })}
          </Controls>
        </ControlsContainer>
      )}
    </AnimatePresence>
  );
}

const ControlsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: absolute;
  z-index: 6;
  left: 0;
  bottom: 0;
`;

const Controls = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background-color: rgba(28, 28, 28, 0.7);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
`;

const ItemContainer = styled.div`
  height: 36px;
  width: 36px;
  color: white;
`;

export default ControlsBar;
