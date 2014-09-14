angular.module('NimbleApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    var t = 1;
    $('.service-icon').each(function () {
      var that = this;
      (function (delay) {
        setTimeout(function () {
          $(that).addClass('animated fadeInUp');
        }, delay * 300);
      })(t);
      t += 1;
    });
  }])
  .controller('AccountsCtrl', ['$scope', function ($scope) {
    $('.js-fb-login').click(signInFacebook);
    $('.js-db-login').click(signInDropbox);
    checkDropboxStatus();
    $('.js-live-login').click(signInWindowsLive);
    checkWindowsLiveStatus();
  }]);