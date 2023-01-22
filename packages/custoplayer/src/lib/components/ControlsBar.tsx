import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { getShowControlsBarAtom, getItemsAtom, myScope } from '../atoms';
import { renderItemFromData } from '../utils';

function ControlsBar() {
  const [isControlsBarShowing] = useAtom(getShowControlsBarAtom, myScope);
  const [items] = useAtom(getItemsAtom, myScope);
  return (
    <AnimatePresence>
      {isControlsBarShowing && (
        <ControlsContainer
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
                    <ItemContainer key={`item-${idx}`} color={curItem.color}>
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
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
`;

const ItemContainer = styled.div`
  height: 36px;
  width: 36px;
  color: ${(props) => (props.color ? props.color : 'white')};
`;

export default ControlsBar;
