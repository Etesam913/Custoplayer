import { useState } from 'react';
import { Custoplayer } from 'custoplayer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <p>
        <Custoplayer
          values={{
            src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
          }}
        >
          Click here!
        </Custoplayer>
        <Custoplayer
          values={{
            src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
          }}
        >
          Click here!
        </Custoplayer>
      </p>
    </div>
  );
}

export default App;
