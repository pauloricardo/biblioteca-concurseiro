/**
 * Created by paulo on 18/09/2016.
 */
angular
  .module('biblioteca-concurseiro')
  .service('AuthService', AuthService);

AuthService.$inject = ['$window'];
function AuthService($window) {
  var _headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept' : 'application/json'
  };
  var exports = {
    'parseJWT': parseJwt,
    'saveToken' : saveToken,
    'getToken' : getToken,
    'isAuthed' : isAuthed,
    'refreshToken' : refreshToken
  };
  return exports;
  function getToken() {
    return $window.localStorage['jwtToken'];
  }
  function isAuthed() {
    var token = self.getToken();
    if(token) {
      var params = self.parseJwt(token);
      return Math.round(new Date().getTime() / 1000) <= params.exp;
    } else {
      return false;
    }
  }
  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }
  function refreshToken(request){
    var token = store.get('token');
    var http = $injector.get('$http');
    var config = $inject.get('CommonConfig');

    return http({
      method: 'POST',
      skipAuthorization: true,
      url: config.getBaseUrl() + '/refresh',
      data: {token: token}
    })
        .success(function(response)
        {
          // Set the refreshed token.
          store.set('token', response.token);
        })
        .then(function(){

          // Attempt to retry the request if request config is passed.
          if(!angular.isUndefined(request) && request.length > 0)
          {
            // Set the new token for the authorization header.
            request.headers = {
              'Authorization': 'Bearer ' + store.get('token')
            };

            // Run the request again.
            return http(request);
          }
        });

  }
  function saveToken(token) {
    $window.localStorage['jwtToken'] = token;
  }
}
