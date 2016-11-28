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
        .controller('OrgaosController', OrgaosController);

    OrgaosController.$inject = ['OrgaosDataService', '$state', '$stateParams'];

    function OrgaosController(OrgaosDataService, $state, $stateParams){
        var vm = this;

        vm.getOrgao = getOrgao;
        vm.create = create;
        vm.trash = trash;

        vm.orgaos =[];
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

            OrgaosDataService.getOrgaos(params).then(function(result){
                vm.orgaos = angular.copy(result.data.orgaos);
            });
        }
        function getOrgao(){
            if ($stateParams.id !== undefined) {
                OrgaosDataService.buscaOrgaoPorID($stateParams.id).success(function(result){
                    vm.orgao = angular.copy(result);
                });
            }
        }
        function create(){
            if($stateParams.id == undefined){
                OrgaosDataService.create({
                    nome : vm.orgao.nome
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Orgão Cadastrado com sucesso!'
                    };
                })
            }else{
                OrgaosDataService.update({
                    id : $stateParams.id,
                    nome : vm.orgao.nome
                }).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Orgão Editado com sucesso!'
                    };
                })
            }
        }

        function trash(id){
            OrgaosDataService.trash(id)
                .then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Orgão Deletado com sucesso!'
                    };
                    activate();
                })
        }
        function activate(){
            var params = {
                'skip' : 0,
                'top' : 10
            };
            OrgaosDataService.getOrgaos(params).then(function(result){
                vm.orgaos = angular.copy(result.data.orgaos);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });
        }
        activate();
    }
})();
