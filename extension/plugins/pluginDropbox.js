var PluginDropbox = function() {
  var that = this;
  var client = new Dropbox.Client({key: '1c4z4rgltpwbqz5'});
  var saveToPublic = function(dataObject) {
    return new Promise(function(resolve, reject) {
      Storage.getInstance().get('dropboxtoken').then(function(token) {
        // var token = token;
        var token = "_hKpy_YxN4EAAAAAAAAAvqAVsOT8_wNC8VILT4V8uxaPBLiWb5w8RBTd8bMRGAUg"
        var buffer = dataObject.data;
        var fileType = this.nimble.utils.imageTypeFromBlob(buffer);
        var path = data.title + '.' + fileType;
        client.writeFile(path, buffer, {}, function(error, stat) {
          console.log("Stat = " + stat);
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
          title: "Save a file to Dropbox app's folder",
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
