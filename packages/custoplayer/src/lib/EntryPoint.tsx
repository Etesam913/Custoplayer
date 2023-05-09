/* 
  EntryPointProps has to have an external path for the 
  types to work externally
*/
import { EntryPointProps } from './types';
import { Provider } from 'jotai';
import { myScope } from '@root/lib/atoms';
import Custoplayer from './Custoplayer';

function EntryPoint({ values, ...rest }: EntryPointProps) {

  return (
    <Provider scope={myScope}>
      <Custoplayer values={values} rest={rest} />
    </Provider>
  );
}

export default EntryPoint;
