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
  var filteredItems;
  var selectedOptionIndex;
  var shown = false;
  
  function initialize () {
    dropdownItems = [];
    filteredItems = [];
    selectedOptionIndex = -1;
  }

  function populateDropdown(items) {
    $('.nimble-options').html('');
    _.each(items, function (item) {
      var $nimbleOption = $('<li>');
      $nimbleOption.html('<p>' + item.data + '</p>');
      $('.nimble-options').append($nimbleOption);
    })
  }

  function showNimbleBar () {
    initialize();
    window.nimbleBar.addClass('visible animated bounceInUp');
    setTimeout(function (argument) {
      nimbleBar.removeClass('bounceInUp');
      $('.nimble-input').focus();
      $('.nimble-input').val('');
      this.nimble.getData(function (data) {
        dropdownItems = data;
        filteredItems = dropdownItems;
        populateDropdown(dropdownItems);
      });
    }, 750);
  }

  function hideNimbleBar () {
    
    nimbleBar.addClass('bounceOutDown');
    setTimeout(function () {
      $('.nimble-input').blur();
      $('.nimble-input').val('');
      $('.nimble-options').html('');
      nimbleBar.removeClass('visible animated bounceOutDown');
    }, 750);
  }

  function bindInputDropdown () {  
    $('.nimble-input').on('keyup', function (ev) {
      if (ev.keyCode == 38 || ev.keyCode == 40) {
        return;
      }
      var input = $('.nimble-input').val();
      filteredItems = _.filter(dropdownItems, function (text) {
        return text.data.toLowerCase().indexOf(input) > -1;
      });
      if (filteredItems.length > 0) {
        populateDropdown(filteredItems);
      } else {
        populateDropdown([{
          data: 'No results found'
        }]);
      }
      selectedOptionIndex = -1;
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

  function highlightSelectedItem (index) {
    var options = document.querySelectorAll('.nimble-options li');
    $(options).removeClass('selected');
    $(options[index]).addClass('selected');
  }

  Mousetrap.bind('down', function (e) {
    if (shown) {
      selectedOptionIndex++;
      highlightSelectedItem(selectedOptionIndex);
    }
  });

  Mousetrap.bind('up', function (e) {
    if (shown) {
      selectedOptionIndex--;
      selectedOptionIndex = Math.max(selectedOptionIndex, 0);
      highlightSelectedItem(selectedOptionIndex);
    }
  });

  Mousetrap.bind('tab', function (e) {
    console.log('Nimble triggered');

    // This is a data object before it enters the current pipeline stage.
    // var testObj = filteredItems[selectedOptionIndex];
    var testObj = {
      'type': '"url"',
      'data': '"http://www.qxcg.net/"',
      'length': 20,
      'protocol': '"http"',
      'extras': {
        'telno': '+14255022351'
      }
    };

    // Matching the object against the recipe manifest yields a list of
    // compatible recipes that may be applied.
    var matchResults = router.matchObject(testObj);
    console.log(matchResults);
    
    // Via some UI, the user decides on a recipe to apply.
    var shorten = matchResults[0];
    var sms = matchResults[1];

    // We apply the recipe to the data object.
    // In reality, the resultant object should be passed back to the pipeline,
    // until we reach the last stage, at which point, the result is discarded.
    shorten.callback(testObj).then(function(result) {
      result.telno = '+14255022351';
      sms.callback(result).then(function(result) {
        console.log(result);
        console.log('done!');
      })
    });
  });

  initialize();

  var plugins = [
    'Googl',
    'PluginFacebook',
    'PluginDropbox',
    'Twilio'
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
