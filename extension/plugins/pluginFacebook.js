var PluginFacebook = function() {
  var that = this;
  /* Shortens a given URL.
   */
  var publishStatus = function(dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('fbtoken').then(function(token) {
        var message = escape(eval(dataObject.data));
        // var token = token;
        var token = "CAACEdEose0cBAECe6s08tTWp3fk1XXgT5eZAUtSrK3yu5B1rqM5LYhDLDIZCs4sCZC1SKYgsZAyJaERt3Rzc7HesBbPVfBUEfoqBu7SncbaXRtpE3I6dMGN60nNSUj76wXH0LquYoO6ZB4JbkjBiAqKXIFIQLRxMNmv0pUJykWY1bDWgXMqgRuqhEq26OirvRgyZCQj3k5CfietYApsuIXxlkM2UiH3wEZD"
        var url = "https://graph.facebook.com/me/feed?" + "access_token=" + token + "&message=" + message;
        $.ajax({
          'type': 'POST',
          'url': url,
          'headers': {
            'Content-Type': 'application/json'
          },
          'dataType': 'json',
          'success': function(data) {
            resolve(that.nimble.objectFactories.newText(dataObject, dataObject.meta));
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
            'title': 'Publish Facebook status',
            'icon': 'plugins/facebook-icon.png'
          },
          'queryPattern': /publish facebook status/,
          'callback': publishStatus,
          'inputs': [
            {
              'type': '$ == "text"'
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
