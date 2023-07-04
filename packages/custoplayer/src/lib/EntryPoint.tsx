/* 
  EntryPointProps has to have an external path for the 
  types to work externally
*/
import { EntryPointProps } from './types';
import { Provider } from 'jotai';
import { myScope } from './atoms';
import Custoplayer from './Custoplayer';
import { ThemeProvider } from 'styled-components';
import { MotionConfig } from 'framer-motion';
import isValidProp from '@emotion/is-prop-valid';

function EntryPoint({ values, ...rest }: EntryPointProps) {
  return (
    <Provider scope={myScope}>
      {values ? (
        <MotionConfig isValidProp={isValidProp}>
          <ThemeProvider theme={{ focusColor: values?.focusColor }}>
            <Custoplayer values={values} rest={rest} />
          </ThemeProvider>
        </MotionConfig>
      ) : (
        <>
          <div data-cy='errorMessage' style={{ color: 'red' }}>
            You need to define the values attribute on your custoplayer tag. For
            the time being you can set it to be an empty object. <br />
            example:
          </div>
          <code>&lt;Custoplayer values=&#123;&#123;&#125;&#125; /&gt;</code>
        </>
      )}
    </Provider>
  );
}

export default EntryPoint;
