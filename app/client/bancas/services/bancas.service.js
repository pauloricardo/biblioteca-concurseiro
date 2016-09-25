/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('BancasDataService', BancasDataService);

BancasDataService.$inject = ['$http', '$q'];
function BancasDataService($http, $q) {
    var vm = this;

    var exports = {
        'getBancas': getBancas,
        'buscaBancaPorID' : buscaBancaPorID
    };
    return exports;

    function getBancas() {
        return $http.get('tests/mocks/bancas.json');
    }


    function buscaBancaPorID(id){
        return $http.get('tests/mocks/bancas.json');

    }
}


