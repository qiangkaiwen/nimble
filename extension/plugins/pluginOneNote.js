var = OneDrive = function () {
	var headString = '
<!DOCTYPE html>
<html>
  <head>
    <title>Nimble Note</title>
    <meta name="created" content="2013-06-11T12:45:00.000-8:00"/>
  </head>
  <body>
    <p>';

	var footerString = '</p>
  </body>
</html>
	';

	var postHTML = function (dataObject) {
		var doc = headString + dataObject + footerString;

	};

	return {
		'callback': postHTML,
	};
};

var OneNote = function () {
  var headString = '
<!DOCTYPE html>
<html>
  <head>
    <title>Nimble Note</title>
    <meta name="created" content="2013-06-11T12:45:00.000-8:00"/>
  </head>
  <body>
    <p>';

  var footerString = '</p>
  </body>
</html>
  ';

  var postHTML = function (dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('livetoken').then(function(token) {
        var message = headString + escape(eval(dataObject.data)) + footerString;
        var token = token;
        var url = "https://www.onenote.com/api/v1.0/pages";
        $.ajax({
          'type': 'POST',
          'url': url,
          'headers': {
            'Content-Type': 'Text/html',
            'Authorization': token
          },
          'data': message,
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
  };

  return {
    'callback': postHTML,
  };
};