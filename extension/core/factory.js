(function () {
  if ('nimble' in this) {
    this.nimble['objectFactories'] = {
      newNull: function() {
        return {
          'type': '"null"'
        };
      },
      newUrl: function(url, title) {
        url = (url instanceof Node && url.nodeName === '#text') ? url.data() : text;
        title = (typeof title !== 'undefined' ? title : '');
        var parser = document.createElement('a');
        parser.href = url;
        var proto = parser.protocol.substring(0, parser.protocol.length - 1);
        return {
          'type': '"null"',
          'data': Utils.escapeString(url),
          'title': Utils.escapeString(title),
          'length': url.length,
          'protocol': Utils.escapeString(proto)
        };
      },
      newText: function(text, title) {
        text = (text instanceof Node && text.nodeName === '#text') ? text.data() : text;
        title = (typeof title !== 'undefined' ? title : '');
        return {
          'type': '"text"',
          'data': Utils.escapeString(text),
          'title': Utils.escapeString(title),
          'length': text.length
        }
      }
    };
  }
})();
