/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('AssuntosDataService', AssuntosDataService);

AssuntosDataService.$inject = ['$http', '$q', 'CommonConfig'];
function AssuntosDataService($http, $q, CommonConfig) {
    var vm = this;
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };

    var exports = {
        'getAssuntos': getAssuntos,
        'buscaAssuntoPorID' : buscaAssuntoPorID,
        'create' : create,
        'update' : update,
        'trash' : trash
    };
    return exports;

    function getAssuntos(params) {
        if(params){
            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/assuntos/'+params['skip']+'/'+params['top'],
                headers : _headers
            });

        }else{

            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/assuntos',
                headers : _headers
            });
        }
    }

    function create(banca){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/assuntos',
            headers : _headers,
            data : banca
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/assuntos/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        console.log(id);
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/assuntos/fn/trash/'+id,
            headers : _headers
        });
    }

    function buscaAssuntoPorID(id){

        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/assuntos/'+id,
            headers : _headers
        });

    }
}


