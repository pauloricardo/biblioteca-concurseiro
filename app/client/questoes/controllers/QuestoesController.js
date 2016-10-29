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

    QuestoesController.$inject = ['$scope', '$route', '$routeParams', 'QuestoesDataService', 'ConcursosDataService'
        , 'DisciplinasDataService', 'CargosDataService', '$http', 'FileUploader', 'QuestoesFactory', 'CommonConstants', 'Canonico'];

    function QuestoesController($scope, $route, $routeParams, QuestoesDataService, ConcursosDataService, DisciplinasDataService, CargosDataService,
                                $http, FileUploader, QuestoesFactory, CommonConstants, Canonico) {
        var vm = this;

        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.questao = {};
        vm.imageFile = "";

        vm.getQuestao = getQuestao;
        vm.create = create;
        vm.trash = trash;
        vm.adicionarResposta = adicionarResposta;
        vm.removerResposta = removerResposta;
        vm.buscarQuestoes = buscarQuestoes;
        vm.pageChanged = pageChanged;
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
        function getConfig(){
          $http.get('app/client/config/config.json').then(function(result){
              vm.config = result;
          });

        }
        function uploadImage(file) {
            var fd = new FormData();
            fd.append('file', vm.imageFile);
           return $http.post("http://biblioteca-concurseiro:8000/api/v1/questoes/uploadQuestaoFile", fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
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

        function getQuestao() {
            if ($routeParams.id !== undefined) {
                QuestoesDataService.buscaQuestaoPorID($routeParams.id).success(function (result) {
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

        function create() {

            var params = {
                texto: vm.questao.texto,
                disciplina_id: vm.questao.disciplina_id,
                concurso_id: vm.questao.concurso_id,
                cargo_id: vm.questao.cargo_id,
                multipla_escolha : vm.questao.multipla_escolha,
                tipo_questao : vm.questao.tipo_questao,
                questoesresposta: vm.questao.respostas
            };

            if ($routeParams.id == undefined) {
                QuestoesDataService.create(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', 'Questão Cadastrada com sucesso!');
                })
            } else {
                params.id = $routeParams.id;
                angular.forEach(params.questoesresposta, function (value, key) {
                    if (!params.questoesresposta[key].questao_id) {
                        params.questoesresposta[key].questao_id = parseInt($routeParams.id);
                    }
                });
                QuestoesDataService.update(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', 'Questão Atualizada com sucesso!');
                    vm.alerts = vm.alerts[0];
                })
            }
        }

        function trash(id) {
            QuestoesDataService.trash(id)
                .then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', 'Questão deletada com sucesso!');
                    vm.alerts = vm.alerts[0];

                    activate();
                })
        }

        function buscarQuestoes(disciplina, concurso) {
            var params = {
                'filtroDisciplina': disciplina,
                'filtroConcurso': concurso,
                'skip': 0,
                'top': 10
            };
            QuestoesDataService.getQuestoes(params).then(function (result) {
                vm.questoes = angular.copy(result.data.questoes);
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });
        }

        function activate() {
            getConfig();
            console.log(vm.config);
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

            QuestoesDataService.getQuestoes({'skip': 0, 'top': 10}).then(function (result) {
                vm.questoes = angular.copy(QuestoesFactory.convertList(result.data.questoes));
                vm.totalRows = angular.copy(result.data['X-Total-Rows']);
            });

        }


        activate();

    }
})();
