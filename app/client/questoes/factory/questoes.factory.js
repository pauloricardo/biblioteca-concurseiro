/**
 * @ngdoc service
 * @name biblioteca-concurseiro:QuestoesFactory
 *
 * @description
 *
 *
 * */
angular.module('biblioteca-concurseiro')
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
            converted.disciplina_id = item.disciplina_id;
            converted.cargo_id = item.cargo_id;
            converted.concurso_id = item.concurso_id;
            switch(item.tipo_questao){
                case CommonConstants.QUESTAO.TIPO_QUESTAO.MÉDIO:
                    converted.label_tipo_questao = "MÉDIO";
                    break;
                case CommonConstants.QUESTAO.TIPO_QUESTAO.TÉCNICO:
                    converted.label_tipo_questao = "TÉCNICO";
                    break;
                case CommonConstants.QUESTAO.TIPO_QUESTAO.SUPERIOR:
                    converted.label_tipo_questao = "SUPERIOR";
                    break;
            }
            converted.multipla_escolha = item.multipla_escolha;
            converted.tipo_questao = item.tipo_questao;
            converted.concurso = item.concurso;
            converted.disciplina = item.disciplina;
            converted.cargo = item.cargo;
            converted.texto = item.texto;
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
