import ControlsBar from '@root/lib/components/ControlsBar';

describe('ControlsBar.cy.tsx', () => {
  it('controls Bar should be hidden by default', () => {
    cy.mount(<ControlsBar />);
    cy.dataCy('controlsBar').should('not.exist');
  });
});
