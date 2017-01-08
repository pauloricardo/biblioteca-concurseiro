CommonConfig.$inject = ['$http', '$q', '$window'];
function CommonConfig($http, $q, $window) {
    var vm = this;
    vm.config = {
        "host" : "http://www.bibliotecadoconcurseiro.com.br/api-questoes/public/",
        "apiContext" : "api/",
        "version" : "v1"
    };
    return {
        getHost : function(){
            return vm.config.host;
        },
        getApi : function(){
            return vm.config.apiContext;
        },
        getVersion : function(){
            return vm.config.version;
        },
        getBaseUrl : function(){
            return vm.config.host + vm.config.apiContext + vm.config.version;
        },
        getLoginUrl : function(){
            return vm.config.host;
        },
        getToken : function(){
            return $window.localStorage['jwtToken'];
        }
    };
}
angular
    .module('biblioteca-concurseiro')
    .factory('CommonConfig', CommonConfig);