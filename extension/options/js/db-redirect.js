(function() {
  var unpackParamString = function(paramString) {
    var keyPairs = paramString.split('&');
    var params = {};
    for (var i = 0; i < keyPairs.length; i++) {
      var pair = keyPairs[i];
      var tokens = pair.split('=');
      params[tokens[0]] = tokens[1];
    }
    return params;
  };

  var storeToken = function(key, value) {
    localStorage.setItem(key, value);
  };

  var redirectMain = function() {
    location.href = 'http://localhost:8000';
  };

  var hashToken = location.hash.substring(1);
  if (hashToken) {
    console.log('Found a hash.')
    var params = unpackParamString(location.hash.substring(1));
    if (params.access_token) {
      console.log('Dropbox Auth token detected.');
      storeToken('dropboxtoken', params.access_token);
    } else {
      console.log('Dropbox Auth token not found.');
    }
  } else {
    console.log('Hash not found.');
  }
 redirectMain();
})();
