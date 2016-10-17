
angular
    .module('biblioteca-concurseiro')
    .factory('ConcursoDataFactory', ConcursoDataFactory);

ConcursoDataFactory.$inject = ['$scope'];
function ConcursosDataService($scope) {


    var exports = {
        'convertConcursoToSelect': convertConcursoToSelect
    };
    return exports;

    function convertConcursoToSelect(item) {
        var converted = [];
        if(item){
            angular.forEach(item, function(value, key){

            });
        }

    }
}