import React from 'react';
import './App.css';
import { Custoplayer } from 'custoplayer';

function App() {
  return (
    <div className='App'>
      <h2 data-cy='website-header'>Custoplayer Tests</h2>
      <div className='custoplayer-container'>
        <Custoplayer
          playsInline={true}
          src='https://etesam.nyc3.cdn.digitaloceanspaces.com/Custoplayer/placeholder-video-720'
          values={{
            item1: {
              id: 'playButton1',
            },
            item2: {
              id: 'volumeButton1',
              barId: 'volumeBar1',
            },
            item3: {
              id: 'progressBar1',
            },
            item4: {
              id: 'fullscreenButton2',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
