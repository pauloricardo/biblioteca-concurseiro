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

AuthInterceptor.$inject = [AuthService];

function AuthInterceptor(AuthService) {

    return {
        // automatically attach Authorization header
        request: function(config) {
            var token = AuthService.getToken();
            if(token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },

        // If a token was sent back, save it
        response: function(res) {
            if(res.data.token) {
                AuthService.saveToken(res.data.token);
            }

            return res;
        }
    }
}
