import { SettingsButtonItem } from '@root/lib/types';
import { MenuHeader, MenuHeaderButton, MenuHeaderIcon } from './styles';
import { forwardRef, useState, useEffect, MutableRefObject } from 'react';
import styled from 'styled-components';
import Home from './Home';
import Quality from './Quality';
import { useAtomValue } from 'jotai';
import { myScope, videoDimensionsAtom, valuesAtom } from '@root/lib/atoms';
import { motion } from 'framer-motion';
import Subtitles from './Subtitles';
import PlaybackSpeed from './PlaybackSpeed';
import { getReadableTextColor } from '@root/lib/utils';

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
  const videoValues = useAtomValue(valuesAtom, myScope);
  useEffect(() => {
    if (ref) {
      const buttonList = (ref as MutableRefObject<Ref>).current.lastChild;
      let firstListItemWithButton = buttonList?.firstChild;
      /* 
        Gets the first List item with children
        There is a framer-motion bug that creates a first
        list item with no children
      */
      while (firstListItemWithButton !== null) {
        if (
          firstListItemWithButton?.nodeType === Node.ELEMENT_NODE &&
          firstListItemWithButton.hasChildNodes()
        )
          break;
        else {
          firstListItemWithButton = firstListItemWithButton?.nextSibling;
          if (!firstListItemWithButton) break;
        }
      }
      // Auto-focuses on the first button
      const firstButton = firstListItemWithButton?.firstChild;
      if (firstButton) (firstButton as HTMLButtonElement).focus();
    }
  }, [ref, currentPage]);

  function getMenuTitle() {
    if (currentPage === '/home') return 'Settings';
    else if (currentPage === '/quality') return 'Quality';
    else if (currentPage === '/subtitles') return 'Subtitles';
    else if (currentPage === '/playback-speed') return 'Speed';
  }
  const settingsMenuColor =
    props.item.settingsMenuColor ?? videoValues?.controlsBar?.barColor;

  return (
    <TranslateContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      $orientation={props.item.settingsMenuOrientation ?? 'middle'}
    >
      <SettingsMenuContainer
        layout
        ref={ref}
        data-cy='settingsMenu'
        $settingsMenuColor={settingsMenuColor}
        $textColor={getReadableTextColor(settingsMenuColor ?? '')}
      >
        <MenuHeaderRow layout>
          <MenuHeaderButton
            data-cy='settingsMenuHeaderButton'
            $settingsMenuColor={settingsMenuColor}
            onClick={() =>
              currentPage === '/home'
                ? props.setIsSettingsMenuOpen(false)
                : setCurrentPage('/home')
            }
          >
            {currentPage === '/home' ? <CloseMenuIcon /> : <GoLeftIcon />}
          </MenuHeaderButton>

          <MenuHeader layout='position'>{getMenuTitle()}</MenuHeader>
        </MenuHeaderRow>
        <MenuContent
          $settingsMenuHeight={videoDimensions.height - 45 - 60}
          onKeyDown={(e) =>
            e.key === 'Escape' && props.setIsSettingsMenuOpen(false)
          }
        >
          {currentPage === '/home' && (
            <Home setCurrentPage={setCurrentPage} item={props.item} />
          )}
          {currentPage === '/quality' && <Quality item={props.item} />}

          {currentPage === '/subtitles' && <Subtitles item={props.item} />}
          {currentPage === '/playback-speed' && (
            <PlaybackSpeed item={props.item} />
          )}
        </MenuContent>
      </SettingsMenuContainer>
    </TranslateContainer>
  );
});

SettingsMenu.displayName = 'SettingsMenu';

/*
  A separate container has to keep the translate value to
  avoid interference with the child layout animation
*/
const TranslateContainer = styled(motion.div)<{
  $orientation: 'middle' | 'left' | 'right';
}>`
  transform: translate(
    ${(props) =>
      props.$orientation === 'middle'
        ? '-3rem'
        : props.$orientation === 'left'
        ? '-5.25rem'
        : '0rem'},
    -2rem
  );
  display: flex;
  flex-direction: column-reverse;
`;

const SettingsMenuContainer = styled(motion.menu)<{
  $settingsMenuColor: string | undefined;
  $textColor: string;
}>`
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.$settingsMenuColor ? props.$settingsMenuColor : 'currentColor'};
  position: absolute;
  margin: 0;
  padding: 0.35rem 0.45rem;
  overflow: hidden;
  min-width: 6.5rem;
  box-shadow: 10px 10px 55px -8px rgba(0, 0, 0, 0.56);
  color: ${(props) => props.$textColor};
`;

const MenuHeaderRow = styled(motion.section)`
  display: flex;
  align-items: center;
  margin: 0.25rem 0 0.5rem;
  color: inherit;
`;

const MenuContent = styled.ul<{ $settingsMenuHeight: number }>`
  max-height: ${(props) => props.$settingsMenuHeight}px;
  color: inherit;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
`;

export default SettingsMenu;
