/**
 * Created by paulo on 18/09/2016.
 */
var CommonConstants = {
    'QUESTAO' : {
        'TIPO_QUESTAO' : {
            'MÉDIO' : 1,
            'TÉCNICO' : 2,
            'SUPERIOR' : 3
        },
        'TIPO_QUESTAO_LIST' : [
            {
                'id' : 1,
                'nome' : 'MÉDIO'
            },
            {
                'id' : 2,
                'nome' : 'TÉCNICO'

            },
            {
                'id' : 3,
                'nome' : 'SUPERIOR'
            }
        ],
        'MULTIPLA_ESCOLHA' : [
            {
                'id' : 0,
                'nome' : 'SIM'
            },
            {
                'id' : 1,
                'nome' : 'NÃO'

            }
        ]
    }
};

angular
    .module('biblioteca-concurseiro')
    .constant('CommonConstants', CommonConstants);
