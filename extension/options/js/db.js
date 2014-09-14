function checkDropboxStatus() {
  if (localStorage.getItem('dropboxtoken') != null) {
    $('#db-login-status').text('You have logined to Dropbox.');
    $('.js-db-login').hide();
  } else {
    $('#db-login-status').hide();
    $('.js-db-login').show();
  }
}

function signInDropbox () {
  console.log("HERE");
  location.href = 'https://www.dropbox.com/1/oauth2/authorize?client_id=1c4z4rgltpwbqz5&response_type=token&redirect_uri=http://localhost:8000/db_redirect.html';
}
