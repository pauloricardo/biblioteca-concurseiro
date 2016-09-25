/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('CargosDataService', CargosDataService);

CargosDataService.$inject = ['$http', '$q'];
function CargosDataService($http, $q) {

    var exports = {
        'getCargo': getCargo,
        'buscaCargoPorID' : buscaCargoPorID
    };
    return exports;

    function getCargo() {
        return $http.get('tests/mocks/cargos.json');
    }

    function buscaCargoPorID(id){
        return $http.get('tests/mocks/cargos.json');
    }
}
