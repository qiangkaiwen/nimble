// (function () {
//   var defaultsMappingURL = chrome.extension.getURL('/extension/defaults.json');
//   return {
//     getData: function (callback) {
//       $.getJSON(defaultMappingURL);
//     },
//   };

//   var textSelection = window.getSelection();
//   var selectedText = (textSelection.type === "Range") ? textSelection.getRangeAt(0).toString() : null;
//   var currentURL = document.URL;

//   // TODO: load current plugin and check for default selectable elements

// })


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
      console.log(this.dataDefaultsURL);
      var dataDefaultsPromise = $.getJSON(this.dataDefaultsURL, function (dataDefaults) {
        console.log(dataDefaults);
        var result = [];

        var textSelection = window.getSelection();
        if (textSelection.type === "Range") {
          result.push(textSelection.getRangeAt(0).toString());
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
