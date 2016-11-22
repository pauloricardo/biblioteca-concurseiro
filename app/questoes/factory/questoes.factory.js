/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro-questoes')
    .factory('QuestoesFactory', QuestoesFactory);

QuestoesFactory.$inject = ['CommonConstants'];

function QuestoesFactory(CommonConstants) {

    return {
        'convert' : convert,
        'convertList' : convertList
    };

    function convert(item){
        var converted = {};

        if(item){
            converted.id = item.id;
            converted.disciplina_id = parseInt(item.disciplina_id);
            converted.cargo_id = parseInt(item.cargo_id);
            converted.concurso_id = parseInt(item.concurso_id);
            switch(item.tipo_questao) {
                case CommonConstants.QUESTAO.TIPO_QUESTAO.MEDIO:
                    converted.label_tipo_questao = "MÉDIO";
                    break;
                case CommonConstants.QUESTAO.TIPO_QUESTAO.FUNDAMENTAL:
                    converted.label_tipo_questao = "FUNDAMENTAL";
                    break;
                case CommonConstants.QUESTAO.TIPO_QUESTAO.SUPERIOR:
                    converted.label_tipo_questao = "SUPERIOR";
                    break;
            }
            converted.multipla_escolha = parseInt(item.multipla_escolha);
            converted.tipo_questao = parseInt(item.tipo_questao);
            converted.concurso = item.concurso;
            converted.disciplina = item.disciplina;
            converted.prova = item.prova;
            converted.assunto = item.assunto;
            converted.cargo = item.cargo;
            converted.texto = item.texto;
            converted.texto_auxiliar = item.texto_auxiliar;
            converted.respostas = item.respostas;
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
