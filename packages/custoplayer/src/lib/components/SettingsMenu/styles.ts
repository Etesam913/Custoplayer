import { darkenColor, lightenColor } from "@root/lib/utils";
import { motion } from "framer-motion";
import styled from "styled-components";

export const MenuButton = styled(motion.button)<{ settingsMenuColor: string | undefined }>`
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

export const MenuItem = styled.li`
  list-style-type: none;
  margin: 0;

`;

export const MenuIcon = styled(motion.svg)`
  height: 20px;
  width: 20px;
  stroke: currentColor;
  stroke-width: 2px;
  margin-right: 0.35rem;
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

export const MenuHeaderButton = styled(MenuButton)`
  padding: 0.25rem;
  width: auto;
  margin-right: 0.35rem;
`;

export const MenuHeaderRow = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 0.25rem 0 0.5rem;
`;
