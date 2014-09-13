var Router = function(recipes) {

  var _route = function(dataObject) {
    var fn = eval(recipes['TestRecipe'].process);
    return fn;
  };

  return {
    route: function(dataObject) {
      return _route(dataObject);
    }
  };
};
