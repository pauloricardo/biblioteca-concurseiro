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

    DisciplinasController.$inject = ['$state', '$stateParams', 'DisciplinasDataService'];

    function DisciplinasController($state,$stateParams, DisciplinasDataService){
        var vm = this;

        vm.getDisciplina = getDisciplina;
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

            DisciplinasDataService.getDisciplinas(params).then(function(result){
                vm.disciplinas = angular.copy(result.data.disciplinas);
            });
        }
        function getDisciplina(){
            if ($stateParams.id !== undefined) {
                DisciplinasDataService.buscaDisciplinaPorID($stateParams.id).success(function(result){
                    vm.disciplina = angular.copy(result);
                });
            }
        }

        function create(){
          if($stateParams.id == undefined){
            DisciplinasDataService.create({
              nome : vm.disciplina.nome
            }).then(function(result){
                vm.alerts = {
                    'type' : 'SUCCESS',
                    'message' : 'Disciplina Cadastrada com sucesso!'
                };
            })
          }else{
              DisciplinasDataService.update({
                id : $stateParams.id,
                nome : vm.disciplina.nome
              }).then(function(result){
                vm.alerts = {
                    'type' : 'SUCCESS',
                     'message' : 'Disciplina Cadastrada com sucesso!'
                };
              })
          }
        }

        function trash(id){
            DisciplinasDataService.trash(id)
                .then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Disciplina Deletada c  om sucesso!'
                    };
                    activate();
                })
        }


        function activate(){
          var params = {
              'skip' : 0,
              'top' : 10
          };
            DisciplinasDataService.getDisciplinas(params).then(function(result){
                vm.disciplinas = angular.copy(result.data.disciplinas);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });
        }
        activate();

    }
})();
