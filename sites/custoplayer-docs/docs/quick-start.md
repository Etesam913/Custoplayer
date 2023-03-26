# Quick Start

Custoplayer is a React.js npm package that allows for the quick creation of beautiful video players.

## 📦 Installation

### npm

```bash
npm install custoplayer
```

### yarn

```bash
yarn add custoplayer
```

## Usage

```jsx
import Custoplayer from 'custoplayer';

function App() {
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
  />;
}
```
