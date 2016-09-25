(function(){
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q','$route','$routeParams', 'OrgaosDataService', 'BancasDataService', 'QuestoesDataService', 'ConcursosDataService'];
    function DashboardController($q,$route, $routeParams,
                                 OrgaosDataService, BancasDataService, QuestoesDataService, ConcursosDataService){
        var vm = this;
        vm.totalQuestoes = 0;
        vm.totalConcursos = 0;
        vm.user = {};
        vm.getUsuario = getUsuario;

        function getUsuario(){

        }
        function activate(){
            $q.all([
                QuestoesDataService.buscaQuestoesCadastradas().then(function(result){
                    return result.data.questoes.length;
                }),
                ConcursosDataService.getConcursos().then(function(result){
                    return result.data.concursos.length;
                })
            ]).then(function(result){
                if(result[0] && result[1]){
                    vm.totalQuestoes = result[0];
                    vm.totalConcursos = result[1];
                }
            })

        }

        activate();
    }
})();
