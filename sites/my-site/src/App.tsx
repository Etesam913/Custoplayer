import { useState } from 'react';
import { MyButton } from 'my-lib';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <p>
        <MyButton onClick={() => setCount((count) => count + 1)}>Click here!</MyButton>
      </p>
    </div>
  );
}

export default App;
