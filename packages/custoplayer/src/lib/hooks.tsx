import { useAtom } from 'jotai';
import { useEffect } from 'react';
import {
  myScope,
  setVideoDimensionsAtom,
  videoDimensionsObserverAtom,
  videoElemReadAtom,
} from './atoms';
import { debounce } from './utils';

export function useDimensions() {
  const [videoDimensionsObserver, setVideoDimensionsObserver] = useAtom(
    videoDimensionsObserverAtom,
    myScope,
  );
  const [, setVideoDimensions] = useAtom(setVideoDimensionsAtom, myScope);
  const [videoElem] = useAtom(videoElemReadAtom, myScope);

  useEffect(() => {
    if (videoElem !== null) {
      setVideoDimensionsObserver(
        new ResizeObserver(
          debounce((entries: ResizeObserverEntry[]) => {
            const video = entries[0];
            setVideoDimensions({
              height: parseFloat(video.contentRect.height.toFixed(2)),
              width: parseFloat(video.contentRect.width.toFixed(2)),
            });
          }),
        ),
      );
    }
  }, [videoElem]);

  useEffect(() => {
    if (videoDimensionsObserver !== null && videoElem !== null)
      videoDimensionsObserver.observe(videoElem);
  }, [videoDimensionsObserver]);
}
