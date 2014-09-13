window.fbAsyncInit = function () {
  FB.init({
    appId      : '1470211126587040',
    xfbml      : true,
    version    : 'v2.1'
  });
};

function signInFacebook () {
  console.log('sign in fb')
  var REDIRECT_URI = 'https://www.facebook.com/dialog/oauth?client_id={app-id}&redirect_uri=https://www.facebook.com/connect/login_success.html';
  window.location.href = REDIRECT_URI.replace('{app-id}', '1470211126587040').replace('{redirect-uri}', window.location.href);
}

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$('.js-fb-login').click(signInFacebook);
