(function () {
  var textSelection = window.getSelection();
  var selectedText = (textSelection.type === "Range") ? textSelection.getRangeAt(0).toString() : null;
  var currentURL = document.URL;

  // TODO: load current plugin and check for default selectable elements

})();
