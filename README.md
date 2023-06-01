<h1>Custoplayer</h1>
<p>A React.js npm package that allows for the rapid creation of customizable video players. </p>
<span>
  <img src="https://img.shields.io/badge/license-MIT-green"></img>
  <img src="https://img.shields.io/github/issues/etesam913/Custoplayer"></img>
  <a href="https://codecov.io/gh/Etesam913/Custoplayer">
    <img src="https://codecov.io/gh/Etesam913/Custoplayer/branch/main/graph/badge.svg?token=GOZ1AQ77C2"/>
  </a>
  <img src="https://github.com/Etesam913/Custoplayer/actions/workflows/linting.yml/badge.svg"/>
  <img src="https://github.com/Etesam913/Custoplayer/actions/workflows/tests.yml/badge.svg"/>
  <img src="https://img.shields.io/npm/v/custoplayer"/>
</span>

<h2>Demo Video</h2>

https://github.com/Etesam913/Custoplayer/assets/55665282/fedcb5a5-ec94-4fe0-b554-2bf78cf62c6a

<h2><a href="https://etesam913.github.io/Custoplayer/">Documentation Page</a> </h2>

<h2>Overview</h2>
<h3>Things you can customize:</h3>

<h4>🎥 Types of Video Elements</h4>
<ul>
  <li>It's your choice regarding what you want for your video player. </li>
  <li>The inclusion or absence of a play button, volume button/slider, progress bar, fullscreen button, or a settings button is all up to you.</li>
</ul>

<h4>📍 The Location of Video Elements</h4>
<ul>
  <li>Maybe you want your play button to be on the right edge of the video and the fullscreen button to be on the left edge of the video.</li>
  <li>Alternatively, you may want your progress bar to be to the right of the play button.</li>
  <li>Changing the location of video elements in a custoplayer component is very easy to do through the item prop.</li>
</ul>

<h4>💄 The Appearance of Video Elements</h4>
<ul>
  <li>Changing the appearance of video elements is important when trying to create or match a brand identity.</li>
  <li>The colors of a play buttons, progress bar, volume bar, fullscreen button, settings button, and more can be customized. </li>
  <li>In addition, there are different variants of a component. </li>
</ul>

<img src="https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2FWritten-By-Human-Not-By-AI-Badge-white.svg"/>

<h2>📦 Installation</h2>
<h3>npm</h3>

```
npm install custoplayer
```

<h3>yarn</h3>

```
yarn add custoplayer
```

<h2>💻 Example Usage</h2>

```jsx
<Custoplayer
  src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/brownlee.mp4'
  playsInline={true}
  preload='metadata'
  values={{
    item1: {
      id: 'playButton1',
    },
    item2: {
      id: 'volumeButton1',
      barId: 'volumeBar1',
      buttonColor: 'rgb(137, 178, 245)',
      volumeColor: 'rgb(137, 178, 245)',
    },
    item3: {
      id: 'currentTime',
    },
    item4: {
      id: 'progressBar1',
    },
    item5: {
      id: 'duration',
      hideOnMobile: true,
    },
    item6: {
      id: 'fullscreenButton2',
      buttonColor: 'rgb(137, 178, 245)',
    },
  }}
/>
```

<h2> See More at the <a href="https://etesam913.github.io/Custoplayer/">Documentation Page</a> </h2>
