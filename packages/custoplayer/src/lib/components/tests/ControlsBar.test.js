import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ControlsBar from '../ControlsBar';
import { atom, useAtom, Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { showControlsBarAtom, myScope } from '../../atoms';

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const ControlsBarProvider = () => {
  return (
    <TestProvider initialValues={[[showControlsBarAtom, true]]}>
      <ControlsBar />
    </TestProvider>
  );
};

describe('Controls Bar Tests', () => {
  it('Controls Bar should be hidden when showControlsBarAtom is false', () => {
    render(<ControlsBar />);
    let controlsBar = screen.queryByTestId('controlsBar');
    expect(controlsBar).toBeNull();
  });
});
