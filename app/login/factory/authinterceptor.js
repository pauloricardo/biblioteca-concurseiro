/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
    .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['AuthService','$timeout', '$q', '$injector'];

function AuthInterceptor(AuthService,$timeout, $q, $injector) {
    var loginModal, $http, $state;

    // this trick must be done so that we don't receive
    // `Uncaught Error: [$injector:cdep] Circular dependency found`
    $timeout(function () {
        loginModal = $injector.get('loginModal');
        $http = $injector.get('$http');
        $state = $injector.get('$state');
    });
    return {
        // automatically attach Authorization header
        request: function (config) {
            var token = AuthService.getToken();
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },

        // If a token was sent back, save it
        response: function (res) {
            if (res.data.token) {
                AuthService.saveToken(res.data.token);
            }
            return res;
        },
        responseError: function (rejection) {
            if (rejection.status !== 401) {
                return rejection;
            }else{
                if(rejection.status === 401){
                    return AuthService.attemptRefreshToken(rejection.config);
                }
            }

            var deferred = $q.defer();

            loginModal()
              .then(function () {
                  deferred.resolve($http(rejection.config));
              })
              .catch(function () {
                  $state.go('login');
                  deferred.reject(rejection);
              });

            return deferred.promise;
        }
    }
}
