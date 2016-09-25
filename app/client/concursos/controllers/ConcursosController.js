(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('ConcursosController', ConcursosController);

    ConcursosController.$inject = ['$q', '$route', '$routeParams', 'ConcursosDataService', 'OrgaosDataService', 'BancasDataService'];

    function ConcursosController($q, $route, $routeParams, ConcursosDataService, OrgaosDataService, BancasDataService) {
        var vm = this;

        vm.getConcurso = getConcurso;
        vm.concurso = {};
        vm.concursos = [];
        vm.bancas = [];
        vm.orgaos = [];


        function getConcurso() {
            if ($routeParams.id !== undefined) {
                ConcursosDataService.buscaConcursoPorID({id: $routeParams.id}).success(function (result) {
                    vm.concurso = angular.copy(result.concursos[0]);
                    console.log(vm.concurso.orgaos.id);
                });
            }
        }

        function activate() {
            $q.all([
                ConcursosDataService.getConcursos().then(function (result) {
                   return result.data;
                }),
                OrgaosDataService.getOrgaos().then(function(result){
                    return result.data;
                }),
                BancasDataService.getBancas().then(function(result){
                    return result.data;
                })

            ]).then(function(result){
                if(result[0]){
                    vm.concursos = result[0];
                }
                if(result[1] && result[2]){
                    vm.orgaos = result[1];
                    vm.bancas = result[2];
                }
            })

        }

        activate();

    }
})();
