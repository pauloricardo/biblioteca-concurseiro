/**
 * @ngdoc controller
 * @name biblioteca-concurseiro:DashboardCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('QuestoesController', QuestoesController);

    QuestoesController.$inject = ['$scope','$state', '$stateParams', 'QuestoesDataService', 'ConcursosDataService'
        , 'DisciplinasDataService', 'CargosDataService', '$http', 'FileUploader', 'QuestoesFactory', 'CommonConstants', 'Canonico',
        'AssuntosDataService', 'ProvasDataService'];

    function QuestoesController($scope,$state,$stateParams, QuestoesDataService, ConcursosDataService, DisciplinasDataService, CargosDataService,
                                $http, FileUploader, QuestoesFactory, CommonConstants, Canonico, AssuntosDataService, ProvasDataService) {
        var vm = this;

        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.questao = {};
        vm.imageFile = "";

        vm.trash = trash;
        vm.buscarQuestoes = buscarQuestoes;
        vm.pageChanged = pageChanged;
        vm.cleanSearch = cleanSearch;
        vm.adicionar = adicionar;

        vm.multiplaEscolhaList = CommonConstants.QUESTAO.MULTIPLA_ESCOLHA;
        vm.tipoQuestaoList = CommonConstants.QUESTAO.TIPO_QUESTAO_LIST;

        function getConfig(){
            $http.get('app/client/config/config.json').then(function(result){
                vm.config = result;
            });

        }

        function pageChanged() {
            var inicio = (vm.currentPage * 10) - 10;
            var params = {
                'skip': inicio,
                'top': 10
            };

            QuestoesDataService.getQuestoes(params).then(function (result) {
                vm.questoes = angular.copy(QuestoesFactory.convertList(result.data.questoes));
            });
        }
        function adicionar(){
            $state.transitionTo('app.questoes.adicionar', {}, {
                reload:true, inherit: true
            });
        }

        function trash(id) {
            QuestoesDataService.trash(id)
                .then(function (result) {
                    Canonico.addAlert(vm.alerts, 'alert-success', CommonConstants.MESSAGES.MSG_SUCESSO_QUESTAO_DELETE);
                    activate();
                })
        }

        function buscarQuestoes() {
            var params = {
                'filtroDisciplina': vm.questao.disciplina_id,
                'filtroConcurso': vm.questao.concurso_id,
                'filtroMultiplaEscolha' : vm.questao.filtroMultiplaEscolha,
                'filtroTipoQuestao' : vm.questao.filtroTipoQuestao,
                'skip': 0,
                'top': 10
            };
            QuestoesDataService.getQuestoes(params).then(function (result) {
                vm.questoes = angular.copy(result.data.questoes);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });
        }

        function activate() {
            console.log("activate");
            if (!vm.questao.respostas) {
                vm.questao.respostas = [
                    {
                        enunciado: "",
                        correta: false
                    }
                ];
            }
            ConcursosDataService.getConcursos().then(function (result) {
                vm.concursos = angular.copy(result.data.concursos);
            });


            DisciplinasDataService.getDisciplinas().then(function (result) {
                vm.disciplinas = angular.copy(result.data.disciplinas);
            });

            CargosDataService.getCargos().then(function (result) {
                vm.cargos = angular.copy(result.data.cargos);
            });
            AssuntosDataService.getAssuntos().then(function (result) {
                vm.assuntos = angular.copy(result.data);
            });
            ProvasDataService.getProvas().then(function (result) {
                vm.provas = angular.copy(result.data);
            });
            QuestoesDataService.getQuestoes({'skip': 0, 'top': 10}).then(function (result) {
                vm.questoes = angular.copy(QuestoesFactory.convertList(result.data.questoes));
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });

        }
        function cleanSearch(){
            buscarQuestoes();
        }
        function _validateAnswers(){
            var retorno = false;
            angular.forEach(vm.questao.respostas, function(value){
                if(value.enunciado === ""){
                    retorno = true;
                }
            });
            return retorno;
        }

        activate();

    }
})();
