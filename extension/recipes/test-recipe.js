var TestRecipe = function() {

  var _process = function(dataObject) {
    dataObject = (dataObject || {});
    dataObject['ctr'] = (dataObject['ctr'] || 0);
    dataObject['ctr'] += 1;
    return dataObject;
  };

  return {
    process: function(dataObject) {
      return _process(dataObject);
    }
  };
};
