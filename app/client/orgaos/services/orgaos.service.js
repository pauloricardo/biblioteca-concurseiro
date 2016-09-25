/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('OrgaosDataService', OrgaosDataService);

OrgaosDataService.$inject = ['$http', '$q'];
function OrgaosDataService($http, $q) {
    var vm = this;

    var exports = {
        'getOrgaos': getOrgaos,
        'buscaOrgaoPorID' : buscaOrgaoPorID
    };

    return exports;

    function getOrgaos() {
        return $http.get('tests/mocks/orgaos.json');
    }

    function buscaOrgaoPorID(id){
        return $http.get('tests/mocks/orgaos.json');

    }
}
