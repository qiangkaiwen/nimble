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
        // console.log(img.width, img.height);
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL();
        console.log(dataURL);
        return this.dataURLToBlob(dataURL);
      },
      blobFromURL: function(url) {
        return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(){
            if (this.readyState == 4) {
              if (this.status == 200) {
                console.log(this.response, typeof this.response);
                resolve(this.response);
              } else {
                reject({'Error': 'Cannot get blob from url'});
              }
            }
          }
          xhr.open('GET', url);
          xhr.responseType = 'blob';
          xhr.send();
        });
      },
      imageTypeFromBlob: function(blob) {
        return blob.type.substring(6);
      }
    };
  }
})();
