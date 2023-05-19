import { darkenColor, lightenColor } from '@root/lib/utils';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledMenuButton = styled(motion.button)<{
  settingsMenuColor: string | undefined;
}>`
  background-color: transparent;
  border: 0;
  color: white;
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 1em;
  padding: 0.6rem 0.4rem;
  cursor: pointer;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;

  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 2.5px dashed ${(props) => props.theme.focusColor};
  }

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

export const MenuItem = styled(motion.li)`
  list-style-type: none;
  margin: 0;
`;

export const MenuIcon = styled(motion.svg)<{ margin?: string }>`
  height: 20px;
  width: 20px;
  min-height: 20px;
  min-width: 20px;
  stroke: currentColor;
  stroke-width: 2px;
  margin: ${(props) => (props.margin ? props.margin : '0 0.35rem 0 0')};
`;

export const MenuHeader = styled(motion.h3)`
  color: white;
  margin: 0;
  font-weight: normal;
`;

export const MenuHeaderIcon = styled(MenuIcon)`
  margin-right: 0;
  height: 18px;
  width: 18px;
`;

export const MenuHeaderButton = styled(StyledMenuButton)`
  padding: 0.25rem;
  width: auto;
  margin-right: 0.35rem;
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 2.5px dashed ${(props) => props.theme.focusColor};
  }
`;

export const CheckIcon = () => {
  return (
    <MenuIcon
      margin='0 0.25rem 0 auto'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, type: 'easeInOut' }}
        d='M4 16L8.0982 21.7375C8.52071 22.329 9.41304 22.288 9.80496 21.6758C12.1212 18.0575 17.15 11.8143 27 9'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
      />
    </MenuIcon>
  );
};
