var Twilio = function() {
  var that = this;

  var queryRegex = /Twilio(: *(\+[0-9]+))?/i;

  var api_account = 'AC89f5d0cf0b772464c202dfe604f0b64f';
  var api_secret = '87e5302709aad6ab49de505cd29c244c';
  var api_from = '+13603287227';

  var sendMessage = function(dataObject, queryString) {
    var parseResult = queryRegex.exec(queryString);
    if (!parseResult[2]) {
      console.log('Error: Twilio object didn\'t contain \'telno\'.');
      return;
    }
    var telNo = parseResult[2];
    var endpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + 
                    api_account + '/Messages.json';
    var formData = {
      'To': telNo,
      'From': api_from,
      'Body': eval(dataObject.data)
    };

    return new Promise(function(resolve, reject) {
      $.ajax({
        'type': 'POST',
        'url': endpoint,
        'data': formData,
        'username': api_account,
        'password': api_secret,
        'dataType': 'json',
        'success': function(data) {
          resolve(that.nimble.objectFactories.newText(formData.Body,
            dataObject.meta));
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
            'title': 'Twilio',
            'value': 'Send SMS to a number',
            'icon': 'plugins/twilio-icon.png'
          },
          'queryPattern': queryRegex,
          'callback': sendMessage,
          'inputs': [
            {
              'type': '($ == "text" || $ == "url")',
              'length': '$ <= 160'
            }
          ],
          'output': {
            'type': '"text"',
            'length': '160'
          },
          'extractQueryString': true
        }
      ];
    }
  };
};
