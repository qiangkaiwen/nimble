(function () {
  
  var dropdownItems;
  var filteredItems;
  var selectedOptionIndex;
  var shown = false;
  var pipeline;

  var template = chrome.extension.getURL('bar.html');
  $.ajax({
    url: template,
    async: false,
    success: function (html) {
      var nimbleBar = $(html);
      $('body').append(nimbleBar);
      window.nimbleBar = nimbleBar;
      bindInputDropdown();

      $('.nimble-options').on('click', 'li', function (e) {
        var index = $('.nimble-options li').index($(this));
        selectedOptionIndex = index;
        console.log(selectedOptionIndex);
        selectOption();
        return false;
      });
    }
  });

  function initialize () {
    dropdownItems = [];
    filteredItems = [];
    selectedOptionIndex = -1;
    pipeline = [];
    $('.nimble-pipeline').html('');
    $('.nimble-options').html('');
  }

  function populateDropdown (items) {
    $('.nimble-options').html('');
    selectedOptionIndex = -1;
    _.each(items, function (item) {
      var $nimbleOption = $('<li>');
      var $img;
      var $p = $('<p>');
      if (item.meta.type === 'recipe') {
        console.log(item.meta.icon)
        $img = $('<img>', {
          src: chrome.extension.getURL(item.meta.icon), 
          class: 'recipe-icon'
        });
        $p.append($img);
      }
      $p.append('<span class="nimble-title">' + item.meta.title + '</span>');
      $p.append('<span class="nimble-value">' + item.meta.value + '</span>');
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
        return text.queryPattern.test(input.toLowerCase()) || 
                [text.meta.title, text.meta.value].join(' ').toLowerCase().indexOf(input) > -1;
      });
      if (filteredItems.length > 0) {
        populateDropdown(filteredItems);
        selectedOptionIndex = 0;
        highlightSelectedItem(selectedOptionIndex);
      } else {
        populateDropdown([{
          meta: {
            icon: 'nil.png',
            title: 'No results found',
            value: 'Try another query'
          }
        }]);
        selectedOptionIndex = -1;
      }
    });
  }

  // A hack to fetch tokens from localStorage to chrome.storage.local
  function fetchTokens() {
    _.each(['fbtoken', 'dropboxtoken'], function(key) {
      var token = localStorage.getItem(key);
      if (token != null) {
        Storage.getInstance().set(key, token);
      } 
      Storage.getInstance().get(key).then(function (value) {
        console.log(key + " " + value);
      })
    });
  }

  Mousetrap.bind('shift+z', function(e) {
    console.log('fbtoken', window.localStorage.getItem('fbtoken'));
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
    $(options[index]).get(0).scrollIntoView(false);
  }

  function updateInputQueryString () {
    var selectedItem = filteredItems[selectedOptionIndex];
    if (selectedItem && 'meta' in selectedItem && 'title' in selectedItem.meta) {
      var inputPrompt = selectedItem.extractQueryString !== undefined ? ': ' : '';
      var displayText = selectedItem.meta.title + inputPrompt;
      $('.nimble-input').val(displayText);
    }
  }

  Mousetrap.bind('down', function (e) {
    if (shown) {
      e.preventDefault();
      selectedOptionIndex++;
      highlightSelectedItem(selectedOptionIndex);
      updateInputQueryString();
    }
  });

  Mousetrap.bind('up', function (e) {
    if (shown) {
      e.preventDefault();
      selectedOptionIndex--;
      selectedOptionIndex = Math.max(selectedOptionIndex, 0);
      highlightSelectedItem(selectedOptionIndex);
      updateInputQueryString();
    }
  });

  function selectOption () {
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
    console.log(selectedObj);
    if (selectedObj.meta.icon) {
      $content = $('<img>', {
        src: chrome.extension.getURL(selectedObj.meta.icon), 
        class: 'recipe-icon-pipeline'
      });
    } else {
      $content = $('<span>', {class: 'pipeline-item'});
      $content.html(selectedObj.meta.title);
    }
    $nimblePipelineItem.append($content);

    $('.nimble-pipeline').append($nimblePipelineItem);

    var filterCriteria = selectedObj.output !== undefined ?
      selectedObj.output : selectedObj;
    console.log(filterCriteria);
    var matchResults = router.matchObject(filterCriteria);
    console.log(matchResults);
    dropdownItems = matchResults;
    filteredItems = dropdownItems;
    populateDropdown(dropdownItems);
  }

  Mousetrap.bind('tab', function (e) {
    e.preventDefault();
    selectOption();
  });

  Mousetrap.bind('enter', function (e) {
    e.preventDefault();
    var obj = pipeline[0];
    var sliced = pipeline.slice(1);
    console.log(sliced);
    this.nimble.chainPromise(sliced, obj, sliced[0].queryString);
    hideNimbleBar();
    shown = false;
  });

  initialize();

  var plugins = [
    'Googl',
    'PluginFacebook',
    'PluginDropbox',
    'Twilio',
    'Pastebin',
    'Browser'
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
  fetchTokens();
})();
