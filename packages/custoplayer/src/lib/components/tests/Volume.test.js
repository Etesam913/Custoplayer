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
        barId: 'volumeBar1',
      }}
    />,
  );
  const volumeButton1 = screen.getByTestId('volumeButton1');
  expect(volumeButton1).toBeInTheDocument();

  const volumeButton2 = screen.queryByTestId('volumeButton2');
  expect(volumeButton2).toBeNull();
});

it('Renders Volume Button Color', () => {
  const buttonColor = '#c58282';
  const id = 'volumeButton1';
  render(
    <ItemContainer isProgressBar={false} color={buttonColor}>
      <VolumeButtons
        item={{
          id: id,
          barId: 'volumeBar1',
          buttonColor: buttonColor,
        }}
      />
    </ItemContainer>,
  );
  const volumeButton1 = screen.getByTestId(id);
  expect(volumeButton1.parentElement).toHaveStyle(`color: ${buttonColor}`);
});

it('Renders Volume Bar Color', () => {
  const volumeBarColor = '#6f7ee0';
  const id = 'volumeButton1';
  const barId = 'volumeBar1';
  render(
    <VolumeButtons
      item={{
        id: id,
        barId: barId,
        barColor: volumeBarColor,
      }}
    />,
  );
  const volumeBar1 = screen.getByTestId(barId);
  expect(volumeBar1).toHaveStyle(`background-color: ${volumeBarColor}`);
});

it('Renders Volume Color', () => {
  const volumeColor = '#9be06f';
  const id = 'volumeButton1';
  const barId = 'volumeBar1';
  render(
    <VolumeButtons
      item={{
        id: id,
        barId: barId,
        volumeColor: volumeColor,
      }}
    />,
  );
  const volumeBar1 = screen.getByTestId(barId);
  expect(volumeBar1.firstChild).toHaveStyle(`background-color: ${volumeColor}`);
});
