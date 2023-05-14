import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks';
import { SettingsButtonItem } from '../types';
import { darkenColor, lightenColor } from '../utils';
import SettingsMenu from './SettingsMenu';

function SettingsButtons({ item }: { item: SettingsButtonItem }) {
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const settingsMenuRef = useRef<HTMLMenuElement>(null);
  useOnClickOutside(settingsMenuRef, () => setIsSettingsMenuOpen(false));

  return (
    <>
      <AnimatePresence>
        {isSettingsMenuOpen && (
          <SettingsMenu
            ref={settingsMenuRef}
            item={item}
            setIsSettingsMenuOpen={setIsSettingsMenuOpen}
          />
        )}
      </AnimatePresence>

      <SettingsButtonContainer
        onClick={() => setIsSettingsMenuOpen((prev) => !prev)}
        data-cy={item.id}
        whileHover={{ scale: 1.1, rotateZ: 45 }}
        whileTap={{ scale: 0.95, rotateZ: 0 }}
      >
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g>
            <SettingsPath as='circle' cx='16' cy='16' r='3' />
            <SettingsPath d='M10.7591 6.96198C12.3955 8.30774 14.8735 7.58014 15.5226 5.56327C15.6719 5.09948 16.3281 5.09948 16.4774 5.56327C17.1265 7.58014 19.6045 8.30774 21.2409 6.96198C21.6173 6.65252 22.1693 7.00729 22.0441 7.47815C21.4998 9.52578 23.191 11.4776 25.2953 11.2302C25.7792 11.1733 26.0518 11.7702 25.6919 12.0986C24.1269 13.5269 24.4945 16.0833 26.3984 17.0128C26.8363 17.2265 26.7429 17.8761 26.2626 17.9578C24.1738 18.3133 23.101 20.6625 24.2002 22.4738C24.4529 22.8904 24.0232 23.3863 23.5749 23.1954C21.6256 22.3652 19.453 23.7614 19.3984 25.8795C19.3858 26.3665 18.7562 26.5514 18.4823 26.1485C17.2913 24.3962 14.7087 24.3962 13.5177 26.1485C13.2438 26.5514 12.6142 26.3665 12.6016 25.8795C12.547 23.7614 10.3744 22.3652 8.42505 23.1954C7.9768 23.3863 7.54708 22.8904 7.79984 22.4738C8.899 20.6625 7.82615 18.3133 5.73744 17.9578C5.25713 17.8761 5.16374 17.2265 5.60157 17.0128C7.50552 16.0833 7.87307 13.5269 6.30811 12.0986C5.94825 11.7702 6.22084 11.1733 6.70472 11.2302C8.80898 11.4776 10.5002 9.52578 9.9559 7.47815C9.83073 7.00729 10.3827 6.65252 10.7591 6.96198Z' />
          </g>
        </svg>
      </SettingsButtonContainer>
    </>
  );
}

export default SettingsButtons;

const SettingsButtonContainer = styled(motion.button)`
  background: transparent;
  padding: 0;
  border: 0;
  color: currentColor;
  cursor: pointer;
  height: 32px;
  width: 32px;
`;

const SettingsPath = styled.path`
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
`;
