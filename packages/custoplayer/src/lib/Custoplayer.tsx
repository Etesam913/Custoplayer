import { Provider, atom, useAtom } from 'jotai';
import CustomButton from '@/lib/CustomButton';

export const countAtom = atom(0);
/* 
  Scope is required to prevent two custoplayer's
  from sharing the same atoms
*/
export const myScope = Symbol();

interface CustoplayerProps {
  values: {};
}

function Custoplayer({ values }: CustoplayerProps) {
  return (
    <Provider scope={myScope}>
      <CustomButton />
    </Provider>
  );
}

export default Custoplayer;
