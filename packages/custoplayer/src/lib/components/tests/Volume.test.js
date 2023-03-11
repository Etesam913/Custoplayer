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
  const volumeBarColor1 = '#6f7ee0';
  const volumeBarColor2 = '#24da82';
  const id = 'volumeButton1';
  const barId1 = 'volumeBar1';
  const barId2 = 'volumeBar2';
  render(
    <div>
      <VolumeButtons
        item={{
          id: id,
          barId: barId1,
          barColor: volumeBarColor1,
        }}
      />
      <VolumeButtons
        item={{
          id: id,
          barId: barId2,
          barColor: volumeBarColor2,
        }}
      />
    </div>,
  );
  const volumeBar1 = screen.getByTestId(barId1);
  expect(volumeBar1).toHaveStyle(`background-color: ${volumeBarColor1}`);

  const volumeBar2 = screen.getByTestId(barId2);
  expect(volumeBar2).toHaveStyle(`background-color: ${volumeBarColor2}`);
});

it('Renders Volume Color', () => {
  const volumeColor1 = '#9be06f';
  const volumeColor2 = '#e06fa7';
  const id = 'volumeButton1';
  const barId1 = 'volumeBar1';
  const barId2 = 'volumeBar2';

  render(
    <div>
      <VolumeButtons
        item={{
          id: id,
          barId: barId1,
          volumeColor: volumeColor1,
        }}
      />
      <VolumeButtons
        item={{
          id: id,
          barId: barId2,
          volumeColor: volumeColor2,
        }}
      />
    </div>,
  );
  
  const volumeBar1 = screen.getByTestId(barId1);
  expect(volumeBar1.firstChild).toHaveStyle(
    `background-color: ${volumeColor1}`,
  );

  const volumeBar2 = screen.getByTestId(barId2);
  expect(volumeBar2.firstChild).toHaveStyle(
    `background-color: ${volumeColor2}`,
  );
});
