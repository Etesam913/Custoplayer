import { PreviewTooltipItem } from '@root/lib/types';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  myScope,
  previewTooltipPositionAtom,
  previewTooltipStrAtom,
  valuesAtom,
} from '../atoms';

interface PreviewTooltipProps {
  isHovered: boolean;
  isProgressDragging: boolean;
  data: PreviewTooltipItem;
}

function PreviewTooltips({
  isHovered,
  isProgressDragging,
  data,
}: PreviewTooltipProps) {
  const previewTooltipPosition = useAtomValue(
    previewTooltipPositionAtom,
    myScope,
  );
  const previewTooltipStr = useAtomValue(previewTooltipStrAtom, myScope);
  const videoValues = useAtomValue(valuesAtom, myScope);
  return (
    <>
      {data.id === 'text' && (
        <TextTooltip
          backgroundColor={videoValues.controlsBar?.barColor}
          data-cy='textPreviewTooltip'
          isVisible={isHovered || isProgressDragging}
          style={{
            transform: `translate(${previewTooltipPosition}px, -60px)`,
          }}
        >
          {previewTooltipStr}
        </TextTooltip>
      )}
    </>
  );
}

const TextTooltip = styled.span<{
  isVisible: boolean;
  backgroundColor: string | undefined;
}>`
  position: absolute;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'rgba(28, 28, 28, 0.7)'};
  pointer-events: none;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 300ms;
  box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, 0.25);
`;

export default PreviewTooltips;
