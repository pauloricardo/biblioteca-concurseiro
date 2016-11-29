/**
 * Created by paulo on 18/09/2016.
 */
angular.module('biblioteca-concurseiro', ['ui.router', 'ui.tinymce', 'ui.bootstrap', 'angularFileUpload', 'oc.lazyLoad', 'angular-jwt'])
  .config(['$stateProvider', '$httpProvider',
    function ($stateProvider, $httpProvider) {
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $httpProvider.interceptors.push('AuthInterceptor');
    }]).filter('trust', ['$sce', function ($sce) {
  return function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  }
}]).run(function ($rootScope, $state, loginModal) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    if (requireLogin && typeof $rootScope.token === 'undefined') {
      event.preventDefault();
      loginModal()
        .then(function () {
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
          return $state.go('app.dashboard');
        });
    }
  });
});

