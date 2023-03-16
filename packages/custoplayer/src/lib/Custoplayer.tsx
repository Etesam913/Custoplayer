import { Provider, useSetAtom } from 'jotai';
import VideoPlayerWrapper from '@root/lib/components/VideoPlayerWrapper';
import { itemsAtom, myScope, valuesAtom } from '@root/lib/atoms';
import { CustoplayerProps } from '@root/types';
import { useEffect } from 'react';

function Custoplayer({ values }: CustoplayerProps) {
  const setValues = useSetAtom(valuesAtom, myScope);
  const setItems = useSetAtom(itemsAtom, myScope);

  /* TODO: These values to not update because they are in the file that is being exported */
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <div id='mobile-debug' style={{ marginBottom: '1rem' }}>
          mobile debug
        </div> */}
        <VideoPlayerWrapper />
      </div>
    </Provider>
  );
}

export default Custoplayer;
