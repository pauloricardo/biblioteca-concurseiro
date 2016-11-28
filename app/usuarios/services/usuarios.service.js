/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('ProvasDataService', ProvasDataService);

ProvasDataService.$inject = ['$http', '$q', 'CommonConfig'];
function ProvasDataService($http, $q, CommonConfig) {
    var vm = this;
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };

    var exports = {
        'getProvas': getProvas,
        'buscaProvaPorID' : buscaProvaPorID,
        'create' : create,
        'update' : update,
        'trash' : trash
    };
    return exports;

    function getProvas(params) {
        if(params){
            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/provas/'+params['skip']+'/'+params['top'],
                headers : _headers
            });

        }else{

            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/provas',
                headers : _headers
            });
        }
    }

    function create(banca){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/provas',
            headers : _headers,
            data : banca
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/provas/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        console.log(id);
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/provas/fn/trash/'+id,
            headers : _headers
        });
    }

    function buscaProvaPorID(id){

        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/provas/'+id,
            headers : _headers
        });

    }
}


