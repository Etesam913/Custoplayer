import ProgressBars from '@root/lib/components/ProgressBars';

describe('ProgressBars.cy.tsx', () => {
  it('renders progressBars', () => {
    cy.mount(<ProgressBars item={{ id: 'progressBar1' }} />);
    cy.dataCy('progressBar1').should('exist');
    cy.mount(<ProgressBars item={{ id: 'progressBar2' }} />);
    cy.dataCy('progressBar2').should('exist');
    cy.mount(<ProgressBars item={{ id: 'progressBar3' }} />);
    cy.dataCy('progressBar3').should('exist');
  });

  it('renders progressBars progress color', () => {
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

    cy.mount(
      <ProgressBars item={{ id: 'progressBar2', progressColor: colorVal }} />,
    );
    cy.dataCy('progressBar2')
      .children()
      .first()
      .children()
      .first()
      .should('have.css', 'background-color', colorVal);

    cy.mount(
      <ProgressBars item={{ id: 'progressBar3', progressColor: colorVal }} />,
    );
    cy.dataCy('progressBar3')
      .children()
      .first()
      .children()
      .first()
      .should('have.css', 'background-color', colorVal);
  });

  it('renders progressBar1 scrubberColor and scrubberBorderColor', () => {
    // This is the default color when no progressColor prop is specified
    const scrubberColor = 'rgb(51, 255, 85)';
    const scrubberBorderColor = 'rgb(153, 102, 255)';

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

  it('renders progressBar3 barBorderColor', ()=>{
    const barBorderColor = 'rgb(153, 102, 255)';
    cy.mount(
      <ProgressBars
        item={{
          id: 'progressBar3',
          barBorderColor: barBorderColor,
        }}
      />,
    );
    cy.dataCy('progressBar3')
      .children()
      .first().should('have.css', 'border', `3px solid ${barBorderColor}`)

  })

  it('renders progressBars barColor', () => {
    // This is the default color when no progressColor prop is specified
    const barColor = 'rgb(51, 140, 65)';

    cy.mount(
      <ProgressBars
        item={{
          id: 'progressBar1',
          barColor: barColor,
        }}
      />,
    );
    cy.dataCy('progressBar1')
      .children()
      .first().should('have.css', 'background-color', barColor)

    cy.mount(
      <ProgressBars
        item={{
          id: 'progressBar2',
          barColor: barColor,
        }}
      />,
    );
    cy.dataCy('progressBar2')
      .children()
      .first().should('have.css', 'background-color', barColor)

    cy.mount(
      <ProgressBars
        item={{
          id: 'progressBar3',
          barColor: barColor,
        }}
      />,
    );
    cy.dataCy('progressBar3')
      .children()
      .first().should('have.css', 'background-color', barColor)
  });

});
