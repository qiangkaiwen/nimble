var PluginFacebook = function() {
  var that = this;
  /* Shortens a given URL.
   */
  var publishStatus = function(dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('fbtoken').then(function(token) {
        var message = escape(eval(dataObject.data));
        var token = token;
        var url = "https://graph.facebook.com/me/feed?" + "access_token=" + token + "&message=" + message;
        $.ajax({
          'type': 'POST',
          'url': url,
          'headers': {
            'Content-Type': 'application/json'
          },
          'dataType': 'json',
          'success': function(data) {
              resolve(that.nimble.objectFactories.newText(dataObject.data, dataObject.meta));
          },
          'error': function(data, status) {
            // TODO: Error handling.
            console.log('Error: ' + status);
            reject(that.nimble.objectFactories.newNull());
          }
        });
      });
    });
  }

  return {
    getRecipes: function() {
      return [
        {
          'meta': {
            'type': 'recipe',
            'title': 'Facebook',
            'value': 'Share on timeline',
            'icon': 'plugins/facebook-icon.png'
          },
          'queryPattern': /publish facebook status/,
          'callback': publishStatus,
          'inputs': [
            {
              'type': '($ == "text" || $ == "url")'
            }
          ],
          'output': {
            'type': '"text"'
          }
        }
      ];
    }
  };
};
