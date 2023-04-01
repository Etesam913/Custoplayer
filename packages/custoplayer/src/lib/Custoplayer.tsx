import { useSetAtom } from 'jotai';
import VideoPlayerWrapper from '@root/lib/components/VideoPlayerWrapper';
import {
  itemsAtom,
  myScope,
  valuesAtom,
  videoAttributesAtom,
} from '@root/lib/atoms';
import { CustoplayerValues } from './types';
import { ComponentPropsWithoutRef, useEffect } from 'react';

interface CustoplayerProps {
  values: CustoplayerValues;
  rest: ComponentPropsWithoutRef<'video'>;
}

function Custoplayer({ values, rest }: CustoplayerProps) {
  const setValues = useSetAtom(valuesAtom, myScope);
  const setItems = useSetAtom(itemsAtom, myScope);
  const setVideoAttributes = useSetAtom(videoAttributesAtom, myScope);

  /* TODO: These values to not update because they are in the file that is being exported */
  useEffect(() => {
    setValues(values);
    setItems([
      values.item1,
      values.item2,
      values.item3,
      values.item4,
      values.item5,
      values.item6,
      values.item7,
    ]);
  }, [values]);

  useEffect(() => {
    setVideoAttributes(rest);
  }, [rest]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* <div id='mobile-debug' style={{ marginBottom: '1rem' }}>
          mobile debug
        </div> */}
      <VideoPlayerWrapper />
    </div>
  );
}

export default Custoplayer;
