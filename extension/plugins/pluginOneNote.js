var OneNote = function () {
  var that = this;
  var headString = '<!DOCTYPE html><html><head><title>Nimble Note</title><meta name="created" content="2013-06-11T12:45:00.000-8:00"/></head><body><p>';

  var footerString = '</p></body></html>';

  var postHTML = function (dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('livetoken').then(function(token) {
        var message = headString + eval(dataObject.data) + footerString;
        var token = token;
        var url = "https://www.onenote.com/api/v1.0/pages";
        $.ajax({
          'type': 'POST',
          'url': url,
          'headers': {
            'Content-Type': 'Text/html',
            'Authorization': 'Bearer ' + token
          },
          'data': message,
          'dataType': 'json',
          'success': function(data) {
            console.log(dataObject.data);
              resolve(that.nimble.objectFactories.newText(eval(dataObject.data), dataObject.meta));
          },
          'error': function(data, status) {
            // TODO: Error handling.
            console.log('Error: ' + status);
            reject(that.nimble.objectFactories.newNull());
          }
        });
      });
    });
  };

  return {
    getRecipes: function() {
      return [
        {
          'meta': {
            'type': 'recipe',
            'title': 'OneNote',
            'value': 'Post in OneNote',
            'icon': 'plugins/onenote-icon.png'
          },
          'queryPattern': /post in onenote/,
          'callback': postHTML,
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