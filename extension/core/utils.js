(function() {
  if ('nimble' in this) {
    this.nimble['utils'] = {
      escapeString: function(data) {
        var escaped = data.replace(/"/g, '\\"');
        var encapsulated = '"' + escaped + '"';
        return encapsulated;
      },
      blobFromImage: function(img) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.drawImage(img, img.width, img.height);
        return canvas.toDataURL();
      }
    };
  }
})();
