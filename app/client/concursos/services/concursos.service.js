/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('ConcursosDataService', ConcursosDataService);

ConcursosDataService.$inject = ['$http', '$q'];
function ConcursosDataService($http, $q) {

    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };

    var exports = {
        'getConcursos': getConcursos,
        'buscaConcursoPorID': buscaConcursoPorID,
        'create': create,
        'trash': trash,
        'update': update
    };
    return exports;

    function getConcursos(params) {
        if (params) {
            return $http({
                method: 'GET',
                url: 'http://biblioteca-concurseiro:8000/api/v1/concursos/' + params['skip'] + '/' + params['top'],
                headers: _headers
            });
        } else {
            return $http({
                method: 'GET',
                url: 'http://biblioteca-concurseiro:8000/api/v1/concursos/',
                headers: _headers
            });
        }
    }

    function create(disciplina) {
        return $http({
            method: 'POST',
            url: 'http://biblioteca-concurseiro:8000/api/v1/concursos',
            headers: _headers,
            data: disciplina
        });
    }

    function update(data) {
        return $http({
            method: 'POST',
            url: 'http://biblioteca-concurseiro:8000/api/v1/concursos/' + data['id'],
            headers: _headers,
            data: data
        });
    }

    function trash(id) {
        return $http({
            method: 'GET',
            url: 'http://biblioteca-concurseiro:8000/api/v1/concursos/fn/trash/' + id,
            headers: _headers
        });
    }

    function buscaConcursoPorID(id) {

        return $http({
            method: 'GET',
            url: 'http://biblioteca-concurseiro:8000/api/v1/concursos/' + id,
            headers: _headers
        });

    }
}