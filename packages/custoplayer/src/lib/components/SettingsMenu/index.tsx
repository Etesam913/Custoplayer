import { SettingsButtonItem } from '@root/lib/types';
import {
  MenuHeader,
  MenuHeaderButton,
  MenuHeaderIcon,
  MenuHeaderRow,
} from './styles';
import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Home from './Home';
import Quality from './Quality';

type Ref = HTMLMenuElement;

interface SettingsMenuProps {
  item: SettingsButtonItem;
  setIsSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenu = forwardRef<Ref, SettingsMenuProps>((props, ref) => {
  const [currentPage, setCurrentPage] = useState('/home');

  function getMenuTitle() {
    if (currentPage === '/home') return 'Settings';
    else if (currentPage === '/quality') return 'Quality';
    else if (currentPage === '/subtitles') return 'Subtitles';
  }

  return (
    <SettingsMenuContainer
      orientation={props.item.settingsMenuOrientation}
      ref={ref}
      settingsMenuColor={props.item.settingsMenuColor}
    >
      <MenuHeaderRow>
        <MenuHeaderButton
          settingsMenuColor={props.item.settingsMenuColor}
          onClick={() => props.setIsSettingsMenuOpen(false)}
        >
          <MenuHeaderIcon
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 6L26 26'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
            />
            <path
              d='M6 26L26 6'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
            />
          </MenuHeaderIcon>
        </MenuHeaderButton>

        <MenuHeader>{getMenuTitle()}</MenuHeader>
      </MenuHeaderRow>
      {currentPage === '/home' && (
        <Home setCurrentPage={setCurrentPage} item={props.item} />
      )}
      {currentPage === '/quality' && <Quality item={props.item} />}
    </SettingsMenuContainer>
  );
});

const SettingsMenuContainer = styled.menu<{
  settingsMenuColor: string | undefined;
  orientation: 'left' | 'middle' | 'right' | undefined;
}>`
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.settingsMenuColor ? props.settingsMenuColor : 'currentColor'};
  position: absolute;
  margin: 0;
  padding: 0.35rem;
  width: 7rem;
  transform: translate(
    ${(props) =>
      props.orientation === 'left'
        ? '3rem'
        : props.orientation === 'middle'
        ? '0rem'
        : '-3rem'},
    -6rem
  );
`;

export default SettingsMenu;
