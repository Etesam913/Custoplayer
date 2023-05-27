import { Custoplayer } from '@root/lib';

describe('Custoplayer.cy.tsx', () => {
  it('renders error message when values not defined', () => {
    cy.mount(
      <Custoplayer src='https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-1080.mp4' />,
    );
    cy.dataCy('errorMessage').should('exist');
  });
});
