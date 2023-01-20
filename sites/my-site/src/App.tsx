import { useState } from 'react';
import { Custoplayer } from 'custoplayer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <p>
        <Custoplayer values={{}}>Click here!</Custoplayer>
        <Custoplayer values={{}}>Click here!</Custoplayer>
      </p>
    </div>
  );
}

export default App;
