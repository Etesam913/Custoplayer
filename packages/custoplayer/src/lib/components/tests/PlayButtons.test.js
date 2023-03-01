import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayButtons from '../PlayButtons';
import '@testing-library/jest-dom';
import { ItemContainer } from '../ControlsBar';

it('Renders Play Button 1', () => {
  render(<PlayButtons item={{ id: 'playButton1' }} />);
  const playButton1 = screen.getByTestId('playButton1');
  expect(playButton1).toBeInTheDocument();

  const playButton2 = screen.queryByTestId('playButton2');
  expect(playButton2).toBeNull();
});

it('Renders Play Button 2', () => {
  render(<PlayButtons item={{ id: 'playButton2' }} />);
  const playButton1 = screen.queryByTestId('playButton1');
  expect(playButton1).toBeNull();

  const playButton2 = screen.queryByTestId('playButton2');
  expect(playButton2).toBeInTheDocument();
});

it('Renders Play Button 1 Color', () => {
  const colorVal = 'rgb(248, 219, 94)';
  render(
    <ItemContainer isProgressBar={false} color={colorVal}>
      <PlayButtons item={{ id: 'playButton1', color: colorVal }} />
    </ItemContainer>,
  );
  const playButton1 = screen.queryByTestId('playButton1');
  expect(playButton1.parentElement).toHaveStyle(`color: ${colorVal}`);
});

it('Renders Play Button 2 Color', () => {
  const colorVal = '#be2d2d';
  render(
    <ItemContainer isProgressBar={false} color={colorVal}>
      <PlayButtons item={{ id: 'playButton2', color: colorVal }} />
    </ItemContainer>,
  );
  const playButton2 = screen.queryByTestId('playButton2');
  expect(playButton2.parentElement).toHaveStyle(`color: ${colorVal}`);
});
