angular.module('NimbleApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $('.logo').addClass('animated fadeInLeft');
    $('.caption').addClass('animated fadeInRight');
    var t = 1;
    $('.service-icon').each(function () {
      var that = this;
      (function (delay) {
        setTimeout(function () {
          $(that).addClass('animated bounceInUp');
        }, delay * 300);
      })(t);
      t += 1;
    });
  }])
  .controller('AccountsCtrl', ['$scope', function ($scope) {
    $('.js-fb-login').click(signInFacebook);
    checkStatus();
    $('.js-db-login').click(signInDropbox);
    $('.js-live-login').click(signInWindowsLive);
  }]);