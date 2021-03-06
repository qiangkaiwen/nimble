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
          var data = nimble.objectFactories.newText(text, {
            'title': 'Selected Text',
            'value': text
          });
          result.push(data);
        }

        // Get current URL
        result.push(nimble.objectFactories.newUrl(document.URL, {
          'title': 'Current URL',
          'value': document.URL
        }));

        // Get domain specific data defaults
        var hostname = document.location.hostname
        if (hostname in dataDefaults) {
          for (var i = 0; i < dataDefaults[hostname].length; i++) {
            var spec = dataDefaults[hostname][i];
            var xpathResult = getElementsByXpath(spec.selector);
            if (xpathResult.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE
              || xpathResult.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
              for (var elem = xpathResult.iterateNext(); elem !== null; elem = xpathResult.iterateNext()) {
                var value;
                if (spec.type === 'image') {
                  value = eval(elem).alt;
                } else {
                  value = eval(elem).data;
                }
                var data = nimble.objectFactories[spec.objectFactory](elem, {
                  'title': spec.title,
                  'value': value
                });
                result.push(data);
              }
            } else if (xpathResult.resultType === XPathResult.STRING_TYPE) {
              var elem = xpathResult.stringValue;
              var data = nimble.objectFactories[spec.objectFactory](elem, {
                'title': spec.title,
                'value': elem
              });
              result.push(data);
            }
            
            // TODO: Returning a list
          }
        }

        callback(result);
      });

      dataDefaultsPromise.fail(function (d, textStatus, error) {
        // TODO:
        console.log('json failed');
      });
    },
    chainPromise: function (pluginList, data, query) {
      if (pluginList.length === 0) {
        return;
      }
      var p = pluginList[0];
      p.callback(data, query).then(function (result) {
        var sliced = pluginList.slice(1);
        var headQueryString = sliced[0] !== undefined ? sliced[0].queryString : '';
        nimble.chainPromise(sliced, result, headQueryString);
      });
    },

  };
});
