import ProgressBars from '@root/lib/components/ProgressBars';

describe('ProgressBars.cy.tsx', () => {
  it('renders progressBar1', () => {
    cy.mount(<ProgressBars item={{ id: 'progressBar1' }} />);
    cy.dataCy('progressBar1').should('exist');
    cy.dataCy('progressBar2').should('not.exist');
  });

  it('renders progressBar1 progress color', () => {
    // This is the default color when no progressColor prop is specified
    let colorVal = 'rgb(74, 184, 96)';
    cy.mount(<ProgressBars item={{ id: 'progressBar1' }} />);
    cy.dataCy('progressBar1')
      .children()
      .first()
      .children()
      .first()
      .should('have.css', 'background-color', colorVal);

    // Actually testing a specified color prop
    colorVal = 'rgb(252, 249, 47)';
    cy.mount(
      <ProgressBars item={{ id: 'progressBar1', progressColor: colorVal }} />,
    );
    cy.dataCy('progressBar1')
      .children()
      .first()
      .children()
      .first()
      .should('have.css', 'background-color', colorVal);
  });

  it('renders progressBar1 scrubber color and scrubber border color', () => {
    // This is the default color when no progressColor prop is specified
    let scrubberColor = 'rgb(51, 255, 85)';
    let scrubberBorderColor = 'rgb(153, 102, 255)';

    cy.mount(
      <ProgressBars
        item={{
          id: 'progressBar1',
          scrubberColor: scrubberColor,
          scrubberBorderColor: scrubberBorderColor,
        }}
      />,
    );
    cy.dataCy('progressBar1Scrubber').should(
      'have.css',
      'background-color',
      scrubberColor,
    );
    cy.dataCy('progressBar1Scrubber').should(
      'have.css',
      'border',
      '2px solid ' + scrubberBorderColor,
    );
  });
});
