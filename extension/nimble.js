(function () {
  
  var nimbleBar = $('<div></div>', {id: 'nimble-bar'});
  nimbleBar.append($('<input>', {class: 'nimble-input mousetrap'}));
  $('body').append(nimbleBar);
  window.nimbleBar = nimbleBar;

  var shown = false;

  function showNimbleBar () {

    nimbleBar.addClass('visible animated bounceInUp');
    shown = true;
    setTimeout(function (argument) {
      nimbleBar.removeClass('bounceInUp');
      $('.nimble-input').focus();
      $('.nimble-input').val('');
    }, 750);
  }

  function hideNimbleBar () {
    
    nimbleBar.addClass('bounceOutDown');
    shown = false;
    setTimeout(function () {
      $('.nimble-input').blur();
      $('.nimble-input').val('');
      nimbleBar.removeClass('visible animated bounceOutDown');
    }, 750);
  }

  Mousetrap.bind('n', function(e) {
    e.preventDefault();
    shown ? hideNimbleBar() : showNimbleBar();
  });

  Mousetrap.bind('esc', function(e) {
    hideNimbleBar();
  });

  console.log('Nimble loaded');
})();
