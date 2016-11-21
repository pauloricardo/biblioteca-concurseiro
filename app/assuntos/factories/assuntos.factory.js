/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
    .factory('AssuntosFactory', AssuntosFactory);

AssuntosFactory.$inject = ['CommonConstants'];

function AssuntosFactory(CommonConstants) {

    return {
        'convert' : convert,
        'convertList' : convertList
    };

    function convert(item){
        var converted = {};

        if(item){
            converted.id = item.id;
            converted.disciplina_id = item.disciplina_id;
            converted.nome = item.nome;
        }else{
            converted.id = null;
            converted.disciplina_id = null;
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
