var client = new Dropbox.Client({key: '1c4z4rgltpwbqz5', secret: 'ekauyhaewgj8d2n'});

function checkStatus() {
  if (localStorage.getItem('dropboxtoken') != null) {
    $('#db-login-status').text('You have logined to Dropbox.');
    $('.js-db-login').hide();
  } else if (client.isAuthenticated()) {
    localStorage.setItem('dropboxtoken', client.credentials().token);
    $('#db-login-status').text('You have logined to Dropbox.');
    $('.js-db-login').hide();
  } else {
    $('#db-login-status').hide();
    $('.js-db-login').show();
  }
}

function signInDropbox () {
  client.authenticate({ interactive: false }, function (error, c) {
    if (error) {
      console.log('Error: ' + error);
    } else {
      client = c;
      checkStatus();
    }
  });
}

checkStatus();
$('.js-db-login').click(signInDropbox);
