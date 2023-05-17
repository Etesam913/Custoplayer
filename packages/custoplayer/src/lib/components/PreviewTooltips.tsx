import { PreviewTooltipItem } from '@root/lib/types';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import {
  durationAtom,
  myScope,
  previewTooltipHoveredTimeAtom,
  previewTooltipPositionAtom,
  previewTooltipStrAtom,
  previewTooltipThumbnailsAtom,
  valuesAtom,
} from '../atoms';
import { getHoveredThumbnail } from '../utils';
import { useEffect, useState } from 'react';

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
  const previewTooltipHoveredTime = useAtomValue(
    previewTooltipHoveredTimeAtom,
    myScope,
  );
  const previewTooltipStr = useAtomValue(previewTooltipStrAtom, myScope);
  const videoValues = useAtomValue(valuesAtom, myScope);

  const videoDuration = useAtomValue(durationAtom, myScope);

  const previewTooltipThumbnails = useAtomValue(
    previewTooltipThumbnailsAtom,
    myScope,
  );
  const [previewTooltipThumbnailData, setPreviewTooltipThumbnailData] =
    useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    if (data.id !== 'text') {
      const foundThumbnail = getHoveredThumbnail(
        previewTooltipHoveredTime,
        previewTooltipThumbnails,
      );

      if (foundThumbnail) {
        // Add error handling here
        const text = foundThumbnail.text;
        const [x, y, w, h] = text.split('=')[1].split(',');
        setPreviewTooltipThumbnailData({
          x: parseInt(x),
          y: parseInt(y),
          w: parseInt(w),
          h: parseInt(h),
        });
      }
    }
  }, [previewTooltipHoveredTime]);

  return (
    <>
      {data.id === 'text' && (
        <TextTooltip
          backgroundColor={videoValues.controlsBar?.barColor}
          data-cy='textPreviewTooltip'
          isVisible={(isHovered || isProgressDragging) && videoDuration > 0}
          style={{
            transform: `translate(${previewTooltipPosition}px, -60px)`,
          }}
        >
          {previewTooltipStr}
        </TextTooltip>
      )}
      {data.id === 'thumbnail' && (
        <ImageThumbnailContainer
          backgroundColor={videoValues.controlsBar?.barColor}
          isVisible={(isHovered || isProgressDragging) && videoDuration > 0}
          style={{
            transform: `translate(${previewTooltipPosition}px, -120px)`,
          }}
        >
          <ImageThumbnail
            backgroundPositionX={-1 * previewTooltipThumbnailData.x}
            backgroundPositionY={-1 * previewTooltipThumbnailData.y}
            height={previewTooltipThumbnailData.h}
            width={previewTooltipThumbnailData.w}
            backgroundImage={data.atlasImage ?? ''}
          />
        </ImageThumbnailContainer>
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

const ImageThumbnailContainer = styled(TextTooltip)<{
  isVisible: boolean;
  backgroundColor: string | undefined;
}>`
  padding: 0.5rem;
  box-sizing: border-box;
`;

const ImageThumbnail = styled.div<{
  backgroundPositionX: number;
  backgroundPositionY: number;
  backgroundImage: string;
  height: number;
  width: number;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-position: ${(props) => props.backgroundPositionX}px
    ${(props) => props.backgroundPositionY}px;
  background-image: url(${(props) => props.backgroundImage});
`;

export default PreviewTooltips;
