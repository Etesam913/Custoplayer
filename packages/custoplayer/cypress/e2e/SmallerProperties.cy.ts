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
})

export { }