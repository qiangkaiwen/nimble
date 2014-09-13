var Utils = {
  escapeString: function(data) {
    var escaped = data.replace('"', '\\"');
    var encapsulated = '"' + escaped + '"';
    return encapsulated;
  } 
};
