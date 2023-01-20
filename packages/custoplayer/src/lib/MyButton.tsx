import styled from 'styled-components';
import { Provider, atom, useAtom } from 'jotai';
import { useMemo } from 'react';

const countAtom = atom(0);

function MyButton() {
  /* 
    Scope is required to prevent two custoplayer's
    from sharing the same atoms
  */
  const myScope = useMemo(() => {
    return Symbol();
  }, []);
  const [count, setCount] = useAtom(countAtom, myScope);
  return (
    <Provider scope={myScope}>
      <StyledButton onClick={() => setCount((prev) => prev + 1)}>
        {count}
      </StyledButton>
    </Provider>
  );
}
const StyledButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: green;
  color: hsl(0deg, 0%, 98%);
  padding: 0.75rem;
  cursor: pointer;
  &:hover {
    background-color: #0a558c;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #62b0e8;
    background-color: #0a558c;
  }
`;

export default MyButton;
