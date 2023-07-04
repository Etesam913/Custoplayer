import { useSetAtom } from 'jotai';
import VideoPlayerWrapper from '@root/lib/components/VideoPlayerWrapper';
import {
  itemsAtom,
  myScope,
  valuesAtom,
  videoAttributesAtom,
} from '@root/lib/atoms';
import { CustoplayerValues } from './types';
import { ComponentPropsWithoutRef } from 'react';
import { useListenForChanges } from './hooks';

interface CustoplayerProps {
  values: CustoplayerValues;
  rest: ComponentPropsWithoutRef<'video'>;
}

function Custoplayer({ values, rest }: CustoplayerProps) {
  const setValues = useSetAtom(valuesAtom, myScope);
  const setItems = useSetAtom(itemsAtom, myScope);
  const setVideoAttributes = useSetAtom(videoAttributesAtom, myScope);

  useListenForChanges(setValues, setItems, setVideoAttributes, rest, values);

  return <VideoPlayerWrapper />;
}

export default Custoplayer;
