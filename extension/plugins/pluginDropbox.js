var PluginDropbox = function() {
  var that = this;
  var saveToPublic = function(dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('dropboxtoken').then(function(token) {
        // var token = token;
        var token = "_hKpy_YxN4EAAAAAAAAAwfyJfmfCx7NR9GM8tCNh1xL16CTq9qBux-LYW1vnmv_V"
        var client = new Dropbox.Client({key: '1c4z4rgltpwbqz5', secret: 'ekauyhaewgj8d2n', token: token});
        var buffer = dataObject.data;
        var fileType = that.nimble.utils.imageTypeFromBlob(buffer);
        var path = eval(dataObject.title) + '.' + fileType;
        client.writeFile(path, buffer, {}, function(error, stat) {
          if (null != error) {
            console.log("Error = " + error);  
            reject(that.nimble.objectFactories.newNull());
          } else {
            resolve(that.nimble.objectFactories.newNull());
          }
        });
      });
    });
  }

  return {
    getRecipes: function() {
      return [
        {
          'extras': {
            'title': 'Save to Dropbox'
          },
          'queryPattern': /save to dropbox/,
          callback: saveToPublic,
          inputs: [
            {
              'type': '$ == "image"'
            }
          ],
          output: {
            'type': '"null"'
          }
        }
      ];
    }
  };
};
