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

  Mousetrap.bind('e', function(e) {
    console.log('Nimble triggered');

    // This is a data object before it enters the current pipeline stage.
    var testObj = {
      'type': '"url"',
      'data': '"http://www.google.com"',

      'protocol': '"http"'
    };
    
    // Matching the object against the recipe manifest yields a list of
    // compatible recipes that may be applied.
    var matchResults = router.matchObject(testObj);
    console.log(matchResults);
    
    // Via some UI, the user decides on a recipe to apply.
    var selectedMatch = matchResults[0];

    // We apply the recipe to the data object.
    // In reality, the resultant object should be passed back to the pipeline,
    // until we reach the last stage, at which point, the result is discarded.
    selectedMatch.callback(testObj).then(function(result) {
      console.log(result);
    });
  });

  var plugins = [
    'Googl',
    'PluginFacebook',
    'PluginDropbox'
  ];

  /* Creates instances of recipe workers for each entry in a recipe manifest.
   */
  var initPlugins = function(plugins) {
    var recipes = [];
    for (var i = 0; i < plugins.length; i++) {
      var construct = plugins[i] + '()';
      var pluginRef = eval(construct);
      var supportedRecipes = pluginRef.getRecipes();
      recipes = recipes.concat(supportedRecipes);
    }
    return recipes;
  };

  var recipes = initPlugins(plugins);
  var router = Router(recipes);
  console.log('Nimble finish loading');
})();
