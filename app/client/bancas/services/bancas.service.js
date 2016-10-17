/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('BancasDataService', BancasDataService);

BancasDataService.$inject = ['$http', '$q'];
function BancasDataService($http, $q) {
    var vm = this;
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };

    var exports = {
        'getBancas': getBancas,
        'buscaBancaPorID' : buscaBancaPorID,
        'create' : create,
        'update' : update,
        'trash' : trash
    };
    return exports;

    function getBancas(params) {
        if(params){
            return $http({
                method : 'GET',
                url : 'http://biblioteca-concurseiro:8000/api/v1/bancas/'+params['skip']+'/'+params['top'],
                headers : _headers
            });

        }else{

            return $http({
                method : 'GET',
                url : 'http://biblioteca-concurseiro:8000/api/v1/bancas',
                headers : _headers
            });
        }
    }

    function create(banca){
        return $http({
            method : 'POST',
            url : 'http://biblioteca-concurseiro:8000/api/v1/bancas/',
            headers : _headers,
            data : banca
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : 'http://biblioteca-concurseiro:8000/api/v1/bancas/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        console.log(id);
        return $http({
            method : 'GET',
            url : 'http://biblioteca-concurseiro:8000/api/v1/bancas/fn/trash/'+id,
            headers : _headers
        });
    }

    function buscaBancaPorID(id){

        return $http({
            method : 'GET',
            url : 'http://biblioteca-concurseiro:8000/api/v1/bancas/'+id,
            headers : _headers
        });

    }
}


