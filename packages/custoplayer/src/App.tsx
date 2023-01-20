import styled from 'styled-components';
import Custoplayer from './lib/Custoplayer';

function App() {
  return (
    <Wrapper>
      <Custoplayer values={{}}></Custoplayer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
`;

export default App;
