var PluginDropbox = function() {
  var that = this;
  var saveToPublic = function(dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('dropboxtoken').then(function(token) {
        var token = token;
        var client = new Dropbox.Client({key: '1c4z4rgltpwbqz5', secret: 'ekauyhaewgj8d2n', token: token});
        var buffer = dataObject.data;
        var fileType = that.nimble.utils.imageTypeFromBlob(buffer);
        var path = eval(dataObject.title) + '.' + fileType;
        client.writeFile(path, buffer, {}, function(error, stat) {
          if (null != error) {
            console.log("Error = " + error);
            reject(that.nimble.objectFactories.newNull());
          } else {
            resolve(that.nimble.objectFactories.newImage(dataObject, dataObject.meta));
          }
        });
      });
    });
  }

  return {
    getRecipes: function() {
      return [
        {
          'meta': {
            'type': 'recipe',
            'title': 'Dropbox',
            'value': 'Save image to Dropbox',
            'icon': 'plugins/dropbox-icon.png'
          },
          'queryPattern': /save to dropbox/,
          'callback': saveToPublic,
          'inputs': [
            {
              'type': '$ == "image"'
            }
          ],
          'output': {
            'type': '"image"'
          }
        }
      ];
    }
  };
};
