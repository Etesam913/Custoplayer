import VideoPlayerWrapper from '@root/lib/components/VideoPlayerWrapper';

describe('VideoPlayerWrapper.cy.tsx', () => {
  it('renders videoPlayerWrapper', () => {
    cy.mount(<VideoPlayerWrapper />);
    cy.dataCy('videoPlayerWrapper').should('exist');
  });
});

