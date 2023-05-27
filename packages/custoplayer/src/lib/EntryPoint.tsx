/* 
  EntryPointProps has to have an external path for the 
  types to work externally
*/
import { EntryPointProps } from './types';
import { Provider } from 'jotai';
import { myScope } from './atoms';
import Custoplayer from './Custoplayer';
import { ThemeProvider } from 'styled-components';

function EntryPoint({ values, ...rest }: EntryPointProps) {

  return (
    <Provider scope={myScope}>
      <ThemeProvider theme={{ focusColor: values.focusColor ?? 'white' }}>
        <Custoplayer values={values} rest={rest} />
      </ThemeProvider>
    </Provider>
  );
}

export default EntryPoint;
