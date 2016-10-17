/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('DisciplinasDataService', DisciplinasDataService);

DisciplinasDataService.$inject = ['$http', '$q'];
function DisciplinasDataService($http, $q) {


    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };
    var exports = {
        'getDisciplinas': getDisciplinas,
        'buscaDisciplinaPorID' : buscaDisciplinaPorID,
        'create' : create,
        'trash' : trash,
        'update' : update
     };
    return exports;
    function getDisciplinas(params) {
        if(params){
            return $http({
                method : 'GET',
                url : 'http://biblioteca-concurseiro:8000/api/v1/disciplinas/'+params['skip']+'/'+params['top'],
                headers : _headers
            });
        }else{
            return $http({
                method : 'GET',
                url : 'http://biblioteca-concurseiro:8000/api/v1/disciplinas/',
                headers : _headers
            });

        }
    }

    function create(disciplina){
        return $http({
            method : 'POST',
            url : 'http://biblioteca-concurseiro:8000/api/v1/disciplinas/',
            headers : _headers,
            data : disciplina
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : 'http://biblioteca-concurseiro:8000/api/v1/disciplinas/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        console.log(id);
        return $http({
            method : 'GET',
            url : 'http://biblioteca-concurseiro:8000/api/v1/disciplinas/fn/trash/'+id,
            headers : _headers
        });
    }

    function buscaDisciplinaPorID(id){

      return $http({
        method : 'GET',
        url : 'http://biblioteca-concurseiro:8000/api/v1/disciplinas/'+id,
        headers : _headers
      });

    }
}