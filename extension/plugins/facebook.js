var Facebook = function() {

  /* Shortens a given URL.
   */
  var publishStatus = function(dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('fbtoken').then(function(token) {
        var message = escape(eval(dataObject.data));
        var token = token;
        // var token = "CAACEdEose0cBAD8DtZANtlyCgmviLLMh9A2XyilB1IyJYsqebJ7hLFBV8kZAnbmlpCBtdmBDLaQIbeywq9CCpM99BctPrZCyntmmZCjI7BuNZC6unA4jyuqlzaJgftZAHUZBYLE3wXaHdsjgVIBZBBmiYZBsMjEnNmAJxwCSqu9Q7V5QvuebrYdmH38vG2JYYuPcSxqvToafA3JDauYqqnrj99LeV3z0fNgcZD"
        var url = "https://graph.facebook.com/me/feed?" + "access_token=" + token + "&message=" + message;
        $.ajax({
          'type': 'POST',
          'url': url,
          'headers': {
            'Content-Type': 'application/json'
          },
          'dataType': 'json',
          'success': function(data) {
            var retVal = {
              'type': '"null"'
            };
            resolve(retVal);
          },
          'error': function(data, status) {
            // TODO: Error handling.
            console.log('Error: ' + status);
            reject({ 'type': 'null' });
          }
        });
      });
    });
  }

  return {
    getRecipes: function() {
      return [
        {
          'title': 'Publish Facebook status',
          'callback': publishStatus,
          'inputs': [
            {
              'type': '$ == "text"'
            }
          ],
          'output': {
            'type': '"null"'
          }
        }
      ];
    }
  };
};
