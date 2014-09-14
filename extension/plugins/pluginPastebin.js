var Pastebin = function() {
  var that = this;

  var apiEndpoint = 'http://pastebin.com/api/api_post.php';
  var apiKey = '3a4ec35e9d8d0ec368a70ef0cbedbaee';
  var apiOption = 'paste';

  var submitPaste = function(dataObject) {
    var pasteBody = eval(dataObject.data);
    var formData = {
      'api_dev_key': apiKey,
      'api_option': apiOption,
      'api_paste_code': pasteBody
    };
    return new Promise(function(resolve, reject) {
      $.ajax({
        'type': 'POST',
        'url': apiEndpoint,
        'data': formData,
        'dataType': 'text',
        'success': function(data) {
          var candidateUrl = data;
          if (data.indexOf('http') == 0) {  // data.startsWith('http')
            resolve(that.nimble.objectFactories.newUrl(data, dataObject.meta));
          } else {
            // API error.
            console.log('Pastebin error: ' + candidateUrl);
            reject(that.nimble.objectFactories.newNull());
          }
        },
        'error': function(data, status) {
          // Request error.
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
            'title': 'Pastebin',
            'value': 'Create a public paste',
            'icon': 'plugins/pastebin-icon.png'
          },
          'queryPattern': /pastebin/,
          'callback': submitPaste,
          'inputs': [
            {
              'type': '($ == "text" || $ == "url")'
            }
          ],
          'output': {
            'type': '"url"',
            'length': '30',
            'protocol': 'http'
          }
        }
      ];
    }
  };
};
