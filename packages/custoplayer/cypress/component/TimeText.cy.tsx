import { ItemContainer } from '@root/lib/components/ControlsBar';
import CurrentTime from '@root/lib/components/CurrentTime';
import Duration from '@root/lib/components/Duration';

describe('TimeText.cy.tsx', () => {
  it('currentTime should render', () => {
    cy.mount(<CurrentTime />);
    cy.dataCy('currentTime').should('exist');
    cy.dataCy('duration').should('not.exist');
  });

  it('duration should render', () => {
    cy.mount(<Duration />);
    cy.dataCy('duration').should('exist');
    cy.dataCy('currentTime').should('not.exist');
  });

  it('render currentTime text color', () => {
    const colorVal = 'rgb(111, 219, 190)';
    cy.mount(
      <ItemContainer
        isProgressBar={false}
        color={colorVal}
        marginLeft={undefined}
        marginRight={undefined}
        isProgressBarNextItem={false}
        isProgressBarPreviousItem={false}
      >
        <CurrentTime />
      </ItemContainer>,
    );
    cy.dataCy('currentTime').parent().should('have.css', 'color', colorVal);
  });

  it('render duration text color', () => {
    const colorVal = 'rgb(129, 150, 25)';
    cy.mount(
      <ItemContainer
        isProgressBar={false}
        color={colorVal}
        marginLeft={undefined}
        marginRight={undefined}
        isProgressBarNextItem={false}
        isProgressBarPreviousItem={false}
      >
        <Duration />
      </ItemContainer>,
    );
    cy.dataCy('duration').parent().should('have.css', 'color', colorVal);
  });
});
