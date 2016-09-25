(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('BancasController', BancasController);

    BancasController.$inject = ['$route', '$routeParams', 'BancasDataService'];

    function BancasController($route,$routeParams, BancasDataService) {
        var vm = this;

        vm.getBanca = getBanca;

        function getBanca(){
            if ($routeParams.id !== undefined) {
                BancasDataService.buscaBancaPorID({id: $routeParams.id}).success(function(result){
                    vm.banca = angular.copy(result.bancas[0]);
                });
            }
        }

        function activate(){
            BancasDataService.getBancas().then(function(result){
                vm.bancas = result.data;
            });
        }
        activate();


    }
})();
