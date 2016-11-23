/**
 * Created by paulo on 18/09/2016.
 */
angular
  .module('biblioteca-concurseiro')
  .service('LoginDataService', LoginDataService);

LoginDataService.$inject = ['$http', '$q', 'CommonConfig'];
function LoginDataService($http, $q, CommonConfig) {


  var _headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept' : 'application/json'
  };
  var exports = {
    'login': login
  };
  return exports;

  function login(data){
    return $http({
      method : 'POST',
      url :  CommonConfig.getBaseUrl() + '/disciplinas/'+data['id'],
      headers : _headers,
      data : data
    });
  }
}