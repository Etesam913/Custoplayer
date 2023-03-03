import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayerWrapper from '../VideoPlayerWrapper';

it('Renders VideoPlayerWrapper', () => {
  render(<VideoPlayerWrapper />);
  const videoPlayerWrapper = screen.getByTestId('videoPlayerWrapper');
  expect(videoPlayerWrapper).toBeInTheDocument();
});
