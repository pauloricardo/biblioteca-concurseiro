/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
    .factory('QuestoesRespostaFactory', QuestoesRespostaFactory);

QuestoesRespostaFactory.$inject = ['CommonConstants'];

function QuestoesRespostaFactory(CommonConstants) {

    return {
        'construct' : construct
    };

    function construct(){
        return {
            enunciado : "",
            correta : false
        };
    }
}
