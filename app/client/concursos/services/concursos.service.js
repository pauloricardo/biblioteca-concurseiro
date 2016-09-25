angular
    .module('biblioteca-concurseiro')
    .service('ConcursosDataService', ConcursosDataService);

ConcursosDataService.$inject = ['$http', '$q'];
function ConcursosDataService($http, $q) {

    var exports = {
        'getConcursos': getConcursos,
        'buscaConcursoPorID' : buscaConcursoPorID
    };
    return exports;

    function getConcursos() {
        return $http.get('tests/mocks/concursos.json');
    }

    function buscaConcursoPorID(id){
        return $http.get('tests/mocks/concursos.json');

    }
}


