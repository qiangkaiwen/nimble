var Twilio = function() {
  var that = this;

  var api_account = 'AC89f5d0cf0b772464c202dfe604f0b64f';
  var api_secret = '87e5302709aad6ab49de505cd29c244c';
  var api_from = '+13603287227';

  var sendMessage = function(dataObject) {
    if (dataObject.extras.telno === undefined) {
      console.log('Error: Twilio object didn\'t contain \'telno\'.');
      return;
    }

    var endpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + 
                    api_account + '/Messages.json';
    var formData = {
      'To': dataObject.extras.telno,
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
            dataObject.extras));
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
          'extras': {
            'title': 'SMS via Twilio'
          },
          'queryPattern': /sms via twilio( to)?( +?\+?[0-9]+)?/,
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
          'requires': [
            'telno'
          ]
        }
      ];
    }
  }
};
