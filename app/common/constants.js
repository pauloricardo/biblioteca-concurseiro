/**
 * Created by paulo on 18/09/2016.
 */
var CommonConstants = {
    'QUESTAO' : {
        'TIPO_QUESTAO' : {
            'MEDIO' : 1,
            'FUNDAMENTAL' : 2,
            'SUPERIOR' : 3
        },
        'TIPO_QUESTAO_LIST' : [
            {
                'id' : 1,
                'nome' : 'MEDIO'
            },
            {
                'id' : 2,
                'nome' : 'FUNDAMENTAL'

            },
            {
                'id' : 3,
                'nome' : 'SUPERIOR'
            }
        ],
        'MULTIPLA_ESCOLHA' : [
            {
                'id' : 0,
                'nome' : 'Múltipla Escolha'
            },
            {
                'id' : 1,
                'nome' : 'Verdadeiro ou Falso'

            }
        ]
    },
    'MESSAGES' : {
        'MSG_SUCESSO_PROVA_ADD' : 'Prova cadastrada com sucesso!',
        'MSG_SUCESSO_PROVA_EDIT' : 'Prova Editada com Sucesso!',
        'MSG_SUCESSO_PROVA_DELETE' : 'Prova deletada com sucesso!',
        'MSG_SUCESSO_ASSUNTO_ADD' : 'Assunto cadastrado com sucesso!',
        'MSG_SUCESSO_ASSUNTO_EDIT' : 'Assunto Editado com Sucesso!',
        'MSG_SUCESSO_ASSUNTO_DELETE' : 'Assunto deletado com sucesso!',

        'MSG_SUCESSO_QUESTAO_ADD' : 'Questão cadastrada com sucesso!',
        'MSG_SUCESSO_QUESTAO_EDIT' : 'Questão Editada com Sucesso!',
        'MSG_SUCESSO_QUESTAO_DELETE' : 'Questão deletada com sucesso!',

        'MSG_FAIL' : 'Não foi possível executar esta ação. Por favor, tente novamente!'
    }
};

angular
    .module('biblioteca-concurseiro')
    .constant('CommonConstants', CommonConstants);
