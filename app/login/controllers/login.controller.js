/**
 * @ngdoc controller
 * @name biblioteca-concurseiro:DashboardCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
(function(){
  'use strict';

  angular.module('biblioteca-concurseiro')
    .controller('LoginModalController', LoginController);

  LoginController.$inject = ['$scope', 'UserService', 'AuthService', '$uibModalInstance'];

  function LoginController($scope, UserService, AuthService, $uibModalInstance){
    var vm = this;

    this.cancel = $uibModalInstance.$dismiss;

    this.submit = function (email, password) {
      var params  = {
        'email' : email,
        'password' : password
      };
      UserService.login(params).then(function (retorno) {
        $uibModalInstance.close(retorno);
      });
    };
    function activate(){
    }
    activate();

  }
})();
