import { useState } from 'react';
import { MyButton } from 'custoplayer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <p>
        <MyButton>Click here!</MyButton>
        <MyButton>Click here!</MyButton>
      </p>
    </div>
  );
}

export default App;
