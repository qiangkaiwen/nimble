(function() {
  if ('nimble' in this) {
    var that = this;
    this.nimble['objectFactories'] = {
      newNull: function() {
        return {
          'type': '"null"'
        };
      },
      newUrl: function(url, meta) {
        meta = (typeof meta !== 'undefined' ? meta : {});
        url = (url instanceof Node && url.nodeName === '#text') ? url.data : url;
        var parser = document.createElement('a');
        parser.href = url;
        var proto = parser.protocol.substring(0, parser.protocol.length - 1);
        return {
          'type': '"url"',
          'data': that.nimble.utils.escapeString(url),
          'meta': meta,
          'length': url.length,
          'protocol': that.nimble.utils.escapeString(proto),
          'queryPattern': new RegExp(meta.title.toLowerCase()),
        };
      },
      newText: function(text, meta) {
        meta = (typeof meta !== 'undefined' ? meta : {});
        text = ((text instanceof Node) && text.nodeName === '#text') ? text.data : text;
        var textObj = {
          'type': '"text"',
          'data': nimble.utils.escapeString(text),
          'meta': meta,
          'length': text.length,
          'queryPattern': new RegExp(meta.title.toLowerCase()),
        };
        return textObj;
      },
      newImage: function(domImage, meta) {
        meta = (typeof meta !== 'undefined' ? meta : {});
        var blob = that.nimble.utils.blobFromImage(domImage);
        return {
          'type': '"image"',
          'data': blob,
          'meta': meta,
          'width': domImage.width,
          'height': domImage.height,
          'queryPattern': new RegExp(meta.title.toLowerCase()),
        };
      }
    };
  }
})();
