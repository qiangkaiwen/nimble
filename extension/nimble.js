(function () {
  Mousetrap.bind('shift+n', function(e) {
    console.log('Nimble triggered');
    var routeResult = router.route({});
    console.log(routeResult());
  });
  var router = Router({
    'TestRecipe': TestRecipe()
  });
  var tr = TestRecipe();
  console.log('Nimble finish loading');
})();
