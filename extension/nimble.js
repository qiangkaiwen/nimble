(function () {
  
  var nimbleBar = $('<div></div>', {id: 'nimble-bar'});
  nimbleBar.append($('<input>', {class: 'nimble-input mousetrap'}));
  $('body').append(nimbleBar);
  window.nimbleBar = nimbleBar;

  var shown = false;

  function showNimbleBar () {
    nimbleBar.addClass('visible');
    $('.nimble-input').focus();
    $('.nimble-input').val('');
    shown = true;
  }

  function hideNimbleBar () {
    nimbleBar.removeClass('visible');
    $('.nimble-input').val('');
    shown = false;
  }

  Mousetrap.bind('shift+n', function(e) {
    e.preventDefault();
    shown ? hideNimbleBar() : showNimbleBar();
  });

  Mousetrap.bind('esc', function(e) {
    hideNimbleBar();
  });

  console.log('Nimble loaded');
})();
