var Router = function(recipes) {

  var buildConstraintExpression = function(predicate, value) {
    var surroundedValue = '(' + value + ')';
    var unpacked = predicate.replace('$', surroundedValue);
    return unpacked;
  };

  var testConstraint = function(predicate, value) {
    var expression = buildConstraintExpression(predicate, value);
    var result = eval(expression);
    return !!result;
  };

  var matchesInputFilter = function(inputFilter, dataObject) {
    for (var prop in inputFilter) {
      var predicateName = prop.toString();
      var predicate = inputFilter[predicateName];
      
      if (dataObject[predicateName] == undefined) {
        return false;
      }

      var value = dataObject[predicateName];
      var result = testConstraint(predicate, value);
      return result;
    }
  };

  /* Checks that a dataObject (this) matches any one of the input filters in
   * a recipe manifest.
   */
  var matches = function(value) {
    // Iterate through each input filter in the recipe manifest, checking if
    // the dataObject matches any input filter. Lazily return true if a match
    // is found.
    for (var i = 0; i < value.inputs.length; i++) {
      var inputFilter = value.inputs[i];
      if (matchesInputFilter(inputFilter, this)) {
        return true;
      }
    }
    return false;
  };

  var matchObject = function(dataObject) {
    var matchedRecipes = recipes.filter(matches, dataObject);
    return matchedRecipes;
  };

  return {
    matchObject: function(dataObject) {
      return matchObject(dataObject);
    }
  };
};
