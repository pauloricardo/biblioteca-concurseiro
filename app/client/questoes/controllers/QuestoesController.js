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
        .controller('QuestoesController', QuestoesController);

    QuestoesController.$inject = ['$route', '$routeParams', 'QuestoesDataService', 'ConcursosDataService', 'DisciplinasDataService', 'CargosDataService'];

    function QuestoesController($route,$routeParams, QuestoesDataService, ConcursosDataService, DisciplinasDataService, CargosDataService){
        var vm = this;
        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;


        vm.getQuestao = getQuestao;
        vm.create = create;
        vm.trash = trash;
        vm.adicionarResposta = adicionarResposta;
        vm.removerResposta = removerResposta;

        vm.pageChanged = pageChanged;


        function pageChanged(){
            var inicio = (vm.currentPage * 10) - 10;
            var params = {
                'skip' : inicio,
                'top' : 10
            };

            QuestoesDataService.getQuestoes(params).then(function(result){
                vm.questoes = angular.copy(result.data.questoes);
            });
        }
        function getQuestao(){
            if ($routeParams.id !== undefined) {
                QuestoesDataService.buscaQuestaoPorID($routeParams.id).success(function(result){
                    vm.questao = angular.copy(result);
                });
            }
        }   

        function adicionarResposta(){
            var params = {
              enunciado : "",
              correta : false
            };
            vm.questao.respostas.push(params);
        }

        function removerResposta(index){
            vm.questao.respostas.splice(index, 1);
        }

        function create(){

            var params = {
                texto : vm.questao.texto,
                disciplina_id : vm.questao.disciplina_id,
                concurso_id : vm.questao.concurso_id,
                cargo_id : vm.questao.cargo_id,
                questoesresposta : vm.questao.respostas
            };

            if($routeParams.id == undefined){
                QuestoesDataService.create(params).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Questão Cadastrada com sucesso!'
                    };
                })
            }else{
                params.id = $routeParams.id;
                angular.forEach(params.questoesresposta, function(value, key){
                    if(!params.questoesresposta[key].questao_id){
                        params.questoesresposta[key].questao_id = parseInt($routeParams.id);
                    }
                });
                QuestoesDataService.update(params).then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Questão Cadastrada com sucesso!'
                    };
                })
            }
        }

        function trash(id){
            QuestoesDataService.trash(id)
                .then(function(result){
                    vm.alerts = {
                        'type' : 'SUCCESS',
                        'message' : 'Questão deletada com sucesso!'
                    };
                    activate();
                })
        }


        function activate(){
            ConcursosDataService.getConcursos().then(function(result){
                vm.concursos = angular.copy(result.data.concursos);
            });


            DisciplinasDataService.getDisciplinas().then(function(result){
                vm.disciplinas = angular.copy(result.data.disciplinas);
            });

            CargosDataService.getCargos().then(function(result){
                vm.cargos = angular.copy(result.data.cargos);
            });

            QuestoesDataService.getQuestoes({'skip':0,'top':10}).then(function(result){
                vm.questoes = angular.copy(result.data.questoes);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });

        }
        activate();

    }
})();
