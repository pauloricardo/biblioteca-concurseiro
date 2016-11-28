(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('AssuntosController', AssuntosController);

    AssuntosController.$inject = ['$q', '$state', '$stateParams', 'AssuntosDataService', 'AssuntosFactory', 'Canonico',
        'DisciplinasDataService', 'CommonConstants'];

    function AssuntosController($q, $state, $stateParams, AssuntosDataService, AssuntosFactory, Canonico,
        DisciplinasDataService, CommonConstants) {
        var vm = this;

        vm.getAssunto = getAssunto;
        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.pageChanged = pageChanged;

        vm.create = create;
        vm.trash = trash;

        function create() {
            if ($stateParams.id == undefined) {
                var params = AssuntosFactory.convert(vm.assunto);
                AssuntosDataService.create(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_ASSUNTO_ADD);
                });
            } else {
                var params = AssuntosFactory.convert(vm.assunto);
                AssuntosDataService.update(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_ASSUNTO_EDIT);
                });
            }
        }

        function trash(id) {
            AssuntosDataService.trash(id)
                .then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_ASSUNTO_DELETE);
                    activate();
                })
        }

        function pageChanged() {
            var inicio = (vm.currentPage * 10) - 10;
            var params = {
                'skip': inicio,
                'top': 10
            };
            AssuntosDataService.getAssuntos(params).then(function (result) {
                vm.assuntos = angular.copy(result.data);
            });
        }

        function getAssunto() {
            if ($stateParams.id !== undefined) {
                AssuntosDataService.buscaAssuntoPorID($stateParams.id).success(function (result) {
                    vm.assunto = angular.copy(result);
                });
            }
        }

        function activate() {
            var params = {
                'skip': 0,
                'top': 10
            };
            $q.all([
                AssuntosDataService.getAssuntos(params).then(function (result) {
                    return result.data;
                }),
                DisciplinasDataService.getDisciplinas().then(function (result) {
                    return result.data;
                })
            ]).then(function (result) {
                if (result[0] && result[1]) {
                    vm.totalRows = angular.copy(result[0]['X-Total-Rows']);
                    vm.assuntos = result[0];
                    vm.disciplinas = result[1];
                }
            })
        }

        activate();
    }

})();
