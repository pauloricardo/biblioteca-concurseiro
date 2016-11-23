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
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$route', '$routeParams', 'LoginDataService'];

  function LoginController($route,$routeParams, LoginDataService){
    var vm = this;
    
    function activate(){
    }
    activate();

  }
})();
