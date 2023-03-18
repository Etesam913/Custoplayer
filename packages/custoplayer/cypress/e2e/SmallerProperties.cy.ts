describe('Smaller Properties', () => {
  it("checks if volume bar shows on normal viewport (hideOnMobile not activated)", () => {
    cy.visit('/')
    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('volumeButton1').should('exist')
    Cypress.config('viewportWidth', 768)
  })

  it("checks if volume bar hides on mobile viewport (hideOnMobile activated)", () => {
    cy.visit('/')
    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('volumeButton1').should('not.exist')
  })

  it('checks video event handler callbacks', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Stub your functions here
        cy.stub(win.console, 'log').as('consoleLog')
      },
    })
    cy.dataCy('HTMLVideoPlayer').click()
    cy.get('@consoleLog').should('be.calledWith', 'video clicked')
    cy.get('@consoleLog').should('be.calledWith', 'video playing')
    cy.get('@consoleLog').should('be.calledWith', 'video data loaded')
    cy.get('@consoleLog').should('be.calledWith', 'video data load start')
    cy.get('@consoleLog').should('be.calledWith', 'video duration changed')
    cy.wait(2000)
    cy.get('@consoleLog').should('be.calledWith', 'time updated')
    cy.dataCy('HTMLVideoPlayer').click()
    cy.get('@consoleLog').should('be.calledWith', 'video paused')

    cy.dataCy('videoPlayerWrapper').should('exist')
    cy.dataCy('videoPlayerWrapper').trigger('mouseover')
    cy.dataCy('progressBar1').trigger('mouseover').trigger('mousedown')
    cy.get('@consoleLog').should('be.calledWith', 'video seeking')
  })
})

export { }
