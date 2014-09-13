var Googl = function() {

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
          var retVal = {
            'type': '"url"',
            'data-serialization': '"text"',
            'data': '"' + data.id + '"'
          };
          resolve(retVal);
        },
        'error': function(data, status) {
          // TODO: Error handling.
          console.log('Error: ' + status);
          reject({
            'type': 'null'
          });
        }
      });
    });
  };

  return {
    getRecipes: function() {
      return [
        {
          'title': 'Shorten URL (goo.gl)',
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
