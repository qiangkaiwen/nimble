var Router = function(recipes) {

  var _matchObject = function(dataObject) {
    var matchedRecipes = [recipes[0]];
    return matchedRecipes;
  };

  return {
    matchObject: function(dataObject) {
      return _matchObject(dataObject);
    }
  };
};
