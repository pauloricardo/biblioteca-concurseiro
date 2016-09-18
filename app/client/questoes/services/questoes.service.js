/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('QuestoesDataService', QuestoesDataService);

QuestoesDataService.$inject = ['$http', '$q'];
function QuestoesDataService($http, $q) {
    var vm = this;

    var exports = {
        'buscaQuestoesCadastradas': buscaQuestoesCadastradas,
        'buscaQuestaoPorID' : buscaQuestaoPorID
    };
    return exports;

    function buscaQuestoesCadastradas() {
        return $http.get('app/tests/mocks/questoes.json');
    }

    function buscaQuestaoPorID(id){
        return $http.get('app/tests/mocks/questoes_respostas.json');
    }
}


