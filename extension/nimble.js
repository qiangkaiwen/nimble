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
  var pipeline;
  
  function initialize () {
    dropdownItems = [];
    filteredItems = [];
    selectedOptionIndex = -1;
    pipeline = [];
  }

  function populateDropdown(items) {
    $('.nimble-options').html('');
    selectedOptionIndex = -1;
    _.each(items, function (item) {
      var $nimbleOption = $('<li>');
      var content = item.extras.title;
      $nimbleOption.html('<p>' + content + '</p>');
      $('.nimble-options').append($nimbleOption);
    })
  }

  function showNimbleBar () {
    initialize();
    window.nimbleBar.addClass('visible animated bounceInUp');
    setTimeout(function (argument) {
      nimbleBar.removeClass('bounceInUp');
      $('.nimble-input').val('');
      this.nimble.getData(function (data) {
        $('.nimble-input').focus();
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
        return text.extras.title.toLowerCase().indexOf(input) > -1;
      });
      if (filteredItems.length > 0) {
        populateDropdown(filteredItems);
      } else {
        populateDropdown([{
          extras: {
            title: 'No results found'
          }
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
      e.preventDefault();
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
    e.preventDefault();

    // This is a data object before it enters the current pipeline stage.
    var selectedObj = filteredItems[selectedOptionIndex];
    pipeline.push(selectedObj);
    var $nimblePipelineItem = $('<li>');
    var content = selectedObj.extras.title;
    if (content) {
      $nimblePipelineItem.html(content);
      $('.nimble-pipeline').append($nimblePipelineItem);
    }

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

    var selectedObj = filteredItems[selectedOptionIndex];
    pipeline.push(selectedObj);    

    // Matching the object against the recipe manifest yields a list of
    // compatible recipes that may be applied.
    var matchResults = router.matchObject(selectedObj);
    // var matchResults = router.matchObject(testObj);
    dropdownItems = matchResults;
    filteredItems = dropdownItems;
    populateDropdown(dropdownItems);
    // var pluginList = [matchResults[0], matchResults[1]];
    // this.nimble.chainPromise(pluginList, testObj);
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
