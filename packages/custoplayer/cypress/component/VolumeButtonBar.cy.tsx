import { ItemContainer } from '@root/lib/components/ControlsBar';
import VolumeButtons from '@root/lib/components/VolumeButtons';

describe('VolumeButtonBar.cy.tsx', () => {
  it('renders volumeButton1', () => {
    cy.mount(
      <VolumeButtons
        item={{
          id: 'volumeButton1',
          barId: 'volumeBar1',
        }}
      />,
    );
    cy.dataCy('volumeButton1').should('exist');
    cy.dataCy('volumeButton2').should('not.exist');
  });

  it('renders volumeButton1 color', () => {
    const buttonColor = 'rgb(197, 130, 130)';
    const id = 'volumeButton1';
    cy.mount(
      <ItemContainer isProgressBar={false} color={buttonColor}>
        <VolumeButtons
          item={{
            id: id,
            barId: 'volumeBar1',
            buttonColor: buttonColor,
          }}
        />
      </ItemContainer>,
    );
    cy.dataCy(id).parent().should('have.css', 'color', buttonColor);
  });

  it('renders volumeBar1 & volumeBar2 bar color', () => {
    const volumeBarColor1 = 'rgb(211, 215, 22)';
    const volumeBarColor2 = 'rgb(218, 36, 157)';
    const buttonBarContainer1 = 'volumeButtonBarContainer-volumeButton1'
    const buttonBarContainer2 = 'volumeButtonBarContainer-volumeButton2'
    const id1 = 'volumeButton1';
    const id2 = 'volumeButton2';
    const barId1 = 'volumeBar1';
    const barId2 = 'volumeBar2';

    cy.mount(
      <div>
        <VolumeButtons
          item={{
            id: id1,
            barId: barId1,
            barColor: volumeBarColor1,
          }}
        />
        <VolumeButtons
          item={{
            id: id2,
            barId: barId2,
            barColor: volumeBarColor2,
          }}
        />
      </div>,
    );
    cy.dataCy(buttonBarContainer1).trigger('mouseover')
    cy.dataCy(barId1).should('have.css', 'background-color', volumeBarColor1);
    cy.dataCy(buttonBarContainer2).trigger('mouseover')
    cy.dataCy(barId2).should('have.css', 'background-color', volumeBarColor2);
  });

  it('renders volumeBar1 & volumeBar2 volume color', () => {
    const volumeColor1 = 'rgb(111, 126, 224)';
    const volumeColor2 = 'rgb(36, 218, 130)';
    const buttonBarContainer1 = 'volumeButtonBarContainer-volumeButton1'
    const buttonBarContainer2 = 'volumeButtonBarContainer-volumeButton2'
    const id1 = 'volumeButton1';
    const id2 = 'volumeButton2';
    const barId1 = 'volumeBar1';
    const barId2 = 'volumeBar2';

    cy.mount(
      <div>
        <VolumeButtons
          item={{
            id: id1,
            barId: barId1,
            volumeColor: volumeColor1,
          }}
        />
        <VolumeButtons
          item={{
            id: id2,
            barId: barId2,
            volumeColor: volumeColor2,
          }}
        />
      </div>,
    );
    cy.dataCy(buttonBarContainer1).trigger('mouseover')
    cy.dataCy(barId1)
      .children()
      .first()
      .should('have.css', 'background-color', volumeColor1);
    cy.dataCy(buttonBarContainer2).trigger('mouseover')
    cy.dataCy(barId2)
      .children()
      .first()
      .should('have.css', 'background-color', volumeColor2);
  });

  it('renders volumeBar1 & volumeBar2 bar color', () => {
    const volumeBarColor1 = 'rgb(211, 215, 22)';
    const volumeBarColor2 = 'rgb(218, 36, 157)';
    const buttonBarContainer1 = 'volumeButtonBarContainer-volumeButton1'
    const buttonBarContainer2 = 'volumeButtonBarContainer-volumeButton2'
    const id1 = 'volumeButton1';
    const id2 = 'volumeButton2';
    const barId1 = 'volumeBar1';
    const barId2 = 'volumeBar2';

    cy.mount(
      <div>
        <VolumeButtons
          item={{
            id: id1,
            barId: barId1,
            barColor: volumeBarColor1,
          }}
        />
        <VolumeButtons
          item={{
            id: id2,
            barId: barId2,
            barColor: volumeBarColor2,
          }}
        />
      </div>,
    );
    cy.dataCy(buttonBarContainer1).trigger('mouseover')
    cy.dataCy(barId1).should('have.css', 'background-color', volumeBarColor1);
    cy.dataCy(buttonBarContainer2).trigger('mouseover')
    cy.dataCy(barId2).should('have.css', 'background-color', volumeBarColor2);
  });

  it('renders volumeBar1 & volumeBar2 scrubber color & scrubber border color', () => {
    const scrubberColor1 = 'rgb(111, 126, 224)';
    const scrubberColor2 = 'rgb(36, 218, 130)';

    const scrubberBorderColor1 = 'rgb(36, 218, 130)';
    const scrubberBorderColor2 = 'rgb(111, 126, 224)';

    const buttonBarContainer1 = 'volumeButtonBarContainer-volumeButton1'
    const buttonBarContainer2 = 'volumeButtonBarContainer-volumeButton2'
    const id1 = 'volumeButton1';
    const id2 = 'volumeButton2';
    const barId1 = 'volumeBar1';
    const barId2 = 'volumeBar2';

    cy.mount(
      <div>
        <VolumeButtons
          item={{
            id: id1,
            barId: barId1,
            scrubberColor: scrubberColor1,
            scrubberBorderColor: scrubberBorderColor1
          }}
        />
        <VolumeButtons
          item={{
            id: id2,
            barId: barId2,
            scrubberColor: scrubberColor2,
            scrubberBorderColor: scrubberBorderColor2
          }}
        />
      </div>,
    );
    cy.dataCy(buttonBarContainer1).trigger('mouseover')
    cy.dataCy('volumeScrubber1').should('have.css', 'background-color', scrubberColor1);
    cy.dataCy('volumeScrubber1').should('have.css', 'border', '2px solid ' + scrubberBorderColor1);
    cy.dataCy(buttonBarContainer2).trigger('mouseover')
    cy.dataCy('volumeScrubber2').should('have.css', 'background-color', scrubberColor2);
    cy.dataCy('volumeScrubber2').should('have.css', 'border', '2px solid ' + scrubberBorderColor2);
  });


});
