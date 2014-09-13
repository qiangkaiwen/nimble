var TestPlugin = function() {

  var _consoleLog = function(dataObject) {
    console.log(dataObject);
    return dataObject;
  };

  var _alert = function(dataObject) {
    alert(dataObject);
    return dataObject;
  }

  return {
    getRecipes: function() {
      return [
        {
          'title': 'Log To Console',
          'callback': _consoleLog,
          'inputs': [
            {
              'type': 'text'
            }
          ]
        },
        {
          'title': 'Show Alert Box',
          'callback': _alert,
          'inputs': [
            {
              'type': 'text'
            }
          ]
        },
        {
          'title': 'Foo',
          'callback': _consoleLog,
          'inputs': [
            {
              'type': 'foo'
            }
          ]
        }
      ];
    }
  };
};
