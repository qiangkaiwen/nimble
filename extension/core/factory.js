(function() {
  if ('nimble' in this) {
    var that = this;
    this.nimble['objectFactories'] = {
      newNull: function() {
        return {
          'type': '"null"'
        };
      },
      newUrl: function(url, extras) {
        extras = (typeof extras !== 'undefined' ? extras : {});
        url = (url instanceof Node && url.nodeName === '#text') ? url.data : url;
        var parser = document.createElement('a');
        parser.href = url;
        var proto = parser.protocol.substring(0, parser.protocol.length - 1);
        return {
          'type': '"null"',
          'data': that.nimble.utils.escapeString(url),
          'extras': extras,
          'length': url.length,
          'protocol': that.nimble.utils.escapeString(proto),
          'queryPattern': new RegExp(extras.title.toLowerCase()),
        };
      },
      newText: function(text, extras) {
        extras = (typeof extras !== 'undefined' ? extras : {});
        text = ((text instanceof Node) && text.nodeName === '#text') ? text.data : text;
        return {
          'type': '"text"',
          'data': nimble.utils.escapeString(text),
          'extras': extras,
          'length': text.length,
          'queryPattern': new RegExp(extras.title.toLowerCase()),
        }
      },
      newImage: function(domImage, extras) {
        extras = (typeof extras !== 'undefined' ? extras : {});
        var blob = that.nimble.utils.blobFromImage(domImage);
        return {
          'type': '"image"',
          'data': blob,
          'extras': extras,
          'width': domImage.width,
          'height': domImage.height,
          'queryPattern': new RegExp(extras.title.toLowerCase()),
        };
      }
    };
  }
})();
