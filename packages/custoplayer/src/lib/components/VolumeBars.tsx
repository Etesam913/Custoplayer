import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { myScope, isVolumeDraggingType, volumeStrAtom } from '../atoms';

interface VolumeBarsProps {
  barId: 'volumeBar1' | 'volumeBar2';
  volumeColor?: string;
  barColor?: string;
  isBarHovered: boolean;
  isVolumeDragging: isVolumeDraggingType;
}
type Ref = HTMLDivElement;
const VolumeBars = forwardRef<Ref, VolumeBarsProps>((props, ref) => {
  const volumeStr = useAtomValue(volumeStrAtom, myScope);
  if (props.barId === 'volumeBar1') {
    return (
      <VolumeBar1
        barColor={props.barColor}
        data-testid={props.barId}
        ref={ref}
        animate={{
          height:
            props.isBarHovered || props.isVolumeDragging ? '0.5rem' : '0.35rem',
        }}
      >
        <Progress
          style={{ width: volumeStr }}
          volumeColor={props.volumeColor}
        />
      </VolumeBar1>
    );
  } else if (props.barId === 'volumeBar2') {
    return (
      <VolumeBar2Shade>
        <VolumeBar2
          barColor={props.barColor}
          data-testid={props.barId}
          ref={ref}
        >
          <Progress
            style={{ height: volumeStr }}
            volumeColor={props.volumeColor}
          />
        </VolumeBar2>
      </VolumeBar2Shade>
    );
  } else return <></>;
});

export default VolumeBars;

const VolumeBar1 = styled(motion.div)<{ barColor: string | undefined }>`
  height: 0.35rem;
  background-color: ${(props) => (props.barColor ? props.barColor : 'white')};
  width: 3.5rem;
  border-radius: 0.35rem;
  margin-left: 0.35rem;
  display: flex;
  overflow: hidden;
`;

const VolumeBar2Shade = styled.div`
  height: 5.9rem;
  width: 2rem;
  background-color: rgba(28, 28, 28, 0.7);
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
  overflow: hidden;
  background-color: ${(props) => (props.barColor ? props.barColor : 'white')};
`;

const Progress = styled.div<{ volumeColor: string | undefined }>`
  height: 100%;
  background-color: ${(props) =>
    props.volumeColor ? props.volumeColor : '#4ab860'};
`;
