(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.nimble = factory();
  }
})(this, function () {
  'use strict';

  // Helper functions
  var newObjectRep = function(type, title, dataSerialization, data) {
    return {
      "type": type,
      "title": title,
      "data-serialization": dataSerialization,
      "data": data,
    };
  };

  var getElementsByXpath = function(path) {
    return document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
  };

  return {
    dataDefaultsURL: chrome.extension.getURL('/defaults.json'),
    getData: function (callback) {
      var nimble = this;

      var dataDefaultsPromise = $.getJSON(this.dataDefaultsURL, function (dataDefaults) {
        var result = [];

        // Get text selection if it exists
        var textSelection = window.getSelection();
        if (textSelection.type === "Range") {
          var text = textSelection.getRangeAt(0).toString();
          var data = nimble.objectFactories.newText(text, {'title': 'Selected Text'});
          result.push(data);
        }

        // Get domain specific data defaults
        if (document.URL in dataDefaults) {
          for (var i = 0; i < dataDefaults[document.URL].length; i++) {
            var spec = dataDefaults[document.URL][i];
            var xpathResult = getElementsByXpath(spec.selector);
            for (var elem = xpathResult.iterateNext(); elem !== null; elem = xpathResult.iterateNext()) {
              var data = nimble.objectFactories[spec.objectFactory](elem, {'title': spec.title});
              result.push(data);
            }
            // TODO: Returning a list
          }
        }

        // Get current URL
        result.push(nimble.objectFactories.newURL(document.URL));
        callback(result);
      });

      dataDefaultsPromise.fail(function (d, textStatus, error) {
        // TODO
        console.log('json failed');
      });
    },
    chainPromise: function (pluginList, data, query) {
      if (pluginList.length === 0) return;
      var p = pluginList[0];
      p.callback(data, query).then(function (result) {
        var sliced = pluginList.slice(1);
        var headQueryString = sliced[0] !== undefined ? sliced[0].queryString : '';
        nimble.chainPromise(sliced, result, headQueryString);
      });
    },

  };
});
