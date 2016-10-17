(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('BancasController', BancasController);

    BancasController.$inject = ['$route', '$routeParams', 'BancasDataService'];

    function BancasController($route,$routeParams, BancasDataService) {
        var vm = this;

        vm.getBanca = getBanca;
        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.pageChanged = pageChanged;

        vm.create = create;
        vm.trash = trash;

        function create(){
            if($routeParams.id == undefined){
                BancasDataService.create({
                    nome : vm.banca.nome
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Banca Cadastrada com sucesso!'
                    };
                })
            }else{
                BancasDataService.update({
                    id : $routeParams.id,
                    nome : vm.banca.nome
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Banca atualizada com sucesso!'
                    };
                })
            }
        }

        function trash(id){
            BancasDataService.trash(id)
                .then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Banca Deletada com sucesso!'
                    };
                    activate();
                })
        }

        function pageChanged(){
            var inicio = (vm.currentPage * 10) - 10;
            var params = {
                'skip' : inicio,
                'top' : 10
            };

            BancasDataService.getBancas(params).then(function(result){
                vm.bancas = angular.copy(result.data);
            });
        }

        function getBanca(){
            if ($routeParams.id !== undefined) {
                BancasDataService.buscaBancaPorID($routeParams.id).success(function(result){
                    vm.banca = angular.copy(result);
                });
            }
        }

        function activate(){
            var params = {
                'skip' : 0,
                'top' : 10
            };
            BancasDataService.getBancas(params).then(function(result){
                vm.bancas = result.data;
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });
        }
        activate();


    }
})();
