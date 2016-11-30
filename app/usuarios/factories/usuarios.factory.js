/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
    .factory('UsuariosFactory', UsuariosFactory);

UsuariosFactory.$inject = ['CommonConstants'];

function UsuariosFactory(CommonConstants) {
    return {
        'convert' : convert,
        'convertList' : convertList
    };

    function convert(item){
        var converted = {};

        if(item){
            converted.id = item.id;
            converted.email = item.email;
            converted.name = item.name;
            converted.password = item.password;
        }else{
            converted.id = null;
            converted.email = null;
            converted.nome = null;
            converted.password = null;
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
