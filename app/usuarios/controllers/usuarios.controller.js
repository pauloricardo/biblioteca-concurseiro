(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('UsuariosController', UsuariosController);

    UsuariosController.$inject = ['$q', '$state', '$stateParams', 'UsuariosDataService', 'UsuariosFactory', 'Canonico', 'CommonConstants'];

    function UsuariosController($q, $state, $stateParams, UsuariosDataService, UsuariosFactory, Canonico,CommonConstants) {
        var vm = this;

        vm.getUsuario = getUsuario;
        vm.alerts = [];
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.totalRows = 0;
        vm.pageChanged = pageChanged;

        vm.create = create;
        vm.trash = trash;

        function create() {
            if ($stateParams.id == undefined) {
                var params = UsuariosFactory.convert(vm.usuario);
                UsuariosDataService.create(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_PROVA_ADD);
                });
            } else {
                var params = UsuariosFactory.convert(vm.usuario);
                UsuariosDataService.update(params).then(function (result) {
                    Canonico.addAlert(vm.alerts, 'SUCCESS', CommonConstants.MESSAGES.MSG_SUCESSO_PROVA_EDIT);
                });
            }
        }

        function trash(id) {
            UsuariosDataService.trash(id)
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
            UsuariosDataService.getUsuarios(params).then(function (result) {
                vm.usuarios = angular.copy(result.data);
            });
        }

        function getUsuario() {
            if ($stateParams.id !== undefined) {
                UsuariosDataService.buscaUsuarioPorID($stateParams.id).success(function (result) {
                    vm.usuario = angular.copy(result);
                });
            }
        }

        function activate() {
            var params = {
                'skip': 0,
                'top': 10
            };
            $q.all([
                UsuariosDataService.getUsuarios(params).then(function (result) {
                    return result.data;
                })
            ]).then(function (result) {
                if (result[0]) {
                    vm.totalRows = angular.copy(result[0]['X-Total-Rows']);
                    vm.usuarios = result[0]['usuarios'];
                }
            })
        }
        activate();
    }
})();
