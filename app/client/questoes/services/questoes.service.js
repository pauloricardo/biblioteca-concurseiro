/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('QuestoesDataService', QuestoesDataService);

QuestoesDataService.$inject = ['$http', '$q'];
function QuestoesDataService($http, $q) {
    var vm = this;


    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };
    var exports = {
        'getQuestoes': getQuestoes,
        'buscaQuestaoPorID': buscaQuestaoPorID,
        'create': create,
        'trash': trash,
        'update': update
    };
    return exports;

    function getQuestoes(_params) {
        if (_params) {
            return $http({
                method: 'GET',
                url: 'http://biblioteca-concurseiro:8000/api/v1/questoes',
                headers: _headers,
                params : _params
            });
        } else {
            return $http({
                method: 'GET',
                url: 'http://biblioteca-concurseiro:8000/api/v1/questoes',
                headers: _headers
            });
        }
    }

    function buscaQuestaoPorID(id) {
        return $http({
            method: 'GET',
            url: 'http://biblioteca-concurseiro:8000/api/v1/questoes/' + id,
            headers: _headers
        });
    }

    function create(orgao) {
        return $http({
            method: 'POST',
            url: 'http://biblioteca-concurseiro:8000/api/v1/questoes/',
            headers: _headers,
            data: orgao
        });
    }

    function update(data) {
        return $http({
            method: 'POST',
            url: 'http://biblioteca-concurseiro:8000/api/v1/questoes/' + data['id'],
            headers: _headers,
            data: data
        });
    }

    function trash(id) {
        return $http({
            method: 'GET',
            url: 'http://biblioteca-concurseiro:8000/api/v1/questoes/fn/trash/' + id,
            headers: _headers
        });
    }
}


