import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import {
  Custoplayer,
  midnightBlue,
  fieryRed,
  milkyWhite,
  mint,
  grassyGreen,
} from 'custoplayer';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header>
      <div className='container'>
        <h1 className='hero-title'>{siteConfig.title}</h1>
        <h2 className='tagline'>{siteConfig.tagline}</h2>
        <button className='link-button'>
          <Link to='/docs/quick-start'>Learn More</Link>
        </button>
      </div>
    </header>
  );
}

const dropdownToObject = {
  midnightBlue: midnightBlue,
  fieryRed: fieryRed,
  milkyWhite: milkyWhite,
  mint: mint,
  grassyGreen: grassyGreen,
};

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState('midnightBlue');

  return (
    <Layout
      title={`Custoplayer`}
      description='A React.js npm package that allows for the rapid creation of customizable video players.'
    >
      <HomepageHeader />
      <main className='home-main'>
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
      </main>
    </Layout>
  );
}
