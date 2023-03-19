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

  it('changes volume of the video via volume bar', () => {
    cy.visit('/')
    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('HTMLVideoPlayer').should('exist')
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'volume', 1)
    cy.dataCy('volumeContainer').trigger('mouseover').trigger('mousedown').trigger('mousemove').trigger('mouseup', 20, 20)
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'volume').then((x) => expect(x).to.be.lessThan(0.7))
    cy.dataCy('volumeButton1').should('exist')
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', false)
    cy.dataCy('volumeButton1').click()
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', true)
    cy.dataCy('volumeButton1').click()
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', false)
  })

  it('changes current time of the video via progress bar using mouse', () => {
    cy.visit('/')
    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('HTMLVideoPlayer').should('exist')
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'currentTime', 0);
    cy.dataCy('HTMLVideoPlayer').should(($video) => {
      expect(($video[0] as HTMLVideoElement).duration).to.be.gt(6)
    })
    cy.dataCy('progressBar1').trigger('mousedown').trigger('mousemove', { x: 20 })
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'currentTime').then((x) => expect(x).to.be.greaterThan(2))

    cy.dataCy('textPreviewTooltip').should('exist')
  })

  it('changes current time of the video via progress bar using touchscreen', () => {
    cy.visit('/')
    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('HTMLVideoPlayer').should('exist')
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'currentTime', 0);
    cy.dataCy('HTMLVideoPlayer').should(($video) => {
      expect(($video[0] as HTMLVideoElement).duration).to.be.gt(6)
    })
    cy.dataCy('progressBar1').trigger('touchstart').trigger('touchmove', { x: 20 })
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'currentTime').then((x) => expect(x).to.be.greaterThan(2))
    cy.dataCy('textPreviewTooltip').should('exist')
  })

})

export { }
