import { Provider, useAtom } from 'jotai';
import VideoPlayerWrapper from '@/lib/components/VideoPlayerWrapper';
import { itemsAtom, myScope, setItemsAtom, valuesAtom } from '@/lib/atoms';
import { CustoplayerProps } from '@/types';
import { useEffect } from 'react';

function Custoplayer({ values }: CustoplayerProps) {
  const [, setValues] = useAtom(valuesAtom);
  const [, setItems] = useAtom(setItemsAtom);
  useEffect(() => {
    console.log(values);
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

  return (
    <Provider
      scope={myScope}
      initialValues={[
        [valuesAtom, values],
        [
          itemsAtom,
          [
            values.item1,
            values.item2,
            values.item3,
            values.item4,
            values.item5,
            values.item6,
            values.item7,
          ],
        ],
      ]}
    >
      <VideoPlayerWrapper />
    </Provider>
  );
}

export default Custoplayer;
