import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  myScope,
  draggableSymbol,
  showControlsBarAtom,
  itemsAtom,
  progressBarActiveAtom,
} from '../atoms';
import { renderItemFromData } from '../utils';

function ControlsBar() {
  const isControlsBarShowing = useAtomValue(showControlsBarAtom, myScope);
  const items = useAtomValue(itemsAtom, myScope);
  const isProgressBarActive = useAtomValue(progressBarActiveAtom, myScope);
  return (
    <AnimatePresence>
      {(isProgressBarActive || isControlsBarShowing) && (
        <ControlsContainer
          className={draggableSymbol.toString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Controls height='45px'>
            {items.map((curItem, idx) => {
              return (
                <>
                  {curItem === undefined ? (
                    <></>
                  ) : (
                    <ItemContainer
                      isProgressBar={curItem?.id.startsWith('progressBar')}
                      key={`item-${idx}`}
                      color={curItem.color}
                    >
                      {renderItemFromData(curItem)}
                    </ItemContainer>
                  )}
                </>
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

const ItemContainer = styled.div<{ isProgressBar: boolean }>`
  height: 36px;
  width: 36px;
  color: ${(props) => (props.color ? props.color : 'white')};
  flex: ${(props) => (props.isProgressBar ? '1' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.65rem;

  :last-child {
    margin-right: 0;
  }
`;

export default ControlsBar;
