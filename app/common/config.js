CommonConfig.$inject = ['$http', '$q'];
function CommonConfig($http, $q) {
    var vm = this;
    vm.config = {
        "host" : "http://biblioteca-concurseiro:8000/",
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
        }

    };
}

angular
    .module('biblioteca-concurseiro')
    .factory('CommonConfig', CommonConfig);