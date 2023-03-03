describe('Play Buttons', () => {
  it('Pauses & Plays Video via Play Button', () => {
    cy.visit('/');
    cy.get("[data-testid='videoPlayerWrapper']").as('videoPlayerWrapper');
    cy.get('@videoPlayerWrapper').should('exist');
    cy.get('@videoPlayerWrapper').trigger('mouseover');

    cy.get("[data-testid='HTMLVideoPlayer']").as('htmlVideoPlayer');
    cy.get('@htmlVideoPlayer').should('exist');
    cy.get('@htmlVideoPlayer')
      .should('have.prop', 'paused', true)
      .and('have.prop', 'ended', false);

    cy.get("[data-testid='controlsBar']").should('exist');

    cy.get("[data-testid='playButton1']").as('playButton');
    cy.get('@playButton').should('exist');
    cy.get('@playButton').should('not.be.disabled');
    cy.get('@playButton').trigger('click');

    cy.get('@htmlVideoPlayer').should('have.prop', 'paused', false);

    cy.wait(3000);
    cy.get('@playButton').trigger('click');

    cy.get('@htmlVideoPlayer').should('have.prop', 'paused', true);

    cy.get('@htmlVideoPlayer')
      .should('have.prop', 'currentTime')
      .then((x) => expect(x).to.be.greaterThan(1));
  });
});

export { };
