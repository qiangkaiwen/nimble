var Router = function(recipes) {

  var _matches = function(value) {
    for (var i = 0; i < value.inputs.length; i++) {
      var supportedType = value.inputs[i];

      // TODO: RegEx matching.
      if (this.type == supportedType.type) {
        return true;
      }
    }
    return false;
  };

  var _matchObject = function(dataObject) {
    var matchedRecipes = recipes.filter(_matches, dataObject);
    return matchedRecipes;
  };

  return {
    matchObject: function(dataObject) {
      return _matchObject(dataObject);
    }
  };
};
