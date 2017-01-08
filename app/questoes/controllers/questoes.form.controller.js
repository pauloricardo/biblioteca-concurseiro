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
        .controller('QuestoesFormController', QuestoesFormController);

    QuestoesFormController.$inject = ['$scope','$state', '$stateParams', 'QuestoesDataService', 'ConcursosDataService'
        , 'DisciplinasDataService', 'CargosDataService', '$http', 'FileUploader', 'QuestoesFactory', 'CommonConstants', 'Canonico',
    'AssuntosDataService', 'ProvasDataService'];

    function QuestoesFormController($scope,$state,$stateParams, QuestoesDataService, ConcursosDataService, DisciplinasDataService, CargosDataService,
                                $http, FileUploader, QuestoesFactory, CommonConstants, Canonico, AssuntosDataService, ProvasDataService) {
        var vm = this;

        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.questao = {};
        vm.imageFile = "";
        vm.isFormSubmitted = false;

        vm.getQuestao = getQuestao;
        vm.create = create;
        vm.trash = trash;
        vm.adicionarResposta = adicionarResposta;
        vm.removerResposta = removerResposta;
        vm.adicionar = adicionar;

        vm.multiplaEscolhaList = CommonConstants.QUESTAO.MULTIPLA_ESCOLHA;
        vm.tipoQuestaoList = CommonConstants.QUESTAO.TIPO_QUESTAO_LIST;

        vm.tinymceOptions = {
            selector: 'textarea',
            plugins: 'link image',
            automatic_uploads: true,
            file_browser_callback_types: 'file image media',
            file_picker_callback: function (callback, value, meta) {
                if (meta.filetype == 'image') {
                    $('#imageFile').trigger('click');
                    $('#imageFile').on('change', function () {
                        var file = this.files[0];
                        uploadImage(file).then(function(result){
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                callback('http://biblioteca-concurseiro:8000/' + result.data.imagem, {
                                    alt: ''
                                });
                            };
                            reader.readAsDataURL(file);
                        });
                    });
                }
            }
        };
        function uploadImage(file) {
            var fd = new FormData();
            fd.append('file', vm.imageFile);
           return $http.post("http://biblioteca-concurseiro:8000/api/v1/questoes/uploadQuestaoFile", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }

        function getQuestao() {
            if ($stateParams.id !== undefined) {
                QuestoesDataService.buscaQuestaoPorID($stateParams.id).success(function (result) {
                    vm.questao = angular.copy(QuestoesFactory.convert(result));
                });
            }
        }

        function adicionarResposta() {
            var params = {
                enunciado: "",
                correta: false
            };

            vm.questao.respostas.push(params);
        }

        function removerResposta(index) {
            vm.questao.respostas.splice(index, 1);
        }
        function adicionar(){
            $state.go('app.questoes.adicionar', {}, {
                reload:true
            });
        }
        function create() {

            var params = {
                texto: vm.questao.texto,
                texto_auxiliar: vm.questao.texto_auxiliar,
                disciplina_id: vm.questao.disciplina_id,
                concurso_id: vm.questao.concurso_id,
                cargo_id: vm.questao.cargo_id,
                assunto_id: vm.questao.assunto_id,
                prova_id: vm.questao.prova_id,
                multipla_escolha : vm.questao.multipla_escolha,
                tipo_questao : vm.questao.tipo_questao,
                questoesresposta: vm.questao.respostas
            };
            var isInvalid = vm.form.$invalid && _validateAnswers();
            vm.isFormSubmitted = true;
            if(isInvalid){
                Canonico.addAlert(vm.alerts, 'alert-danger', 'Não foi possível salvar. Verifique os campos e tente novamente.');
            }else if ($stateParams.id == undefined) {
                QuestoesDataService.create(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'alert-success', 'Questão Cadastrada com sucesso!');
                })
            } else {
                params.id = 400;
                angular.forEach(params.questoesresposta, function (value, key) {
                    if (!params.questoesresposta[key].questao_id) {
                        params.questoesresposta[key].questao_id = parseInt($routeParams.id);
                    }
                });
                QuestoesDataService.update(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', 'Questão Atualizada com sucesso!');
                })
            }
        }

        function trash(id) {
            QuestoesDataService.trash(id)
                .then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', 'Questão deletada com sucesso!');
                    activate();
                })
        }

        function activate() {
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
