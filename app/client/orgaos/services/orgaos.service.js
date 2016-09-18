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
        'getOrgaos': getOrgaos
    };
    return exports;

    function getOrgaos() {
        return $http.get('app/tests/mocks/orgaos.json');
    }
}


/**
 * Created by paulo on 18/09/2016.
 */
