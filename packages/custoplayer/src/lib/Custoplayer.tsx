import { useSetAtom } from 'jotai';
import VideoPlayerWrapper from '@root/lib/components/VideoPlayerWrapper';
import {
  itemsAtom,
  myScope,
  valuesAtom,
  videoAttributesAtom,
  videoRefAtom,
} from '@root/lib/atoms';
import { CustoplayerValues } from './types';
import { ComponentPropsWithoutRef, Ref, forwardRef } from 'react';
import { useListenForChanges } from './hooks';

interface CustoplayerProps {
  values: CustoplayerValues;
  rest: ComponentPropsWithoutRef<'video'>;
}

function Custoplayer(
  { values, rest }: CustoplayerProps,
  ref: Ref<HTMLVideoElement>,
) {
  const setValues = useSetAtom(valuesAtom, myScope);
  const setItems = useSetAtom(itemsAtom, myScope);
  const setVideoAttributes = useSetAtom(videoAttributesAtom, myScope);
  const setVideoRef = useSetAtom(videoRefAtom, myScope);

  useListenForChanges(
    setValues,
    setItems,
    setVideoAttributes,
    rest,
    values,
    setVideoRef,
    ref,
  );

  return <VideoPlayerWrapper />;
}

export default forwardRef(Custoplayer);
