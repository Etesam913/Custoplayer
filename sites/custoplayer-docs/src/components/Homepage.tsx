import React, { useState } from 'react';

import {
  Custoplayer,
  midnightBlue,
  fieryRed,
  milkyWhite,
  mint,
  grassyGreen,
} from 'custoplayer';

const dropdownToObject = {
  midnightBlue: midnightBlue,
  fieryRed: fieryRed,
  milkyWhite: milkyWhite,
  mint: mint,
  grassyGreen: grassyGreen,
};

export default function Homepage() {
  const [currentPreset, setCurrentPreset] = useState('midnightBlue');
  return (
    <div className='homepage-container'>
      <div className='video-container'>
        <Custoplayer
          poster='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/custoplayer-demo-poster.png'
          src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/setting-up-video-qualities/custoplayer-demo-1080.mp4'
          values={dropdownToObject[currentPreset]}
        />
      </div>
      <label htmlFor='preset-dropdown'>Presets</label>
      <select
        id='preset-dropdown'
        value={currentPreset}
        onChange={(e) => setCurrentPreset(e.target.value)}
      >
        <option value='midnightBlue'>🌕 Midnight Blue</option>
        <option value='fieryRed'>🔥 Fiery Red</option>
        <option value='milkyWhite'>🥛 Milky White</option>
        <option value='grassyGreen'>🥗 Grassy Green</option>
        <option value='mint'>🌿 Mint</option>
      </select>
    </div>
  );
}
