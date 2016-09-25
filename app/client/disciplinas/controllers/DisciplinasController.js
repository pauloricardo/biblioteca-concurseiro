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
        .controller('DisciplinasController', DisciplinasController);

    DisciplinasController.$inject = ['$route', '$routeParams', 'DisciplinasDataService'];

    function DisciplinasController($route,$routeParams, DisciplinasDataService){
        var vm = this;

        vm.getDisciplina = getDisciplina;

        function getDisciplina(){
            if ($routeParams.id !== undefined) {
                DisciplinasDataService.buscaDisciplinaPorID({id: $routeParams.id}).success(function(result){
                    vm.disciplina = angular.copy(result.disciplinas[0]);
                });
            }
        }

        function activate(){
            DisciplinasDataService.getDisciplinas().then(function(result){
                vm.disciplinas = result.data;
            });
        }
        activate();

    }
})();
