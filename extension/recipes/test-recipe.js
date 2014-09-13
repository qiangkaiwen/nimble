var TestRecipe = function() {

  var _applyTo = function(dataObject) {
    dataObject = (dataObject || {});
    dataObject['ctr'] = (dataObject['ctr'] || 0);
    dataObject['ctr'] += 1;
    return dataObject;
  };

  return {
    applyTo: function(dataObject) {
      return _applyTo(dataObject);
    }
  };
};
