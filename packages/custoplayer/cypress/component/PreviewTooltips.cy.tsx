import PreviewTooltips from "@root/lib/components/PreviewTooltips";

describe('PreviewTooltips.cy.tsx', () => {
  it("text previewTooltip is visible when hovered and dragging", () => {
    cy.mount(<PreviewTooltips isHovered={true} isProgressDragging={true} data={{ id: "text" }} />)
    cy.dataCy('textPreviewTooltip').should('exist')
  })

  it("text previewTooltip is visible when hovered, but not dragging", () => {
    cy.mount(<PreviewTooltips isHovered={true} isProgressDragging={false} data={{ id: "text" }} />)
    cy.dataCy('textPreviewTooltip').should('exist')
  })

  it("text previewTooltip is visible when not hovered, but dragging", () => {
    cy.mount(<PreviewTooltips isHovered={false} isProgressDragging={true} data={{ id: "text" }} />)
    cy.dataCy('textPreviewTooltip').should('exist')
  })

  it("text previewTooltip is hidden when not hovered, and not dragging", () => {
    cy.mount(<PreviewTooltips isHovered={false} isProgressDragging={false} data={{ id: "text" }} />)
    cy.dataCy('textPreviewTooltip').should('have.css', 'opacity', '0');
  })

})
