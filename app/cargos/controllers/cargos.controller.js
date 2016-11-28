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

    CargosController.$inject = ['$state', '$stateParams', 'CargosDataService'];

    function CargosController($state,$stateParams, CargosDataService){
        var vm = this;

        vm.getCargo = getCargo;
        vm.create = create;
        vm.trash = trash;

        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.pageChanged = pageChanged;

        function pageChanged(){
            var inicio = (vm.currentPage * 10) - 10;
            var params = {
                'skip' : inicio,
                'top' : 10
            };

            CargosDataService.getCargos(params).then(function(result){
                vm.cargos = angular.copy(result.data.cargos);
            });
        }
        function getCargo(){
            if ($stateParams.id !== undefined) {
                CargosDataService.getCargo($stateParams.id).success(function(result){
                    vm.cargo = angular.copy(result);
                });
            }
        }
        function create(){
            if($stateParams.id == undefined){
                CargosDataService.create({
                    nome : vm.cargo.nome
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Cargo Cadastrado com sucesso!'
                    };
                })
            }else{
                CargosDataService.update({
                    id : $stateParams.id,
                    nome : vm.cargo.nome
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Cargo Cadastrado com sucesso!'
                    };
                })
            }
        }

        function trash(id){
            CargosDataService.trash(id)
                .then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Cargo Deletado com sucesso!'
                    };
                    activate();
                })
        }

        function activate(){
            var params = {
                'skip' : 0,
                'top' : 10
            };

            CargosDataService.getCargos(params).then(function(result){
                vm.cargos = angular.copy(result.data.cargos);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });
        }
        activate();

    }
})();
