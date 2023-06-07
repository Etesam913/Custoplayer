import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Vtt from 'vtt-creator';
import { saveAs } from 'file-saver';

const thumbnailWidth = 125;
let thumbnailHeight = 0;
const thumbnailsPerRow = 10;
const thumbnailCount = 65;

export default function ThumbnailGenerator() {
  const [videoFileUrl, setVideoFileUrl] = useState<string | null>(null);
  const [vttConstructor, setVttConstructor] = useState<Vtt | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canvasElem, setCanvasElem] = useState<HTMLCanvasElement | null>(null);
  const [timeBetweenFrames, setTimeBetweenFrames] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completionData, setCompletionData] = useState({
    isCompleted: false,
    imageAtlas: '',
    imageVTT: new Blob(),
  });
  const [currentError, setCurrentError] = useState('');
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const [thumbnailImageUrls, setThumbnailImageUrls] = useState<string[]>([]);

  function handleThumbnailGeneration() {
    setCurrentError('');

    const v = new Vtt();
    setVttConstructor(v);

    if (videoRef && videoRef.current) {
      setIsLoading(true);
      videoRef.current.currentTime = 0;
      setThumbnailImageUrls([]);
      setCurrentThumbnailIndex(0);
      setCompletionData({
        isCompleted: false,
        imageAtlas: '',
        imageVTT: new Blob(),
      });
      const canvas = document.createElement('canvas');

      const videoHeight = videoRef.current.clientHeight;
      thumbnailHeight = Math.floor(
        (thumbnailWidth / videoRef.current.clientWidth) * videoHeight,
      );

      canvas.width = thumbnailWidth * thumbnailsPerRow;

      canvas.height =
        Math.ceil(thumbnailCount / thumbnailsPerRow) * thumbnailHeight;

      const calculatedTimeBetweenFrames =
        videoRef.current.duration / thumbnailCount;
      setTimeBetweenFrames(calculatedTimeBetweenFrames);
      videoRef.current.currentTime = calculatedTimeBetweenFrames;

      setCanvasElem(canvas);
    } else {
      setCurrentError('Video not found');
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoFileUrl(URL.createObjectURL(files[0]));
      setCompletionData({
        isCompleted: false,
        imageAtlas: '',
        imageVTT: new Blob(),
      });
    }
  }

  function handleVideoSeek() {
    if (!canvasElem || !videoRef || !videoRef.current) {
      setIsLoading(false);
      setCurrentError('Something went wrong');
      return;
    }
    // You have reached the end
    if (currentThumbnailIndex > thumbnailCount) {
      const dataUrl = canvasElem.toDataURL('image/jpeg', 0.8);
      setThumbnailImageUrls((prev) => [...prev, dataUrl]);
      // saveAs(dataUrl, 'thumbs.jpg');

      const thumbsBlob = new Blob([vttConstructor.toString()], {
        type: 'text/plain;charset=utf-8',
      });
      // saveAs(thumbsBlob, 'thumbs.vtt');
      setCompletionData({
        isCompleted: true,
        imageAtlas: dataUrl,
        imageVTT: thumbsBlob,
      });
      setIsLoading(false);
      return;
    }

    const prevTime = videoRef.current.currentTime - timeBetweenFrames;

    const ctx = canvasElem.getContext('2d');
    const rowIndex = Math.floor(currentThumbnailIndex / 10);
    const columnIndex = currentThumbnailIndex % 10;
    ctx?.drawImage(
      videoRef.current,
      columnIndex * thumbnailWidth,
      rowIndex * thumbnailHeight,
      thumbnailWidth,
      thumbnailHeight,
    );
    vttConstructor?.add(
      prevTime,
      videoRef.current.currentTime,
      `thumbs.jpg#xywh=${columnIndex * thumbnailWidth},${
        rowIndex * thumbnailHeight
      },${thumbnailWidth},${thumbnailHeight}`,
    );

    setCurrentThumbnailIndex((prev) => prev + 1);
    videoRef.current.currentTime += timeBetweenFrames;
  }

  return (
    <>
      <input accept='video/*' type='file' onChange={onFileChange} />
      {videoFileUrl !== null && (
        <CenteredContainer>
          <DisplayVideo
            ref={videoRef}
            onSeeked={handleVideoSeek}
            src={videoFileUrl}
          />
          {currentError.length > 0 && <p>{currentError}</p>}
          {completionData.isCompleted && (
            <div>
              <StyledButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => saveAs(completionData.imageVTT, 'thumbs.vtt')}
              >
                Download Thumbnail VTT
              </StyledButton>
              <StyledButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => saveAs(completionData.imageAtlas, 'thumbs.jpg')}
              >
                Download Thumbnail Atlas
              </StyledButton>
            </div>
          )}
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <StyledButton
              onClick={handleThumbnailGeneration}
              type='button'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Thumbnails
            </StyledButton>
          )}
        </CenteredContainer>
      )}
    </>
  );
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DisplayVideo = styled.video`
  width: 100%;
  height: auto;
  margin: 1rem;
`;

const StyledButton = styled(motion.button)`
  margin: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.35rem;
  font-family: inherit;
  font-size: 0.95em;
  cursor: pointer;
  background-color: var(--ifm-color-emphasis-200);
  border: 0;
`;
