import { ItemContainer } from '@root/lib/components/ControlsBar';
import PlayButtons from '@root/lib/components/PlayButtons';

describe('PlayButtons.cy.tsx', () => {
  it('playButton1 should render', () => {
    cy.mount(<PlayButtons item={{ id: 'playButton1' }} />);
    cy.dataCy('playButton1').should('exist');
    cy.dataCy('playButton2').should('not.exist');
  });

  it('playButton2 should render', () => {
    cy.mount(<PlayButtons item={{ id: 'playButton2' }} />);
    cy.dataCy('playButton2').should('exist');
    cy.dataCy('playButton1').should('not.exist');
  });

  it('renders playButton1 color (and custom margin)', () => {
    const colorVal = 'rgb(248, 219, 94)';
    cy.mount(
      <ItemContainer
        $isProgressBar={false}
        $color={colorVal}
        $marginLeft={'0.5rem'}
        $marginRight={'0.5rem'}
        $isProgressBarNextItem={false}
        $isProgressBarPreviousItem={false}
        data-cy='item-container'
      >
        <PlayButtons item={{ id: 'playButton1' }} />
      </ItemContainer>,
    );
    // Doing .parent() twice gets me to the ItemContainer container
    cy.dataCy('playButton1').should('have.css', 'color', colorVal);
    cy.dataCy('item-container').should('have.css', 'marginLeft', '8px');
    cy.dataCy('item-container').should('have.css', 'marginRight', '8px');
  });

  it('renders playButton2 color (and default margin)', () => {
    const colorVal = 'rgb(39, 113, 239)';
    cy.mount(
      <ItemContainer
        $isProgressBar={false}
        $color={colorVal}
        $marginLeft={undefined}
        $marginRight={undefined}
        $isProgressBarNextItem={false}
        $isProgressBarPreviousItem={false}
        data-cy='item-container'
      >
        <PlayButtons item={{ id: 'playButton2', buttonColor: colorVal }} />
      </ItemContainer>,
    );
    cy.dataCy('playButton2').should('have.css', 'color', colorVal);
    cy.dataCy('item-container').should('have.css', 'marginLeft', '0px');
    cy.dataCy('item-container').should('have.css', 'marginRight', '0px');
  });
});
