import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
    <Header>
      <div className='container'>
        <HeroTitle>{siteConfig.title}</HeroTitle>
        <HeroTagline>{siteConfig.tagline}</HeroTagline>
        <button className='link-button'>
          <Link to='/docs/quick-start'>Learn More</Link>
        </button>
      </div>
    </Header>
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
      <div>
        <HomepageHeader />
        <Main>
          <VideoContainer>
            <Custoplayer
              poster='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/custoplayer-demo-poster.png'
              src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs/compressed-custoplayer-demo.mp4'
              values={dropdownToObject[currentPreset]}
            />
          </VideoContainer>
          <PresetLabel htmlFor='preset-dropdown'>Presets</PresetLabel>
          <PresetDropdown
            id='preset-dropdown'
            value={currentPreset}
            onChange={(e) => setCurrentPreset(e.target.value)}
          >
            <option value='midnightBlue'>🌕 Midnight Blue</option>
            <option value='fieryRed'>🔥 Fiery Red</option>
            <option value='milkyWhite'>🥛 Milky White</option>
            <option value='grassyGreen'>🥗 Grassy Green</option>
            <option value='mint'>🌿 Mint</option>
          </PresetDropdown>
        </Main>
      </div>
    </Layout>
  );
}

const Header = styled(motion.header)`
  text-align: center;
  padding: 2.5rem;
`;

const Main = styled.main`
  padding: 0.25rem 0 1.5rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroTitle = styled(motion.h1)`
  font-weight: bold;
  font-size: 3.25em;

  @media screen and (max-width: 768px) {
    font-size: 2.5em;
  }
`;

const VideoContainer = styled.div`
  width: min(90vw, 50rem);
  margin: 0 auto;
`;

const HeroTagline = styled.h2`
  font-weight: 600;
  font-size: 1.75em;
  margin: 1.5rem 0;
  text-wrap: balance;
  @media screen and (max-width: 768px) {
    font-size: 1.25em;
  }
`;

const PresetLabel = styled.label`
  font-size: 1.5em;
  margin: 1rem 0.75rem 0.75rem;
  font-weight: bold;
`;

const PresetDropdown = styled.select`
  margin: 0.5rem;
  font-size: 1.1em;
  padding: 0.35rem;
  cursor: pointer;
`;
