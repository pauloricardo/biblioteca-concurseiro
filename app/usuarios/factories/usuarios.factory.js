/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
    .factory('ProvasFactory', ProvasFactory);

ProvasFactory.$inject = ['CommonConstants'];

function ProvasFactory(CommonConstants) {

    return {
        'convert' : convert,
        'convertList' : convertList
    };

    function convert(item){
        var converted = {};

        if(item){
            converted.id = item.id;
            converted.concurso_id = item.concurso_id;
            converted.cargo_id = item.cargo_id;
            converted.nome = item.nome;
        }else{
            converted.id = null;
            converted.concurso_id = null;
            converted.cargo_id = null;
            converted.nome = null;
        }
        return converted;
    }
    function convertList(item){
        var converted = [];
        if(item){
            angular.forEach(item, function(value){
                converted.push(convert(value));
            });
        }
        return converted;
    }
}
