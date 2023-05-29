import { ItemContainer } from '@root/lib/components/ControlsBar';
import FullscreenButtons from '@root/lib/components/FullscreenButtons';

describe('FullscreenButtons.cy.tsx', () => {
  it('fullscreenButton1 should render not fullscreen svg', () => {
    cy.mount(
      <FullscreenButtons
        item={{ id: 'fullscreenButton1' }}
        isFullscreen={false}
      />,
    );
    cy.dataCy('fullscreenButton1').should('exist');
    cy.dataCy('fullscreenButton1-not-fullscreened').should('exist');
    cy.dataCy('fullscreenButton1-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2-not-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2').should('not.exist');
  });

  it('fullscreenButton1 should render fullscreen svg', () => {
    cy.mount(
      <FullscreenButtons
        item={{ id: 'fullscreenButton1' }}
        isFullscreen={true}
      />,
    );
    cy.dataCy('fullscreenButton1').should('exist');
    cy.dataCy('fullscreenButton1-not-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton1-fullscreened').should('exist');
    cy.dataCy('fullscreenButton2-not-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2').should('not.exist');
  });

  it('fullscreenButton2 should render not fullscreen svg', () => {
    cy.mount(
      <FullscreenButtons
        item={{ id: 'fullscreenButton2' }}
        isFullscreen={false}
      />,
    );
    cy.dataCy('fullscreenButton2').should('exist');
    cy.dataCy('fullscreenButton1').should('not.exist');
    cy.dataCy('fullscreenButton1-not-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton1-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2-not-fullscreened').should('exist');
    cy.dataCy('fullscreenButton2-fullscreened').should('not.exist');
  });

  it('fullscreenButton2 should render fullscreen svg', () => {
    cy.mount(
      <FullscreenButtons
        item={{ id: 'fullscreenButton2' }}
        isFullscreen={true}
      />,
    );
    cy.dataCy('fullscreenButton2').should('exist');
    cy.dataCy('fullscreenButton1').should('not.exist');
    cy.dataCy('fullscreenButton1-not-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton1-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2-not-fullscreened').should('not.exist');
    cy.dataCy('fullscreenButton2-fullscreened').should('exist');
  });

  it('renders fullscreenButtons buttonColor prop', () => {
    const buttonColor = 'rgb(77, 153, 0)';
    cy.mount(
      <div>
        <ItemContainer
          isProgressBar={false}
          color={buttonColor}
          marginLeft={undefined}
          marginRight={undefined}
          isProgressBarNextItem={true}
          isProgressBarPreviousItem={true}
          data-cy='margin-test'
        >
          <FullscreenButtons
            item={{ id: 'fullscreenButton1' }}
            isFullscreen={false}
          />
        </ItemContainer>
        <ItemContainer
          isProgressBar={false}
          color={buttonColor}
          marginLeft={undefined}
          marginRight={undefined}
          isProgressBarNextItem={false}
          isProgressBarPreviousItem={false}
        >
          <FullscreenButtons
            item={{ id: 'fullscreenButton2' }}
            isFullscreen={false}
          />
        </ItemContainer>
      </div>,
    );
    cy.dataCy('fullscreenButton1').should('have.css', 'color', buttonColor);
    cy.dataCy('fullscreenButton2').should('have.css', 'color', buttonColor);
    cy.dataCy('margin-test').should('have.css', 'marginLeft', '13.6px');
  });
});

export {};
