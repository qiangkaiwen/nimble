(function() {
  if ('nimble' in this) {
    this.nimble['utils'] = {
      escapeString: function(data) {
        var escaped = data.replace(/"/g, '\\"');
        var encapsulated = '"' + escaped + '"';
        return encapsulated;
      },
      dataURLToBlob: function(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
          var parts = dataURL.split(',');
          var contentType = parts[0].split(':')[1];
          var raw = decodeURIComponent(parts[1]);

          return new Blob([raw], {type: contentType});
        }

        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;

        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
      },
      blobFromImage: function(img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL();
        canvas = null;
        return this.dataURLToBlob(dataURL);
      },
      blobFromURL: function(url) {
        var self = this;
        return new Promise(function(resolve, reject) {
          var img = new Image();
          img.onload = function() {
            var res = self.blobFromImage(img);
            resolve(res);
          }
          img.src = url;
        });
      },
      imageTypeFromBlob: function(blob) {
        return blob.type.substring(6);
      }
    };
  }
})();
