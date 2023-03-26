import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Custoplayer } from 'custoplayer';

const Header = styled(motion.header)`
  text-align: center;
  padding: 2.5rem;
`;

const Main = styled.main`
  padding: 0.25rem 0 1.5rem 0;
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

const HeroTagline = styled.p`
  font-weight: 600;
  font-size: 1.75em;
  @media screen and (max-width: 768px) {
    font-size: 1.25em;
  }
`;
const HomepageContainer = styled(motion.div)``;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Header>
      <div className='container'>
        <HeroTitle>{siteConfig.title}</HeroTitle>
        <HeroTagline>{siteConfig.tagline}</HeroTagline>
        <button className='link-button'>
          <Link to='/docs/intro'>Learn More</Link>
        </button>
      </div>
    </Header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Custoplayer`}
      description='A React.js npm package that allows for the rapid creation of customizable video players.'
    >
      <HomepageContainer
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          opacity: { duration: 0.7 },
        }}
      >
        <HomepageHeader />
        <Main>
          <VideoContainer>
            <Custoplayer
              src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
              values={{
                previewTooltip: {
                  id: 'text',
                },
                item1: {
                  id: 'playButton1',
                  buttonColor: '#b7cef4',
                },
                item2: {
                  id: 'currentTime',
                  textColor: '#b7cef4',
                },
                item3: {
                  id: 'progressBar1',
                  progressColor: '#a4c3f5',
                },
                item4: {
                  id: 'duration',
                  textColor: '#b7cef4',
                },
                item5: {
                  id: 'fullscreenButton1',
                  buttonColor: '#b7cef4',
                },
              }}
            />
          </VideoContainer>
        </Main>
      </HomepageContainer>
    </Layout>
  );
}
