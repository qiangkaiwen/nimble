(function () {
  Mousetrap.bind('shift+n', function(e) {
    console.log('Nimble triggered');

    // This is a data object before it enters the current pipeline stage.
    var testObj = {};
    
    // Matching the object against the recipe manifest yields a list of
    // compatible recipes that may be applied.
    var matchResults = router.matchObject(testObj);
    
    // Via some UI, the user decides on a recipe to apply.
    var selectedMatch = matchResults[0];

    // We apply the recipe to the data object.
    // In reality, the resultant object should be passed back to the pipeline,
    // until we reach the last stage, at which point, the result is discarded.
    var execResult = selectedMatch.ref.applyTo(testObj);
    console.log(execResult);
  });

  var recipes = [
    {
      'initCallback': 'TestRecipe()',
    }
  ];

  /* Creates instances of recipe workers for each entry in a recipe manifest.
   */
  var initRecipes = function(recipes) {
    for (var i = 0; i < recipes.length; i++) {
      recipes[i].ref = eval(recipes[i].initCallback);
    }
  };

  

  initRecipes(recipes);
  var router = Router(recipes);
  console.log('Nimble finish loading');
})();
