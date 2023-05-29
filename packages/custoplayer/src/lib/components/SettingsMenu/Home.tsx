import { SettingsButtonItem } from '@root/lib/types';
import { MenuItem, MenuIcon } from './styles';
import MenuButton from './MenuButton';
import { myScope, valuesAtom } from '@root/lib/atoms';
import { useAtomValue } from 'jotai';

interface HomeProps {
  item: SettingsButtonItem;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function Home({ item, setCurrentPage }: HomeProps) {
  const videoValues = useAtomValue(valuesAtom, myScope);
  const settingsMenuColor =
    item.settingsMenuColor ?? videoValues?.controlsBar?.barColor;

  return (
    <>
      <MenuItem>
        {item.options?.quality && (
          <MenuButton
            dataCy='settingsMenuQualityButton'
            onClick={() => setCurrentPage('/quality')}
            settingsMenuColor={settingsMenuColor}
          >
            <QualityIcon />
            Quality
          </MenuButton>
        )}
      </MenuItem>
      {item.options?.subtitles && (
        <MenuItem>
          <MenuButton
            dataCy='settingsMenuSubtitlesButton'
            onClick={() => setCurrentPage('/subtitles')}
            settingsMenuColor={settingsMenuColor}
          >
            <SubtitlesIcon />
            Subtitles
          </MenuButton>
        </MenuItem>
      )}
      {item.options?.playbackSpeed && (
        <MenuItem>
          <MenuButton
            dataCy='settingsMenuSpeedButton'
            onClick={() => setCurrentPage('/playback-speed')}
            settingsMenuColor={settingsMenuColor}
          >
            <SpeedIcon />
            Speed
          </MenuButton>
        </MenuItem>
      )}
    </>
  );
}

export default Home;

const QualityIcon = () => {
  return (
    <MenuIcon
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='3' y='3' width='26' height='26' rx='6' />
      <path
        d='M8.5 11V15.5M8.5 20V15.5M8.5 15.5H13.5M13.5 11V20'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M23.5 15.5C23.5 18.0154 21.5324 20 19.1714 20C18.5694 20 18.2619 19.874 18.0967 19.7554C17.9388 19.6421 17.7996 19.4562 17.6935 19.1021C17.5826 18.7317 17.5282 18.244 17.509 17.6107C17.4962 17.185 17.4996 16.7425 17.5033 16.2596C17.5051 16.0175 17.507 15.7653 17.507 15.5C17.507 15.2347 17.5051 14.9825 17.5033 14.7404C17.4996 14.2575 17.4962 13.815 17.509 13.3893C17.5282 12.756 17.5826 12.2683 17.6935 11.8979C17.7996 11.5438 17.9388 11.3579 18.0967 11.2446C18.2619 11.126 18.5694 11 19.1714 11C21.5324 11 23.5 12.9846 23.5 15.5Z'
        stroke='currentColor'
        strokeWidth='2'
      />
    </MenuIcon>
  );
};

const SubtitlesIcon = () => {
  return (
    <MenuIcon
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='3'
        y='3'
        width='26'
        height='26'
        rx='6'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        d='M14 20.8452C10.7273 21.7262 8 18.676 8 16C8 13.324 11.2727 10.2738 14 11.1548'
        stroke='currentCOlor'
        strokeWidth='2.25'
        strokeLinecap='round'
      />
      <path
        d='M23 20.8452C20 20.8452 18 18.676 18 16C18 13.324 19.5 11 23 11.1548'
        stroke='currentColor'
        strokeWidth='2.25'
        strokeLinecap='round'
      />
    </MenuIcon>
  );
};

const SpeedIcon = () => {
  return (
    <MenuIcon
      width='32'
      height='32'
      viewBox='0 0 33 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_143_2)'>
        <path
          d='M26.25 27.25C31.6348 21.8652 31.6348 13.1348 26.25 7.74999C20.8652 2.36522 12.1348 2.36522 6.75 7.74999C1.36523 13.1348 1.36523 21.8652 6.75 27.25'
          stroke='currentColor'
          stroke-width='2.5'
          stroke-linecap='round'
        />
        <path
          d='M6.84175 27.3492L9.72126 25.8602'
          stroke='currentColor'
          stroke-width='2.5'
          stroke-linecap='round'
        />
        <path
          d='M4.38938 13.744L7.53268 14.5368'
          stroke='currentColor'
          stroke-width='2.5'
          stroke-linecap='round'
        />
        <path
          d='M25.6726 14.5795L28.7945 13.7014'
          stroke='currentColor'
          stroke-width='2.5'
          stroke-linecap='round'
        />
        <path
          d='M16.7426 7.50893L16.6949 4.26755'
          stroke='currentColor'
          stroke-width='2.5'
          stroke-linecap='round'
        />
        <path
          d='M26.1818 27.4507L23.3237 25.921'
          stroke='currentColor'
          stroke-width='2.5'
          stroke-linecap='round'
        />
        <circle
          cx='16.5'
          cy='17.5'
          r='2.5'
          fill='currentColor'
          stroke='currentColor'
        />
        <path
          d='M23.6935 17.5L16.75 19.0419V15.9581L23.6935 17.5Z'
          stroke-width='2.5'
          fill='currentColor'
          stroke='currentColor'
        />
      </g>
    </MenuIcon>
  );
};
