(function (win) {
  win.YOUTUBE = {
    shareYoutubeVideo: function (platform) {
      var command = platform.toLowerCase();
      console.log($('.share-facebook-icon'));
      switch (command) {
        case 'facebook':
          $('.share-facebook-icon').click();
          break;
        case 'twitter':
          $('.share-twitter-icon').click();
          break;
        case 'googleplus':
          $('.share-googleplus-icon').click();
          break;
        default:
          break;
      }
    }
  }
  
  setTimeout(function () {
    $('.action-panel-trigger')[1].click();  
    console.log('YouTube share box clicked');
    setTimeout(function () {
      $('input').blur();
    }, 1000);
  }, 1000);

  window.nimbleBar.on('keydown', function (event) {
    if (event.keyCode === 13) {
      console.log('YouTube nimblebar enter');
      YOUTUBE.shareYoutubeVideo($('.nimble-input').val());
    }
  });
  
})(window);
