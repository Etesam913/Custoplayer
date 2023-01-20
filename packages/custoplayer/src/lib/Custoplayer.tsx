import { Provider } from 'jotai';
import VideoPlayerWrapper from '@/lib/components/VideoPlayerWrapper';
import { myScope, srcAtom } from '@/lib/atoms';

interface CustoplayerProps {
  values: { src: string };
}

function Custoplayer({ values }: CustoplayerProps) {
  return (
    <Provider scope={myScope} initialValues={[[srcAtom, values.src]]}>
      <VideoPlayerWrapper />
    </Provider>
  );
}

export default Custoplayer;
