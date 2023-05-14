import { SettingsButtonItem } from '@root/lib/types';
import { darkenColor, lightenColor } from '@root/lib/utils';
import { forwardRef } from 'react';
import styled from 'styled-components';

type Ref = HTMLMenuElement;

interface SettingsMenuProps {
  item: SettingsButtonItem;
  setIsSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenu = forwardRef<Ref, SettingsMenuProps>((props, ref) => {
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

        <MenuHeader>Settings</MenuHeader>
      </MenuHeaderRow>
      <MenuItem>
        <MenuButton settingsMenuColor={props.item.settingsMenuColor}>
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
          Quality
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton settingsMenuColor={props.item.settingsMenuColor}>
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
          Subtitles
        </MenuButton>
      </MenuItem>
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

const MenuHeader = styled.h3`
  color: white;
  margin: 0;
  font-weight: normal;
`;

const MenuItem = styled.li`
  list-style-type: none;
  margin: 0;
  &:last-child {
    margin-bottom: 0.25rem;
  }
`;

const MenuIcon = styled.svg`
  height: 20px;
  width: 20px;
  stroke: currentColor;
  stroke-width: 2px;
  margin-right: 0.35rem;
`;

const MenuHeaderIcon = styled(MenuIcon)`
  margin-right: 0;
  height: 18px;
  width: 18px;
`;

const MenuButton = styled.button<{ settingsMenuColor: string | undefined }>`
  background-color: transparent;
  border: 0;
  color: white;
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 1em;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) =>
      props.settingsMenuColor
        ? '' + lightenColor(props.settingsMenuColor)
        : 'currentColor'};
  }
  &:active {
    background-color: ${(props) =>
      props.settingsMenuColor
        ? '' + darkenColor(props.settingsMenuColor)
        : 'currentColor'};
  }
`;

const MenuHeaderButton = styled(MenuButton)`
  padding: 0.25rem;
  width: auto;
  margin-right: 0.35rem;
`;

const MenuHeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0.25rem 0 0.5rem;
`;

export default SettingsMenu;
