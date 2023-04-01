import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import {
  myScope,
  isVolumeDraggingType,
  volumeStrAtom,
  valuesAtom,
} from '@root/lib/atoms';
import { lightenColor } from '@root/lib/utils';
import {
  volumeBar1ScrubberAnimation,
  volumeBar2ScrubberAnimation,
} from '@root/lib/variants';

interface VolumeBarsProps {
  barId?: 'volumeBar1' | 'volumeBar2';
  volumeColor?: string;
  barColor?: string;
  scrubberColor?: string;
  scrubberBorderColor?: string;
  isBarHovered: boolean;
  isVolumeDragging: isVolumeDraggingType;
}
const volumeBar1Width = 56;
const volumeBar2Height = 76;

type Ref = HTMLDivElement;

const VolumeBars = forwardRef<Ref, VolumeBarsProps>((props, ref) => {
  const shouldAnimate = props.isBarHovered || props.isVolumeDragging;
  const videoValues = useAtomValue(valuesAtom, myScope);
  const volumeStr = useAtomValue(volumeStrAtom, myScope);
  const hasScrubber =
    props.scrubberColor !== 'transparent' &&
    props.scrubberBorderColor !== 'transparent';

  if (props.barId === 'volumeBar1') {
    return (
      <VolumeBar1
        barColor={props.barColor}
        data-cy={props.barId}
        ref={ref}
        animate={{
          height: shouldAnimate ? '0.5rem' : '0.35rem',
        }}
        transition={{ duration: 0.2 }}
      >
        <Progress
          style={{
            width: hasScrubber ? `calc(${volumeStr} + 5px)` : volumeStr,
          }}
          volumeColor={props.volumeColor}
          volumeBar2={false}
          hasScrubber={hasScrubber}
        >
          <Scrubber
            data-cy='volumeScrubber1'
            scrubberBorderColor={props.scrubberBorderColor}
            scrubberColor={props.scrubberColor ?? props.volumeColor}
            variants={volumeBar1ScrubberAnimation}
            custom={shouldAnimate}
            initial='init'
            animate='anim'
          />
        </Progress>
      </VolumeBar1>
    );
  } else if (props.barId === 'volumeBar2') {
    return (
      <VolumeBar2Shade backgroundColor={videoValues.controlsBar?.barColor}>
        <VolumeBar2 barColor={props.barColor} data-cy={props.barId} ref={ref}>
          <Progress
            volumeBar2
            style={{ height: volumeStr }}
            volumeColor={props.volumeColor}
            hasScrubber={
              props.scrubberColor !== 'transparent' &&
              props.scrubberBorderColor !== 'transparent'
            }
          >
            <Scrubber
              data-cy='volumeScrubber2'
              scrubberBorderColor={props.scrubberBorderColor}
              scrubberColor={props.scrubberColor ?? props.volumeColor}
              variants={volumeBar2ScrubberAnimation}
              custom={shouldAnimate}
              initial='init'
              animate='anim'
            />
          </Progress>
        </VolumeBar2>
      </VolumeBar2Shade>
    );
  } else return <></>;
});

VolumeBars.displayName = 'VolumeBars';

export default VolumeBars;

const VolumeBar1 = styled(motion.div)<{ barColor: string | undefined }>`
  height: 0.35rem;
  background-color: ${(props) => (props.barColor ? props.barColor : 'white')};
  width: 3.5rem;
  border-radius: 0.35rem;
  margin-left: 0.35rem;
  display: flex;
`;

const VolumeBar2Shade = styled.div<{ backgroundColor: string | undefined }>`
  height: 5.9rem;
  width: 2rem;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'rgba(28, 28, 28, 0.7)'};
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-30px, -68px);
  border-radius: 0.45rem 0.45rem 0 0;
  position: absolute;
`;

const VolumeBar2 = styled.div<{ barColor: string | undefined }>`
  height: 4.75rem;
  width: 0.5rem;
  display: flex;
  flex-direction: column-reverse;
  border-radius: 0.35rem;
  background-color: ${(props) => (props.barColor ? props.barColor : 'white')};
`;

const Progress = styled.div<{
  volumeColor: string | undefined;
  volumeBar2: boolean;
  hasScrubber: boolean;
}>`
  background-color: ${(props) =>
    props.volumeColor ? props.volumeColor : '#4ab860'};
  border-radius: 0.35rem;
  display: flex;
  ${(props) =>
    !props.volumeBar2 &&
    css`
      height: 100%;
      justify-content: flex-end;
      align-items: center;
      ${props.hasScrubber &&
      css`
        min-width: 12.8px;
        max-width: ${volumeBar1Width - 5.5}px;
      `}
    `}

  ${(props) =>
    props.volumeBar2 &&
    css`
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-items: center;
      ${props.hasScrubber &&
      css`
        min-height: 12.8px;
        max-height: ${volumeBar2Height}px;
      `}
    `}
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
