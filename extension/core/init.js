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
  var newObjectRep = function(type, name, dataSerialization, data) {
    return {
      "type": type,
      "name": name,
      "data-serialization": dataSerialization,
      "data": data,
    };
  };

  var getElementsByXpath = function(path) {
    return document.evalue(path, document, null, XPathResult.ANY_TYPE, null);
  };

  return {
    dataDefaultsURL: chrome.extension.getURL('/defaults.json'),
    getData: function (callback) {
      var dataDefaultsPromise = $.getJSON(this.dataDefaultsURL, function (dataDefaults) {
        var result = [];

        var textSelection = window.getSelection();
        if (textSelection.type === "Range") {
          var text = textSelection.getRangeAt(0).toString();
          result.push(newObjectRep('text', 'Selected text', 'text', text));
        }

        if (document.URL in dataDefaults) {
          for (var i = 0; i < dataDefaults[document.URL].length; i++) {
            var spec = dataDefaults[document.URL][i];
            var elem = $(spec.selector).get(0);
            if (elem !== undefined) {
              result.push(elem);
            }
            // TODO: Returning a list
          }
        }
        result.push(newObjectRep('text', 'Current URL', 'text', document.URL));
        callback(result);
      });

      dataDefaultsPromise.fail(function (d, textStatus, error) {
        // TODO
      });
    },
  };
});
