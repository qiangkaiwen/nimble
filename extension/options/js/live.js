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
    location.href = 'http://yangshun.im/nimble/extension/options/';
  };

  var hashToken = location.hash.substring(1);
  if (hashToken) {
    var params = unpackParamString(location.hash.substring(1));
    storeToken('livetoken', params.access_token);
  }
 redirectMain();
})();
