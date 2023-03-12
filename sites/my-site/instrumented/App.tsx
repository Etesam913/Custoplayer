import { Custoplayer } from 'custoplayer';
import './App.css';
import React from 'react';
import Test from './Test';

function App() {
  return (
    <div className='App'>
      <h2 data-cy='website-header'>Custoplayer Tests</h2>
      <div className='custoplayer-container'>
        <Custoplayer
          values={{
            src: 'https://etesam.nyc3.cdn.digitaloceanspaces.com/Custoplayer/placeholder-video-720',
            playIndicator: {
              id: 1,
            },
            item1: {
              id: 'playButton1',
              color: 'rgb(81, 180, 122)',
            },
            item2: {
              id: 'volumeButton1',
            },
            item3: {
              id: 'progressBar1',
            },
          }}
        />
        <Test />
      </div>
    </div>
  );
}

export default App;
