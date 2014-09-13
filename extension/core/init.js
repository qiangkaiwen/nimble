(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.nimble = factory();
  }
})(this, function () {
  'use strict';

  return {
    dataDefaultsURL: chrome.extension.getURL('/defaults.json'),
    getData: function (callback) {
      var dataDefaultsPromise = $.getJSON(this.dataDefaultsURL, function (dataDefaults) {
        var result = [];

        var textSelection = window.getSelection();
        if (textSelection.type === "Range") {
          result.push(textSelection.getRangeAt(0).toString());
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
        result.push(document.URL);
        callback(result);
      });

      dataDefaultsPromise.fail(function (d, textStatus, error) {
        // TODO
      });
    },
  };
});
