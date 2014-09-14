var PluginDropbox = function() {
  var that = this;
  var saveToPublic = function(dataObject) {
    return new Promise(function(resolve, reject) {
      var buffer = null;
      that.nimble.utils.blobFromURL(dataObject.data).then(function(blob) {
        buffer = blob;
        return Storage.getInstance().get('dropboxtoken');
      }).then(function(token) {
        var token = token;
        var client = new Dropbox.Client({key: '1c4z4rgltpwbqz5', secret: 'ekauyhaewgj8d2n', token: token});
        var fileType = that.nimble.utils.imageTypeFromBlob(buffer);
        var path = dataObject.meta.value + '.' + fileType;
        client.writeFile(path, buffer, {}, function(error, stat) {
          if (null != error) {
            console.log("Dropbox Error = " + error);
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
