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

  it('renders playButton1 color', () => {
    const colorVal = 'rgb(248, 219, 94)';
    cy.mount(
      <ItemContainer isProgressBar={false} color={colorVal}>
        <PlayButtons item={{ id: 'playButton1', buttonColor: colorVal }} />
      </ItemContainer>,
    );
    cy.dataCy('playButton1').should('have.css', 'color', colorVal);
  });

  it('renders playButton2 color', () => {
    const colorVal = 'rgb(39, 113, 239)';
    cy.mount(
      <ItemContainer isProgressBar={false} color={colorVal}>
        <PlayButtons item={{ id: 'playButton2', buttonColor: colorVal }} />
      </ItemContainer>,
    );
    cy.dataCy('playButton2').should('have.css', 'color', colorVal);
  });
});
