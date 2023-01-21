import { Provider } from 'jotai';
import VideoPlayerWrapper from '@/lib/components/VideoPlayerWrapper';
import { itemsAtom, myScope, srcAtom } from '@/lib/atoms';
import { CustoplayerProps } from '@/types';

function Custoplayer({ values }: CustoplayerProps) {
  return (
    <Provider
      scope={myScope}
      initialValues={[
        [srcAtom, values.src],
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
