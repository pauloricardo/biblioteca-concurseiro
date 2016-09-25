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

    angular.module('biblioteca-concurseiro')
        .controller('QuestoesController', QuestoesController);

    QuestoesController.$inject = ['$route', '$routeParams', '$window', '$q', '$scope', '$http', 'QuestoesDataService', 'DisciplinasDataService',
        'BancasDataService', 'OrgaosDataService'];

    function QuestoesController($route, $routeParams, $window, $q, $scope, $http, QuestoesDataService,
                                DisciplinasDataService, BancasDataService, OrgaosDataService) {
        var vm = this;

        vm.questoes = [];

        vm.disciplinas = [];
        vm.orgaos = [];
        vm.bancas = [];

        vm.respostas = [
            {
                "enunciado": null,
                "correta": false
            }
        ];
        vm.questao = {};
        vm.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };
        vm.adicionarResposta = adicionarResposta;
        vm.removerResposta = removerResposta;
        vm.getQuestao = getQuestao;

        var questaoSelected = {};
        var respostaSelected = {};
        activate();

        function activate() {
            loadQuestoes();
            loadCombos();

        }

        function loadCombos() {
            $q.all([
                DisciplinasDataService.getDisciplinas().success(function (data) {
                    return angular.copy(data);
                }),
                OrgaosDataService.getOrgaos().success(function (data) {
                    return angular.copy(data);
                }),
                BancasDataService.getBancas().success(function (data) {
                    return angular.copy(data);
                })
            ]).then(function (values) {
                if(values[0] !== undefined){
                    vm.disciplinas = values[0].data.disciplinas;
                }
                if(values[1] !== undefined){
                    vm.orgaos = values[1].data.orgaos;
                }
                if(values[2] !== undefined){
                    vm.bancas = values[2].data.bancas;
                }
            });
        }

        function loadQuestoes() {
            QuestoesDataService.buscaQuestoesCadastradas().success(function (data) {
                vm.questoes = data;
            });
        }

        function getQuestao() {
            if ($routeParams.id !== undefined) {
                $q.all([
                    QuestoesDataService.buscaQuestaoPorID({id: $routeParams.id}).success(function (data) {
                        return angular.copy(data);
                    })
                ]).then(function (values) {
                    vm.questao = angular.copy(values[0].data.questoes);
                    vm.respostas = angular.copy(values[0].data.questoes.respostas);
                });
            }
        }

        function adicionarResposta() {
            var resposta = {
                "enunciado": null,
                "correta": false
            };
            vm.respostas.push(resposta);
        }

        function removerResposta(index) {
            if (vm.respostas.length > 1) {
                vm.respostas.splice(index, 1);
            } else {
                return false;
            }
        }
    }

})();
