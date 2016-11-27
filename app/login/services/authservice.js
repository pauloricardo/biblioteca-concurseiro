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
    'isAuthed' : isAuthed
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
  function saveToken(token) {
    $window.localStorage['jwtToken'] = token;
  }
}
