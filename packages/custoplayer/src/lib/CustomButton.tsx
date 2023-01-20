import styled from 'styled-components';
import { useAtom } from 'jotai';
import { countAtom, myScope } from './Custoplayer';

function CustomButton() {
  const [count, setCount] = useAtom(countAtom, myScope);
  return (
    <StyledButton onClick={() => setCount((prev) => prev + 1)}>
      {count}
    </StyledButton>
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

export default CustomButton;
