/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('DisciplinasDataService', DisciplinasDataService);

DisciplinasDataService.$inject = ['$http', '$q'];
function DisciplinasDataService($http, $q) {

    var exports = {
        'getDisciplinas': getDisciplinas,
        'buscaDisciplinaPorID' : buscaDisciplinaPorID
    };
    return exports;

    function getDisciplinas() {
        return $http.get('tests/mocks/disciplinas.json');
    }

    function buscaDisciplinaPorID(id){
        return $http.get('tests/mocks/disciplinas.json');

    }
}


/**
 * Created by paulo on 18/09/2016.
 */
