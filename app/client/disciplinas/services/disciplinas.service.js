/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('DisciplinasDataService', DisciplinasDataService);

DisciplinasDataService.$inject = ['$http', '$q'];
function DisciplinasDataService($http, $q) {
    var vm = this;

    var exports = {
        'getDisciplinas': getDisciplinas
    };
    return exports;

    function getDisciplinas() {
        return $http.get('/tests/mocks/disciplinas.json');
    }
}


/**
 * Created by paulo on 18/09/2016.
 */
