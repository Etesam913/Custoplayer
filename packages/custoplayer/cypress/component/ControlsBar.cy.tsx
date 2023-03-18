import ControlsBar from '@root/lib/components/ControlsBar';

describe('ControlsBar.cy.tsx', () => {
  it('controls Bar should be hidden when showControlsBarAtom is false', () => {
    cy.mount(<ControlsBar />);
    cy.dataCy('controlsBar').should('not.exist');
  });
});
