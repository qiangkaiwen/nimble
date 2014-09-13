(function () {
  
  var template = chrome.extension.getURL('bar.html');
  $.ajax({
    url: template,
    async: false,
    success: function (html) {
      var nimbleBar = $(html);
      $('body').append(nimbleBar);
      window.nimbleBar = nimbleBar;
      bindInputDropdown();
    }
  });

  var dropdownItems;

  var shown = false;

  function populateDropdown(items) {
    $('.nimble-options').html('');
    _.each(items, function (item) {
      var $nimbleOption = $('<li>');
      $nimbleOption.html('<p>' + item.data + '</p>');
      $('.nimble-options').append($nimbleOption);
    })
  }

  function showNimbleBar () {

    window.nimbleBar.addClass('visible animated bounceInUp');
    setTimeout(function (argument) {
      nimbleBar.removeClass('bounceInUp');
      $('.nimble-input').focus();
      $('.nimble-input').val('');
      this.nimble.getData(function (data) {
        dropdownItems = data;
        populateDropdown(dropdownItems);
      });
    }, 750);
  }

  function hideNimbleBar () {
    
    nimbleBar.addClass('bounceOutDown');
    setTimeout(function () {
      $('.nimble-input').blur();
      $('.nimble-input').val('');
      nimbleBar.removeClass('visible animated bounceOutDown');
    }, 750);
  }

  function bindInputDropdown () {  
    $('.nimble-input').on('keyup', function () {
      var input = $('.nimble-input').val();
      console.log(input);
      var filteredItems = _.filter(dropdownItems, function (text) {
        return text.data.toLowerCase().indexOf(input) > -1;
      });
      console.log(filteredItems);
      populateDropdown(filteredItems);
    });
  }

  Mousetrap.bind('n', function(e) {
    if (!shown) {
      e.preventDefault();
      showNimbleBar();
      shown = true;
    }
  });

  Mousetrap.bind('esc', function(e) {
    if (shown) {
      hideNimbleBar();
      shown = false;
    }
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
    'Facebook'
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
