/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('UsuariosDataService', UsuariosDataService);

UsuariosDataService.$inject = ['$http', '$q', 'CommonConfig'];
function UsuariosDataService($http, $q, CommonConfig) {
    var vm = this;
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };

    var exports = {
        'getUsuarios': getUsuarios,
        'buscaUsuarioPorID' : buscaUsuarioPorID,
        'create' : create,
        'update' : update,
        'trash' : trash
    };
    return exports;

    function getUsuarios(params) {
        if(params){
            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/usuarios/'+params['skip']+'/'+params['top'],
                headers : _headers
            });
        }else{
            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/usuarios',
                headers : _headers
            });
        }
    }

    function create(usuario){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/usuarios',
            headers : _headers,
            data : usuario
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/usuarios/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/usuarios/fn/trash/'+id,
            headers : _headers
        });
    }

    function buscaUsuarioPorID(id){
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/usuarios/'+id,
            headers : _headers
        });

    }
}


