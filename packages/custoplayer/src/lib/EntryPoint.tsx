import { CustoplayerProps } from '@root/lib/types';
import { Provider } from 'jotai';
import { myScope } from '@root/lib/atoms';
import Custoplayer from './Custoplayer';

function EntryPoint({ values }: CustoplayerProps) {
  return (
    <Provider scope={myScope}>
      <Custoplayer values={values} />
    </Provider>
  );
}

export default EntryPoint;
