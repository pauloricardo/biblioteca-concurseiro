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

    OrgaosController.$inject = ['OrgaosDataService', '$route', '$routeParams'];

    function OrgaosController(OrgaosDataService, $route, $routeParams){
        var vm = this;

        vm.getOrgao = getOrgao;

        function getOrgao(){
            if ($routeParams.id !== undefined) {
                OrgaosDataService.buscaOrgaoPorID({id: $routeParams.id}).success(function(result){
                    vm.orgao = angular.copy(result.orgaos[0]);
                });
            }
        }

        function activate(){
            OrgaosDataService.getOrgaos().then(function(result){
                vm.orgaos = result.data;
            });
        }
        activate();
    }
})();
