import { CustoplayerItem } from '@/types';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { getVideoElemAtom, myScope } from '@/lib/atoms';
import { barMouseEvent } from '@/lib/utils';

interface ProgressBarsProps {
  item: CustoplayerItem;
}

function ProgressBars({ item }: ProgressBarsProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  function handleProgressMouse(mousePos: number) {
    if (progressBarRef && progressBarRef.current) {
      console.log(mousePos / progressBarRef.current.clientWidth);
    }
  }

  if (item.id === 'progressBar1') {
    return (
      <ProgressBarContainer
        onMouseDown={(e) => barMouseEvent(e, handleProgressMouse, setIsHovered)}
      >
        <ProgressBar1
          ref={progressBarRef}
          role='progressbar'
          animate={{ height: isHovered ? '0.6rem' : '0.35rem' }}
        ></ProgressBar1>
      </ProgressBarContainer>
    );
  } else {
    return <div>test</div>;
  }
}

const ProgressBarContainer = styled.div`
  height: calc(100% - 0.15rem);
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProgressBar1 = styled(motion.div)`
  display: flex;
  background-color: #f2f2f2;
  width: 100%;
  height: 0.35rem;
  border-radius: 0.7rem;
`;

export default ProgressBars;
