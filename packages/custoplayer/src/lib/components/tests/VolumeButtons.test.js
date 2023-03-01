import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VolumeButtons from '../VolumeButtons';
import { ItemContainer } from '../ControlsBar';

it('Renders Volume Button 1', () => {
  render(
    <VolumeButtons
      item={{
        id: 'volumeButton1',
      }}
    />,
  );
  const volumeButton1 = screen.getByTestId('volumeButton1');
  expect(volumeButton1).toBeInTheDocument();

  const volumeButton2 = screen.queryByTestId('volumeButton2');
  expect(volumeButton2).toBeNull();
});

it('Renders Volume Button Color', () => {
  const colorVal = '#c58282';
  render(
    <ItemContainer isProgressBar={false} color={colorVal}>
      <VolumeButtons item={{ id: 'volumeButton1', color: colorVal }} />
    </ItemContainer>,
  );
  const volumeButton1 = screen.getByTestId('volumeButton1');
  expect(volumeButton1.parentElement).toHaveStyle(`color: ${colorVal}`);
});
