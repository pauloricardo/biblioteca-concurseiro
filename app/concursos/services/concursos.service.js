/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('ConcursosDataService', ConcursosDataService);

ConcursosDataService.$inject = ['$http', '$q', 'CommonConfig'];
function ConcursosDataService($http, $q, CommonConfig) {

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
                url: CommonConfig.getBaseUrl() + '/concursos/' + params['skip'] + '/' + params['top'],
                headers: _headers
            });
        } else {
            return $http({
                method: 'GET',
                url: CommonConfig.getBaseUrl() + '/concursos/',
                headers: _headers
            });
        }
    }

    function create(disciplina) {
        return $http({
            method: 'POST',
            url: CommonConfig.getBaseUrl() + '/concursos',
            headers: _headers,
            data: disciplina
        });
    }

    function update(data) {
        return $http({
            method: 'POST',
            url: CommonConfig.getBaseUrl() + '/concursos/' + data['id'],
            headers: _headers,
            data: data
        });
    }

    function trash(id) {
        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/concursos/fn/trash/' + id,
            headers: _headers
        });
    }

    function buscaConcursoPorID(id) {

        return $http({
            method: 'GET',
            url: CommonConfig.getBaseUrl() + '/concursos/' + id,
            headers: _headers
        });

    }
}