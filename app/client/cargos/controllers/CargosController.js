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
        .controller('CargosController', CargosController);

    CargosController.$inject = ['$route', '$routeParams', 'CargosDataService'];

    function CargosController($route,$routeParams, CargosDataService){
        var vm = this;

        vm.getCargo = getCargo;

        function getCargo(){
            if ($routeParams.id !== undefined) {
                CargosDataService.buscaCargoPorID({id: $routeParams.id}).success(function(result){
                    vm.cargo = angular.copy(result.cargos[0]);
                });
            }
        }

        function activate(){
            CargosDataService.getCargo().then(function(result){
                vm.cargos = result.data;
            });
        }
        activate();

    }
})();
