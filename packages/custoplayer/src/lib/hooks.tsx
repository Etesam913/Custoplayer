import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  myScope,
  setVideoDimensionsAtom,
  videoDimensionsObserverAtom,
  getVideoElemAtom,
} from './atoms';
import { throttle } from './utils';

export function useDimensions() {
  const [videoDimensionsObserver, setVideoDimensionsObserver] = useAtom(
    videoDimensionsObserverAtom,
    myScope,
  );
  const [, setVideoDimensions] = useAtom(setVideoDimensionsAtom, myScope);
  const [videoElem] = useAtom(getVideoElemAtom, myScope);

  useEffect(() => {
    if (videoElem !== null) {
      setVideoDimensionsObserver(
        new ResizeObserver(
          throttle((entries: ResizeObserverEntry[]) => {
            const video = entries[0];
            setVideoDimensions({
              height: parseFloat(video.contentRect.height.toFixed(2)),
              width: parseFloat(video.contentRect.width.toFixed(2)),
            });
          }, 10),
        ),
      );
    }
  }, [videoElem]);

  useEffect(() => {
    if (videoDimensionsObserver !== null && videoElem !== null)
      videoDimensionsObserver.observe(videoElem);
  }, [videoDimensionsObserver]);
}
