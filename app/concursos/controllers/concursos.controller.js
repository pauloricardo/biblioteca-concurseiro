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
        .controller('ConcursosController', ConcursosController);

    ConcursosController.$inject = ['$state', '$stateParams', 'ConcursosDataService', 'OrgaosDataService', 'BancasDataService'];

    function ConcursosController($state,$stateParams, ConcursosDataService, OrgaosDataService, BancasDataService){
        var vm = this;

        vm.getConcurso = getConcurso;
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

            ConcursosDataService.getConcursos(params).then(function(result){
                vm.concursos = angular.copy(result.data.concursos);
            });
        }
        function getConcurso(){
            if ($stateParams.id !== undefined) {
                ConcursosDataService.buscaConcursoPorID($stateParams.id).success(function(result){
                    vm.concurso = angular.copy(result);
                    console.log(vm.concurso);
                });
            }
        }

        function create(){
            if($stateParams.id == undefined){
                ConcursosDataService.create({
                    ano : vm.concurso.ano,
                    orgao_id : vm.concurso.orgao_id,
                    banca_id : vm.concurso.banca_id
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Concurso Cadastrado com sucesso!'
                    };
                })
            }else{
                ConcursosDataService.update({
                    id : $stateParams.id,
                    ano : vm.concurso.ano,
                    orgao_id : vm.concurso.orgao_id,
                    banca_id : vm.concurso.banca_id
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Concurso atualizado com sucesso!'
                    };
                })
            }
        }

        function trash(id){
            ConcursosDataService.trash(id)
                .then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Concurso deletado com sucesso!'
                    };
                    activate();
                })
        }


        function activate(){
            var params = {
                'skip' : 0,
                'top' : 10
            };
            ConcursosDataService.getConcursos(params).then(function(result){
                vm.concursos = angular.copy(result.data.concursos);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });

            OrgaosDataService.getOrgaos().then(function(result){
                vm.orgaos = angular.copy(result.data.orgaos);
            });

            BancasDataService.getBancas().then(function(result){
                vm.bancas = angular.copy(result.data.bancas);
            })
        }
        activate();

    }
})();
