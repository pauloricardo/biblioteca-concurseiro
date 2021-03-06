/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('CargosDataService', CargosDataService);

CargosDataService.$inject = ['$http', '$q', 'CommonConfig'];
function CargosDataService($http, $q, CommonConfig) {
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };

    var exports = {
        'getCargo': getCargo,
        'getCargos': getCargos,
        'buscaCargoPorID' : buscaCargoPorID,
        'create' : create,
        'trash' : trash,
        'update' : update
    };
    return exports;

    function create(cargo){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/cargos',
            headers : _headers,
            data : cargo
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/cargos/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        console.log(id);
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/cargos/fn/trash/'+id,
            headers : _headers
        });
    }

    function getCargo(id) {
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/cargos/'+id,
            headers : _headers
        });
    }

    function getCargos(params){
        if(params){
            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/cargos/'+params['skip']+'/'+params['top'],
                headers : _headers
            });
        }else{
            return $http({
                method : 'GET',
                url :CommonConfig.getBaseUrl() + '/cargos',
                headers : _headers
            });
        }

    }

    function buscaCargoPorID(id){
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/cargos/'+id,
            headers : _headers
        });
    }
}
