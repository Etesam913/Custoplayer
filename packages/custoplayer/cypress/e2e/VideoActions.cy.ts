describe('Video Actions', () => {
  it('plays and pauses video via play button', () => {
    cy.visit('/')
    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('HTMLVideoPlayer').should('exist')
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'paused', true)
      .and('have.prop', 'ended', false);

    cy.dataCy('controlsBar').should('exist')
    cy.dataCy('controlsBar').should('not.be.disabled')
    cy.dataCy('playButton1').trigger('click')

    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'paused', false);

    cy.wait(3000);
    cy.dataCy('playButton1').trigger('click');

    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'paused', true);

    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'currentTime')
      .then((x) => expect(x).to.be.greaterThan(1));
    cy.dataCy('currentTime').should('not.contain.text', "00:00");
  })
})

export { }