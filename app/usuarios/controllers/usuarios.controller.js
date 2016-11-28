(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('ProvasController', ProvasController);

    ProvasController.$inject = ['$q', '$state', '$stateParams', 'ProvasDataService', 'ProvasFactory', 'Canonico', 'ConcursosDataService', 'CargosDataService', 'CommonConstants'];

    function ProvasController($q, $state, $stateParams, ProvasDataService, ProvasFactory, Canonico, ConcursosDataService, CargosDataService,CommonConstants) {
        var vm = this;

        vm.getProva = getProva;
        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.pageChanged = pageChanged;

        vm.create = create;
        vm.trash = trash;

        function create() {
            if ($stateParams.id == undefined) {
                var params = ProvasFactory.convert(vm.prova);
                ProvasDataService.create(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_PROVA_ADD);
                });
            } else {
                var params = ProvasFactory.convert(vm.prova);
                ProvasDataService.update(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_PROVA_EDIT);
                });
            }
        }

        function trash(id) {
            ProvasDataService.trash(id)
                .then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_PROVA_DELETE);
                    activate();
                })
        }

        function pageChanged() {
            var inicio = (vm.currentPage * 10) - 10;
            var params = {
                'skip': inicio,
                'top': 10
            };
            ProvasDataService.getProvas(params).then(function (result) {
                vm.provas = angular.copy(result.data);
            });
        }

        function getProva() {
            if ($stateParams.id !== undefined) {
                ProvasDataService.buscaProvaPorID($stateParams.id).success(function (result) {
                    vm.prova = angular.copy(result);
                });
            }
        }

        function activate() {
            var params = {
                'skip': 0,
                'top': 10
            };
            $q.all([
                ProvasDataService.getProvas(params).then(function (result) {
                    return result.data;
                }),
                ConcursosDataService.getConcursos().then(function (result) {
                    return result.data;
                }),
                CargosDataService.getCargos().then(function (result) {
                    return result.data;
                })
            ]).then(function (result) {
                if (result[0] && result[1] && result[2]) {
                    vm.totalRows = angular.copy(result[0]['X-Total-Rows']);
                    vm.provas = result[0];
                    vm.concursos = result[1];
                    vm.cargos = result[2];
                }
            })
        }

        activate();


    }
})();
