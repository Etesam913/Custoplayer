import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBars from '../ProgressBars';

it('Renders Progress Bar 1', () => {
  render(<ProgressBars item={{ id: 'progressBar1' }} />);
  const progressBar1 = screen.getByTestId('progressBar1');
  expect(progressBar1).toBeInTheDocument();

  const progressBar2 = screen.queryByTestId('progressBar2');
  expect(progressBar2).toBeNull();
});

it('Renders Progress Bar 1 Progress Color', () => {
  
  // This is the default color when no progressColor prop is specified
  let colorVal = 'rgb(74, 184, 96)';
  render(<ProgressBars item={{ id: 'progressBar1' }} />);
  let progressBar1 = screen.getByTestId('progressBar1');
  let progressElem = progressBar1.firstChild.firstChild;
  expect(progressElem).toHaveStyle(`background-color: ${colorVal}`);

  cleanup();

  // Actually testing a specified color prop
  colorVal = 'rgb(252, 249, 47)';
  render(
    <ProgressBars item={{ id: 'progressBar1', progressColor: colorVal }} />,
  );
  progressBar1 = screen.getByTestId('progressBar1');
  progressElem = progressBar1.firstChild.firstChild;
  expect(progressElem).toHaveStyle(`background-color: ${colorVal}`);
});
