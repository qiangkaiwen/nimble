var Storage = (function () {
  var instance;
  function init() {
    // Private methods and variables
    // function privateMethod(){
    //     console.log( "I am private" );
    // }
    var nimbleStorage = chrome.storage.local;

    return {
      // Public methods and variables
      set: function(key, value) {
        return new Promise(function(resolve, reject) {
          dataObj = {}
          dataObj[key] = value;
          nimbleStorage.set(dataObj, function() {
            resolve();
          });
        });
      },
      get: function(key) {
        return new Promise(function(resolve, reject) {
          nimbleStorage.get(key, function(result) {
            resolve(result[key]);
          });
        });
      }
    }
  }

  return {
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})();