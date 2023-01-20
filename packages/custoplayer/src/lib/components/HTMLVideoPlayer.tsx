import { useAtom } from 'jotai';
import styled from 'styled-components';
import { myScope, srcAtom, videoRefAtom, videoRefWriteAtom } from '@/lib/atoms';

function HTMLVideoPlayer() {
  const [video, setVideo] = useAtom(videoRefAtom, myScope);
  const [src, setSrc] = useAtom(srcAtom, myScope);

  return (
    <HTMLPlayer
      src={src}
      playsInline
      autoPlay
      onLoadedData={(e) => setVideo(e.target as HTMLVideoElement)}
      onLoadStart={(e) => {
        setVideo(e.target as HTMLVideoElement);
        setSrc((e.target as HTMLVideoElement).src);
      }}
      preload='metadata'
      tabIndex={-1}
    />
  );
}

const HTMLPlayer = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export default HTMLVideoPlayer;
