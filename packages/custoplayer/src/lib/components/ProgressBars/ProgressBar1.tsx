import {
  myScope,
  progressBufferPercentAtom,
  progressStrAtom,
  valuesAtom,
} from '@root/lib/atoms';
import { ProgressBarItem } from '@root/lib/types';
import { lightenColor } from '@root/lib/utils';
import { progressBar1ScrubberAnimation } from '@root/lib/variants';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import PreviewTooltips from '../PreviewTooltips';

interface ProgressBarProps {
  hasScrubber: boolean;
  shouldAnimate: boolean;
  item: ProgressBarItem;
  isProgressDragging: boolean;
  isHovered: boolean;
}

type Ref = HTMLDivElement;

const ProgressBar1 = forwardRef<Ref, ProgressBarProps>((props, ref) => {
  const values = useAtomValue(valuesAtom, myScope);
  const progressStr = useAtomValue(progressStrAtom, myScope);
  const progressBufferPercent = useAtomValue(
    progressBufferPercentAtom,
    myScope,
  );

  return (
    <Bar1
      ref={ref}
      barBorderColor={props.item.barBorderColor}
      barColor={props.item.barColor}
      role='progressbar'
      animate={{
        height: props.shouldAnimate ? '0.6rem' : '0.35rem',
      }}
      transition={{ duration: 0.2 }}
    >
      <ProgressBuffer
        data-cy='progressBuffer1'
        width={`${progressBufferPercent}%`}
        bufferedColor={props.item.bufferedColor}
      />
      <Progress
        data-cy='progress1'
        hasScrubber={props.hasScrubber}
        style={{
          width: props.hasScrubber ? `calc(${progressStr} + 6px)` : progressStr,
        }}
        progressColor={props.item.progressColor}
      >
        <Scrubber
          scrubberColor={props.item.scrubberColor ?? props.item.progressColor}
          scrubberBorderColor={props.item.scrubberBorderColor}
          variants={progressBar1ScrubberAnimation}
          custom={props.shouldAnimate}
          initial='init'
          animate='anim'
          data-cy='progressBar1Scrubber'
        />
      </Progress>

      {values.previewTooltip && (
        <PreviewTooltips
          isHovered={props.isHovered}
          isProgressDragging={props.isProgressDragging}
          data={values.previewTooltip}
        />
      )}
    </Bar1>
  );
});

const Bar1 = styled(motion.div)<{
  barColor: string | undefined;
  barBorderColor: string | undefined;
}>`
  display: flex;
  background-color: ${(props) => (props.barColor ? props.barColor : '#f2f2f2')};
  border: 2.25px solid
    ${(props) => (props.barBorderColor ? props.barBorderColor : 'none')};
  width: 100%;
  border-radius: 0.7rem;
  justify-content: flex-start;
  position: relative;
`;

const Progress = styled.div<{
  progressColor: string | undefined;
  hasScrubber: boolean;
}>`
  height: 100%;
  pointer-events: none;
  border-radius: 0.7rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  z-index: 2;

  ${(props) =>
    props.hasScrubber &&
    css`
      min-width: 16px;
    `}
  background-color: ${(props) =>
    props.progressColor ? props.progressColor : '#4ab860'};
`;

const ProgressBuffer = styled.div<{
  width: string;
  bufferedColor: string | undefined;
}>`
  position: absolute;
  pointer-events: none;
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${(props) =>
    props.bufferedColor ? props.bufferedColor : 'rgba(0,0,0,0.4)'};
  z-index: 1;
  border-radius: 50rem;
`;

const Scrubber = styled(motion.div)<{
  scrubberColor: string | undefined;
  scrubberBorderColor: string | undefined;
}>`
  height: 1rem;
  width: 1rem;
  background-color: ${(props) => props.scrubberColor ?? 'white'};
  position: absolute;
  border-radius: 50rem;
  box-sizing: border-box;
  border: ${(props) =>
    props.scrubberBorderColor !== undefined
      ? '2px solid ' + props.scrubberBorderColor
      : props.scrubberColor !== undefined
      ? '2px solid ' + lightenColor(props.scrubberColor)
      : '2px solid white'};
`;
ProgressBar1.displayName = 'ProgressBar1';
export default ProgressBar1;
