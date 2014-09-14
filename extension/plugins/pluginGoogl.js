var Googl = function() {
  var that = this;

  /* Shortens a given URL.
   */
  var shorten = function(dataObject) {
    var reqBody = {
      'longUrl': eval(dataObject.data)
    };
    return new Promise(function(resolve, reject) {
      $.ajax({
        'type': 'POST',
        'url': 'https://www.googleapis.com/urlshortener/v1/url',
        'data': JSON.stringify(reqBody),
        'headers': {
          'Content-Type': 'application/json'
        },
        'dataType': 'json',
        'success': function(data) {
          var retVal = that.nimble.objectFactories.newUrl(data.id, dataObject.meta);
          resolve(retVal);
        },
        'error': function(data, status) {
          // TODO: Error handling.
          console.log('Error: ' + status);
          reject(that.nimble.objectFactories.newNull());
        }
      });
    });
  };

  return {
    getRecipes: function() {
      return [
        {
          'meta': {
            'type': 'recipe',
            'title': 'Shorten URL via Googl',
            'icon': 'plugins/google-icon.png'
          },
          'queryPattern': /shorten/,
          'callback': shorten,
          'inputs': [
            {
              'type': '$ == "url"',
              'protocol': '["http", "https"].indexOf($) != -1'
            }
          ],
          'output': {
            'type': '"url"',
            'length': '20',
            'protocol': '"http"'
          }
        }
      ];
    }
  };
};
