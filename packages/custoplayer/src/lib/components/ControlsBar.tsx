import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { getControlsBarAtom, getVideoDimensionsAtom, myScope } from '../atoms';

function ControlsBar() {
  const [isControlsBarShowing] = useAtom(getControlsBarAtom, myScope);
  const [videoDimensions] = useAtom(getVideoDimensionsAtom, myScope);

  return (
    <AnimatePresence>
      {isControlsBarShowing && (
        <ControlsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Controls>
            {videoDimensions.height} ... {videoDimensions.width}
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

const Controls = styled.div`
  height: 2.8rem;
  background-color: rgba(28, 28, 28, 0.7);
  width: 100%;
`;

export default ControlsBar;
