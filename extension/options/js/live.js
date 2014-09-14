var signInWindowsLive = function() {
  // Redirects the page to the Windows Live sign in page. Once sign in is
  // complete, Windows Live redirects to the stated URL, placing the auth
  // token in a hash parameter.
  location.href = 'https://login.live.com/oauth20_authorize.srf?client_id=000000004012A7CB&scope=office.onenote_create&response_type=token&redirect_url=http://yangshun.im/nimble/extension/options/redirect.html'
};

function checkWindowsLiveStatus() {
  if (localStorage.getItem('livetoken') != null) {
    $('#live-login-status').text('You have logined to Windows Live.');
    $('.js-live-login').hide();
  } else {
    $('#live-login-status').hide();
    $('.js-live-login').show();
  }
}
