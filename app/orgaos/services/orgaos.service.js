/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('OrgaosDataService', OrgaosDataService);

OrgaosDataService.$inject = ['$http', '$q', 'CommonConfig'];
function OrgaosDataService($http, $q, CommonConfig) {
    var vm = this;
    var _headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
    };
    var exports = {
        'getOrgaos': getOrgaos,
        'buscaOrgaoPorID' : buscaOrgaoPorID,
        'create' : create,
        'trash' : trash,
        'update' : update
    };

    return exports;

    function getOrgaos(params) {
        if(params){
            return $http({
                method : 'GET',
                url : CommonConfig.getBaseUrl() + '/orgaos/'+params['skip']+'/'+params['top'],
                headers : _headers
            });
        }else{
            return $http({
                method : 'GET',
                url :CommonConfig.getBaseUrl() + '/orgaos',
                headers : _headers
            });
        }
    }
    function create(orgao){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/orgaos',
            headers : _headers,
            data : orgao
        });
    }

    function update(data){
        return $http({
            method : 'POST',
            url : CommonConfig.getBaseUrl() + '/orgaos/'+data['id'],
            headers : _headers,
            data : data
        });
    }

    function trash(id){
        console.log(id);
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/orgaos/fn/trash/'+id,
            headers : _headers
        });
    }

    function buscaOrgaoPorID(id){
        return $http({
            method : 'GET',
            url : CommonConfig.getBaseUrl() + '/orgaos/'+id,
            headers : _headers
        });
    }
}
