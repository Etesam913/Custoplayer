import { myScope, progressStrAtom, valuesAtom } from '@root/lib/atoms';
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

  return (
    <Bar1
      ref={ref}
      role='progressbar'
      animate={{
        height: props.shouldAnimate ? '0.6rem' : '0.35rem',
      }}
      transition={{ duration: 0.2 }}
    >
      <Progress
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

const Bar1 = styled(motion.div)`
  display: flex;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 0.7rem;
  justify-content: flex-start;
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
  ${(props) =>
    props.hasScrubber &&
    css`
      min-width: 16px;
    `}
  background-color: ${(props) =>
    props.progressColor ? props.progressColor : '#4ab860'};
`;

const Scrubber = styled(motion.div)<{
  scrubberColor: string | undefined;
  scrubberBorderColor: string | undefined;
}>`
  height: 0.75rem;
  width: 0.75rem;
  background-color: ${(props) => props.scrubberColor ?? 'white'};
  position: absolute;
  border-radius: 50rem;
  border: ${(props) =>
    props.scrubberBorderColor !== undefined
      ? '2px solid ' + props.scrubberBorderColor
      : props.scrubberColor !== undefined
      ? '2px solid ' + lightenColor(props.scrubberColor)
      : 'none'};
`;

export default ProgressBar1;
