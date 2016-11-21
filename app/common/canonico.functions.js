/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
    .factory('Canonico', Canonico);

Canonico.$inject = [];

function Canonico() {

    return {
        'addAlert' : addAlert
    };

    function addAlert(alerts, type, message){
        alerts.push({
            'type': type,
            'message': message
        });
        alerts = alerts[0];
    }
}
