import { cleanup, render, screen } from '@testing-library/react';
import PlayButtons from './PlayButtons';
import { expect } from 'jest';

it('Renders Play Button', () => {
  render(<PlayButtons item={{ id: 'playButton1' }} />);
  const playButton = screen.getByTestId('playButton1');
  expect(playButton).toBeInTheDocument();
});
