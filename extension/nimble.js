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
    $('.nimble-pipeline').html('');
    $('.nimble-options').html('');
    console.log('initialize')
  }

  function populateDropdown (items) {
    $('.nimble-options').html('');
    selectedOptionIndex = -1;
    _.each(items, function (item) {
      var $nimbleOption = $('<li>');
      var $img;
      var $p = $('<p>');
      if (item.extras.type === 'recipe') {
        console.log(item.extras.icon)
        $img = $('<img>', {
          src: chrome.extension.getURL(item.extras.icon), 
          class: 'recipe-icon'
        });
        $p.append($img);
      }
      var content = item.extras.title;
      $p.append('<span>' + content + '</span>');
      $nimbleOption.html($p);
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
        selectedOptionIndex = 0;
        highlightSelectedItem(selectedOptionIndex);
      });
    }, 750);
  }

  function hideNimbleBar () {
    $('.nimble-pipeline').empty();
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
        return text.queryPattern.test(input.toLowerCase())
        || text.extras.title.toLowerCase().indexOf(input) > -1;
      });
      if (filteredItems.length > 0) {
        populateDropdown(filteredItems);
        selectedOptionIndex = 0;
        highlightSelectedItem(selectedOptionIndex);
      } else {
        populateDropdown([{
          extras: {
            title: 'No results found'
          }
        }]);
        selectedOptionIndex = -1;
      }
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

  function updateInputQueryString () {
    var selectedItem = filteredItems[selectedOptionIndex];
    if (selectedItem && 'extras' in selectedItem && 'title' in selectedItem.extras) {
      var inputPrompt = selectedItem.extractQueryString !== undefined ? ': ' : '';
      var displayText = selectedItem.extras.title + inputPrompt;
      $('.nimble-input').val(displayText);
    }
  }

  Mousetrap.bind('down', function (e) {
    if (shown) {
      selectedOptionIndex++;
      highlightSelectedItem(selectedOptionIndex);
      updateInputQueryString();
    }
  });

  Mousetrap.bind('up', function (e) {
    if (shown) {
      selectedOptionIndex--;
      selectedOptionIndex = Math.max(selectedOptionIndex, 0);
      highlightSelectedItem(selectedOptionIndex);
      updateInputQueryString();
    }
  });

  Mousetrap.bind('tab', function (e) {
    e.preventDefault();
    var selectedObj = $.extend(true, {}, filteredItems[selectedOptionIndex]);

    // Hack to inject required metadata into recipe.
    selectedObj.queryString = '';
    if (selectedObj.extractQueryString) {
      selectedObj.queryString = $('.nimble-input').val();
    }

    $('.nimble-input').val('');
    pipeline.push(selectedObj);
    var $nimblePipelineItem = $('<li>');
  
    var $content;    
    if (selectedObj.extras.icon) {
      $content = $('<img>', {
        src: chrome.extension.getURL(selectedObj.extras.icon), 
        class: 'recipe-icon-pipeline'
      });
    } else {
      $content = $('<span>', {class: 'pipeline-item'});
      $content.html(selectedObj.extras.title);
    }
    $nimblePipelineItem.append($content);

    $('.nimble-pipeline').append($nimblePipelineItem);

    var filterCriteria = selectedObj.output !== undefined ?
      selectedObj.output : selectedObj;
    var matchResults = router.matchObject(filterCriteria);
    dropdownItems = matchResults;
    filteredItems = dropdownItems;
    populateDropdown(dropdownItems);
  });

  Mousetrap.bind('enter', function (e) {
    e.preventDefault();
    var obj = pipeline[0];
    var sliced = pipeline.slice(1);
    this.nimble.chainPromise(sliced, obj, sliced[0].queryString);
    hideNimbleBar();
    shown = false;
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
  var initPlugins = function (plugins) {
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
