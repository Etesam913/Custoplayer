import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  myScope,
  previewTooltipPositionAtom,
  previewTooltipStrAtom,
} from '../atoms';

interface PreviewTooltipProps {
  isHovered: boolean;
  isProgressDragging: boolean;
}

function PreviewTooltips({
  isHovered,
  isProgressDragging,
}: PreviewTooltipProps) {
  const previewTooltipPosition = useAtomValue(
    previewTooltipPositionAtom,
    myScope,
  );
  const previewTooltipStr = useAtomValue(previewTooltipStrAtom, myScope);
  return (
    <TextTooltip
      isVisible={isHovered || isProgressDragging}
      style={{
        transform: `translate(${previewTooltipPosition}px, -60px)`,
      }}
    >
      {previewTooltipStr}
    </TextTooltip>
  );
}

const TextTooltip = styled.span<{ isVisible: boolean }>`
  position: absolute;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(28, 28, 28, 0.7);
  pointer-events: none;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 300ms;
`;

export default PreviewTooltips;
