(function() {
  if ('nimble' in this) {
    console.log(this);
    this.nimble['objectFactories'] = {
      newNull: function() {
        return {
          'type': '"null"'
        };
      },
      newUrl: function(url, title) {
        url = (url instanceof Node && url.nodeName === '#text') ? url.data : text;
        title = (typeof title !== 'undefined' ? title : '');
        var parser = document.createElement('a');
        parser.href = url;
        var proto = parser.protocol.substring(0, parser.protocol.length - 1);
        var nimble = this; // WTF!!!??!!!?
        return {
          'type': '"null"',
          'data': nimble.utils.escapeString(url),
          'title': nimble.utils.escapeString(title),
          'length': url.length,
          'protocol': nimble.utils.escapeString(proto)
        };
      },
      newText: function(text, title) {
        text = ((text instanceof Node) && text.nodeName === '#text') ? text.data : text;
        title = (typeof title !== 'undefined' ? title : '');
        return {
          'type': '"text"',
          'data': nimble.utils.escapeString(text),
          'title': nimble.utils.escapeString(title),
          'length': text.length
        }
      },
      newImage: function(domImage, title) {
        title = (typeof title !== 'undefined' ? title : '');
        var dataUrl = that.nimble.utils.blobFromImage(domImage);
        return {
          'type': '"image"',
          'data': nimble.utils.escapeString(dataUrl),
          'title': nimble.utils.escapeString(title),
          'width': domImage.width,
          'height': domImage.height
        };
      }
    };
  }
})();
