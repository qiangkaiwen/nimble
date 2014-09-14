window.fbAsyncInit = function () {
  FB.init({
    appId      : '1470211126587040',
    xfbml      : true,
    version    : 'v2.1'
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    localStorage.setItem('fbtoken', response.authResponse.accessToken);
    $('#fb-login-status').text('You are logged in to Facebook.');
    $('.js-fb-login').hide();
  } else if (response.status === 'not_authorized') {
    $('#fb-login-status').hide();
    $('.js-fb-login').show();
  } else {
    $('#fb-login-status').hide();
    $('.js-fb-login').show();
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function signInFacebook () {
  // console.log('sign in fb')
  // var REDIRECT_URI = 'https://www.facebook.com/dialog/oauth?client_id={app-id}&redirect_uri=https://www.facebook.com/connect/login_success.html';
  // window.location.href = REDIRECT_URI.replace('{app-id}', '1470211126587040').replace('{redirect-uri}', window.location.href);
  FB.login(function(response) {
  }, {scope: 'public_profile,publish_actions'});
}

$('.js-fb-login').click(signInFacebook);
