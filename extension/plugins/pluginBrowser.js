var Browser = function() {
  var that = this;

  var gotoUrl = function(dataObject) {
    var targetUrl = eval(dataObject.data);
    return new Promise(function(resolve, reject) {
      window.location = targetUrl;
      resolve(that.nimble.objectFactories.newNull());
    });
  };

  return {
    'getRecipes': function() {
      return [
        {
          'meta': {
            'type': 'recipe',
            'title': 'Browser',
            'value': 'Goto URL',
            'icon': 'plugins/chrome-icon.png'
          },
          'queryPattern': /goto url/,
          'callback': gotoUrl,
          'inputs': [
            {
              'type': '$ == "url"'
            }
          ],
          'output': {
            'type': '"null"'
          }
        }
      ]
    }
  };
};
