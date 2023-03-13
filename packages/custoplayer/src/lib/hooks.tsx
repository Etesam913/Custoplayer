import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  myScope,
  videoDimensionsObserverAtom,
  videoDimensionsAtom,
  videoElemAtom,
} from '@root/lib/atoms';

export function useDimensions() {
  const [videoDimensionsObserver, setVideoDimensionsObserver] = useAtom(
    videoDimensionsObserverAtom,
    myScope,
  );
  const setVideoDimensions = useSetAtom(videoDimensionsAtom, myScope);
  const videoElem = useAtomValue(videoElemAtom, myScope);

  useEffect(() => {
    if (videoElem !== null) {
      setVideoDimensionsObserver(
        new ResizeObserver((entries: ResizeObserverEntry[]) => {
          const video = entries[0];
          if (video && video.contentRect) {
            setVideoDimensions({
              height: parseFloat(video.contentRect.height.toFixed(2)),
              width: parseFloat(video.contentRect.width.toFixed(2)),
            });
          }
        }),
      );
    }
  }, [videoElem, setVideoDimensions, setVideoDimensionsObserver]);

  useEffect(() => {
    if (videoDimensionsObserver !== null && videoElem !== null) {
      videoDimensionsObserver.observe(videoElem);
    }
  }, [videoDimensionsObserver, videoElem]);
}
