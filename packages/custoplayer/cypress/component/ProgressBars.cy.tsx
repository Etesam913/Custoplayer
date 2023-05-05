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

  it("renders topProgressBars", () => {
    cy.mount(<ProgressBars onTop item={{ id: 'progressBar1' }} />);
    cy.dataCy('progressBar1').should('exist').should('have.css', 'align-items', 'flex-end');
    cy.mount(<ProgressBars onTop item={{ id: 'progressBar2' }} />);
    cy.dataCy('progressBar2').should('exist').should('have.css', 'align-items', 'flex-end');
    cy.mount(<ProgressBars onTop item={{ id: 'progressBar3' }} />);
    cy.dataCy('progressBar3').should('exist').should('have.css', 'align-items', 'flex-end');
  })

  it('renders progressBars buffered color', () => {
    let bufferedColor = 'rgb(82, 158, 233)'
    cy.mount(
      <ProgressBars item={{ id: 'progressBar1', bufferedColor: bufferedColor }} />,
    );
    cy.dataCy('progressBuffer1').should('have.css', 'background-color', bufferedColor);

    cy.mount(
      <ProgressBars item={{ id: 'progressBar2', bufferedColor: bufferedColor }} />,
    );
    cy.dataCy('progressBuffer2').should('have.css', 'background-color', bufferedColor);

    cy.mount(
      <ProgressBars item={{ id: 'progressBar3', bufferedColor: bufferedColor }} />,
    );
    cy.dataCy('progressBuffer3').should('have.css', 'background-color', bufferedColor);
  })

  it('renders progressBars progress color', () => {
    let colorVal = 'rgb(252, 249, 47)';
    cy.mount(
      <ProgressBars item={{ id: 'progressBar1', progressColor: colorVal }} />,
    );
    cy.dataCy('progress1').should('have.css', 'background-color', colorVal);

    cy.mount(
      <ProgressBars item={{ id: 'progressBar2', progressColor: colorVal }} />,
    );
    cy.dataCy('progress2').should('have.css', 'background-color', colorVal);

    cy.mount(
      <ProgressBars item={{ id: 'progressBar3', progressColor: colorVal }} />,
    );
    cy.dataCy('progress3').should('have.css', 'background-color', colorVal);
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

  it('renders progressBar3 barBorderColor', () => {
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
