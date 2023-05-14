import { SettingsButtonItem } from '@root/lib/types';
import { MenuHeader, MenuHeaderButton, MenuHeaderIcon } from './styles';
import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Home from './Home';
import Quality from './Quality';
import { useAtomValue } from 'jotai';
import { myScope, videoDimensionsAtom } from '@root/lib/atoms';
import { motion } from 'framer-motion';

type Ref = HTMLMenuElement;

interface SettingsMenuProps {
  item: SettingsButtonItem;
  setIsSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloseMenuIcon = () => {
  return (
    <MenuHeaderIcon
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 6L26 26'
        stroke='currentColor'
        strokeWidth='3.5'
        strokeLinecap='round'
      />
      <path
        d='M6 26L26 6'
        stroke='currentColor'
        strokeWidth='3.5'
        strokeLinecap='round'
      />
    </MenuHeaderIcon>
  );
};

const GoLeftIcon = () => {
  return (
    <MenuHeaderIcon
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M28 17.5C28.8284 17.5 29.5 16.8284 29.5 16C29.5 15.1716 28.8284 14.5 28 14.5V17.5ZM2.93934 14.9393C2.35355 15.5251 2.35355 16.4749 2.93934 17.0607L12.4853 26.6066C13.0711 27.1924 14.0208 27.1924 14.6066 26.6066C15.1924 26.0208 15.1924 25.0711 14.6066 24.4853L6.12132 16L14.6066 7.51472C15.1924 6.92893 15.1924 5.97918 14.6066 5.3934C14.0208 4.80761 13.0711 4.80761 12.4853 5.3934L2.93934 14.9393ZM28 14.5L4 14.5V17.5L28 17.5V14.5Z'
        fill='currentColor'
      />
    </MenuHeaderIcon>
  );
};

const SettingsMenu = forwardRef<Ref, SettingsMenuProps>((props, ref) => {
  const [currentPage, setCurrentPage] = useState('/home');
  const videoDimensions = useAtomValue(videoDimensionsAtom, myScope);

  function getMenuTitle() {
    if (currentPage === '/home') return 'Settings';
    else if (currentPage === '/quality') return 'Quality';
    else if (currentPage === '/subtitles') return 'Subtitles';
  }

  return (
    <TranslateContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      orientation={props.item.settingsMenuOrientation ?? 'middle'}
    >
      <SettingsMenuContainer
        layout
        ref={ref}
        settingsMenuColor={props.item.settingsMenuColor}
      >
        <MenuHeaderRow layout>
          <MenuHeaderButton
            settingsMenuColor={props.item.settingsMenuColor}
            onClick={() =>
              currentPage === '/home'
                ? props.setIsSettingsMenuOpen(false)
                : setCurrentPage('/home')
            }
          >
            {currentPage === '/home' ? <CloseMenuIcon /> : <GoLeftIcon />}
          </MenuHeaderButton>

          <MenuHeader layout>{getMenuTitle()}</MenuHeader>
        </MenuHeaderRow>
        <MenuContent settingsMenuHeight={videoDimensions.height - 45 - 60}>
          {currentPage === '/home' && (
            <Home setCurrentPage={setCurrentPage} item={props.item} />
          )}
          {currentPage === '/quality' && <Quality item={props.item} />}
        </MenuContent>
      </SettingsMenuContainer>
    </TranslateContainer>
  );
});

/* 
  A separate container has to keep the translate value to
  avoid interference with the child layout animation
*/
const TranslateContainer = styled(motion.div)<{
  orientation: 'middle' | 'left' | 'right';
}>`
  transform: translate(
    ${(props) =>
      props.orientation === 'middle'
        ? '-3rem'
        : props.orientation === 'left'
        ? '-5.25rem'
        : '0rem'},
    -2rem
  );
  display: flex;
  flex-direction: column-reverse;
`;

const SettingsMenuContainer = styled(motion.menu)<{
  settingsMenuColor: string | undefined;
}>`
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.settingsMenuColor ? props.settingsMenuColor : 'currentColor'};
  position: absolute;
  margin: 0;
  padding: 0.35rem 0.45rem;
  overflow: hidden;
  min-width: 6.5rem;
  box-shadow: 10px 10px 55px -8px rgba(0, 0, 0, 0.56);
`;

const MenuHeaderRow = styled(motion.section)`
  display: flex;
  align-items: center;
  margin: 0.25rem 0 0.5rem;
`;

const MenuContent = styled.section<{ settingsMenuHeight: number }>`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: ${(props) => props.settingsMenuHeight}px;
`;

export default SettingsMenu;
