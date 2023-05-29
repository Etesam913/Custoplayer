describe('Video Actions', () => {
  it('plays and pauses video via play button', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('playIndicator').should('exist');
    cy.dataCy('playIndicator')
      .children()
      .first()
      .should('have.attr', 'data-cy', 'playButton1-svg');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'paused', true)
      .and('have.prop', 'ended', false);

    cy.dataCy('controlsBar').should('exist');
    cy.dataCy('controlsBar').should('not.be.disabled');
    cy.dataCy('playButton1').trigger('click');

    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'paused', false);
    cy.dataCy('playIndicator')
      .children()
      .first()
      .should('have.attr', 'data-cy', 'pauseButton1-svg');
    cy.wait(3000);
    cy.dataCy('playButton1').trigger('click');

    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'paused', true);

    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'currentTime')
      .then((x) => expect(x).to.be.greaterThan(1));
    cy.dataCy('currentTime').should('not.contain.text', '00:00');
  });

  it('changes volume of the video via volume bar using mouse', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'volume', 1);
    cy.dataCy('volumeButtonBarContainer-volumeButton1').trigger('mouseover');
    cy.dataCy('volumeContainer')
      .trigger('mouseover')
      .trigger('mousedown')
      .trigger('mousemove')
      .trigger('mouseup', 20, 20);
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'volume')
      .then((x) => expect(x).to.be.lessThan(0.7));
    cy.dataCy('volumeButton1').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', false);
    cy.dataCy('volumeButton1').click();
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', true);
    cy.dataCy('volumeButton1').click();
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', false);
  });

  it('changes volume of the video via volume bar using touchscreen', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'volume', 1);
    cy.dataCy('volumeButtonBarContainer-volumeButton1').trigger('mouseover');
    cy.dataCy('volumeContainer')
      .trigger('touchstart')
      .trigger('touchmove', { x: 20 });
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'volume')
      .then((x) => expect(x).to.be.lessThan(0.7));
    cy.dataCy('volumeButton1').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', false);
    cy.dataCy('volumeButton1').click();
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', true);
    cy.dataCy('volumeButton1').click();
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'muted', false);
  });

  it('changes current time of the video via progress bar using mouse', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'currentTime', 0);
    cy.dataCy('HTMLVideoPlayer').should(($video) => {
      expect(($video[0] as HTMLVideoElement).duration).to.be.gt(6);
    });
    cy.dataCy('progressBar1')
      .trigger('mousedown')
      .trigger('mousemove', { x: 20 });
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'currentTime')
      .then((x) => expect(x).to.be.greaterThan(2));
    // Some of the video should be buffered
    cy.dataCy('progressBuffer1').invoke('width').should('be.greaterThan', 100);
    cy.dataCy('textPreviewTooltip').should('exist');
  });

  it('changes current time of the video via progress bar using touchscreen', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('have.prop', 'currentTime', 0);
    cy.dataCy('HTMLVideoPlayer').should(($video) => {
      expect(($video[0] as HTMLVideoElement).duration).to.be.gt(6);
    });
    cy.dataCy('progressBar1')
      .trigger('touchstart')
      .trigger('touchmove', { x: 20 });
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'currentTime')
      .then((x) => expect(x).to.be.greaterThan(2));
    cy.dataCy('textPreviewTooltip').should('be.visible');
  });

  it('changes current time of video to test previewTooltipThumbnail', () => {
    cy.visit('/');
    cy.dataCy('changePreviewTooltipIdButton').trigger('click');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('progressBar1')
      .trigger('mousedown')
      .trigger('mousemove', { x: 20 });
    cy.dataCy('imageThumbnailContainer').should('be.visible');
    cy.dataCy('imageThumbnail').should(
      'have.css',
      'background-image',
      'url("https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/thumbs.jpg")',
    );
    // The background position should have changed
    cy.dataCy('imageThumbnail').should(
      'have.css',
      'background-position',
      '-875px -210px',
    );
  });

  it('changes quality of the video via settings button', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('HTMLVideoPlayer').should('exist');

    cy.dataCy('settingsButton1').trigger('click');
    cy.dataCy('settingsMenu').should('exist');
    cy.dataCy('settingsMenuQualityButton').trigger('click');
    cy.dataCy('settingsMenuQualityButton1080p').should('exist');
    cy.dataCy('settingsMenuQualityButton720p').should('exist');
    cy.dataCy('settingsMenuQualityButton480p').should('exist');
    cy.dataCy('settingsMenuQualityButton240p').should('exist');
    cy.dataCy('settingsMenuQualityButton144p').should('exist');

    cy.dataCy('settingsMenuQualityButton720p').trigger('click');
    cy.dataCy('HTMLVideoPlayer').should(
      'have.prop',
      'src',
      'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-720.mp4',
    );

    cy.dataCy('settingsMenuQualityButton480p').trigger('click');
    cy.dataCy('HTMLVideoPlayer').should(
      'have.prop',
      'src',
      'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-480.mp4',
    );

    cy.dataCy('settingsMenuQualityButton240p').trigger('click');
    cy.dataCy('HTMLVideoPlayer').should(
      'have.prop',
      'src',
      'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-240.mp4',
    );

    cy.dataCy('settingsMenuQualityButton144p').trigger('click');
    cy.dataCy('HTMLVideoPlayer').should(
      'have.prop',
      'src',
      'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/testing/grain-video-144.mp4',
    );

    // Exiting Quality Menu
    cy.dataCy('settingsMenuHeaderButton').trigger('click');
    cy.dataCy('settingsMenuQualityButton1080p').should('not.exist');
    cy.dataCy('settingsMenuQualityButton720p').should('not.exist');
    cy.dataCy('settingsMenuQualityButton480p').should('not.exist');
    cy.dataCy('settingsMenuQualityButton240p').should('not.exist');
    cy.dataCy('settingsMenuQualityButton144p').should('not.exist');
    cy.dataCy('settingsMenuHeaderButton').trigger('click');
    cy.dataCy('settingsMenu').should('not.exist');
  });

  it('sees if english subtitles show by default', () => {
    const firstVTTLine = '- Hello, this is Etesam';
    const secondVTTLine = '- This is a second cue';
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('click');
    cy.dataCy('currentSubtitle')
      .should('exist')
      .should('have.text', firstVTTLine);
    cy.wait(1000);
    cy.dataCy('currentSubtitle')
      .should('exist')
      .should('have.text', secondVTTLine);
    cy.wait(2000);
    cy.dataCy('currentSubtitle').should('not.exist');
  });

  it('selects spanish subtitles and see if they show', () => {
    const firstVTTLine = '- Hola, soy Etesam';
    const secondVTTLine = '- Esta es una segunda señal';
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('settingsButton1').trigger('click');
    cy.dataCy('settingsMenu').should('exist');
    cy.dataCy('settingsMenuSubtitlesButton').trigger('click');
    cy.dataCy('settingsMenuSubtitleButtonSpanish')
      .should('exist')
      .trigger('click');

    cy.dataCy('settingsMenuHeaderButton').trigger('click');
    cy.dataCy('settingsMenuHeaderButton').trigger('click');
    cy.dataCy('settingsMenu').should('not.exist');

    cy.dataCy('videoPlayerWrapper').trigger('click');
    cy.dataCy('currentSubtitle')
      .should('exist')
      .should('have.text', firstVTTLine);
    cy.wait(1000);
    cy.dataCy('currentSubtitle')
      .should('exist')
      .should('have.text', secondVTTLine);
    cy.wait(2000);
    cy.dataCy('currentSubtitle').should('not.exist');
  });

  it('selects different video speeds', () => {
    cy.visit('/');
    cy.dataCy('videoPlayerWrapper').should('exist');
    cy.dataCy('HTMLVideoPlayer').should('exist');
    cy.dataCy('videoPlayerWrapper').trigger('mouseover');
    cy.dataCy('settingsButton1').trigger('click');
    cy.dataCy('settingsMenu').should('exist');
    cy.dataCy('settingsMenuSpeedButton').trigger('click');

    cy.dataCy('settingsMenuSpeedButton-0').should('be.visible');
    cy.dataCy('settingsMenuSpeedButton-1').should('exist');
    cy.dataCy('settingsMenuSpeedButton-2').should('exist');
    cy.dataCy('settingsMenuSpeedButton-3').should('exist');
    cy.dataCy('settingsMenuSpeedButton-4').should('exist');
    cy.dataCy('settingsMenuSpeedButton-5').should('exist');
    cy.dataCy('settingsMenuSpeedButton-6').should('exist');

    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(1));

    cy.dataCy('settingsMenuSpeedButton-0').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(0.25));

    cy.dataCy('settingsMenuSpeedButton-1').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(0.5));

    cy.dataCy('settingsMenuSpeedButton-2').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(1));

    cy.dataCy('settingsMenuSpeedButton-3').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(1.25));

    cy.dataCy('settingsMenuSpeedButton-4').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(1.5));

    cy.dataCy('settingsMenuSpeedButton-5').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(1.75));

    cy.dataCy('settingsMenuSpeedButton-6').trigger('click');
    cy.dataCy('HTMLVideoPlayer')
      .should('have.prop', 'playbackRate')
      .then((x) => expect(x).to.eq(2));

    cy.dataCy('settingsMenuHeaderButton').trigger('click');
    cy.dataCy('settingsMenuHeaderButton').trigger('click');
    cy.dataCy('settingsMenu').should('not.exist');
  });
});

export {};
