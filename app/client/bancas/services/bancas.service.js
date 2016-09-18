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
        'getBancas': getBancas
    };
    return exports;

    function getBancas() {
        return $http.get('app/tests/mocks/bancas.json');
    }
}


