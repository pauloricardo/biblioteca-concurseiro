/**
 * Created by paulo on 18/09/2016.
 */
angular.module('biblioteca-concurseiro', ['ngRoute', 'ui.tinymce', 'ui.bootstrap', 'angularFileUpload', 'oc.lazyLoad'])
    .config(['$ocLazyLoadProvider', '$routeProvider',
     function($ocLazyLoadProvider, $routeProvider){
         $ocLazyLoadProvider.config({
             debug : true
         });
       $routeProvider
           .when('/', {
               templateUrl:'app/dashboard/templates/dashboard.template.html',
               controller: 'DashboardController',
               controllerAs: 'dashboardCtrl',
               resolve : {
                   loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                       return $ocLazyLoad.load({
                           files : [
                               "app/questoes/controllers/questoes.controller.js",
                               "app/concursos/services/concursos.service.js",
                               "app/questoes/services/questoes.service.js",
                               "app/questoes/factory/questoes.factory.js",
                               "app/cargos/services/cargos.service.js",
                               "app/disciplinas/services/disciplinas.service.js",
                               "app/assuntos/services/assuntos.service.js",
                               "app/provas/services/provas.service.js",
                               "app/common/constants.js",
                               "app/common/canonico.functions.js",
                               "app/questoes/directives/fileModel.js",
                               "bower_components/angular-file-upload/dist/angular-file-upload.js"
                           ]
                       })
                   }]
               }
           }).when('/questoes', {
               templateUrl:'app/questoes/templates/questoes.template.html',
               controller : 'QuestoesController',
               controllerAs : 'questoesCtrl',
                   resolve : {
                       loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
                           return $ocLazyLoad.load({
                               files : [
                                   "app/questoes/questoes.module.js",
                                   "app/questoes/controllers/questoes.controller.js",
                                   "app/concursos/services/concursos.service.js",
                                   "app/questoes/services/questoes.service.js",
                                   "app/questoes/factory/questoes.factory.js",
                                   "app/cargos/services/cargos.service.js",
                                   "app/disciplinas/services/disciplinas.service.js",
                                   "app/assuntos/services/assuntos.service.js",
                                   "app/provas/services/provas.service.js",
                                   "app/common/constants.js",
                                   "app/common/canonico.functions.js",
                                   "app/questoes/directives/fileModel.js",
                                   "bower_components/angular-file-upload/dist/angular-file-upload.js"
                               ]
                           })
                       }]
                   }
           })
           .when('/questoes/adicionar', {
               templateUrl:'app/questoes/templates/questoes.form.template.html',
               controller : 'QuestoesController',
               controllerAs : 'questoesCtrl'
           })
           .when('/questoes/editar/:id', {
               templateUrl:'app/questoes/templates/questoes.form.template.html',
               controller : 'QuestoesController',
               controllerAs : 'questoesCtrl'
           })
        // $stateProvider
        //   .state('questoes', {
        //     url : '/questoes',
        //     controller : 'QuestoesController',
        //     controllerAs : 'questoesCtrl',
        //     templateUrl:'app/questoes/templates/questoes.template.html',
        //     resolve : {
        //         loadMyCtrl : ['$ocLazyLoad', function($ocLazyLoad){
        //             return $ocLazyLoad.load({
        //                 files : [
        //                     "app/questoes/controllers/questoes.controller.js",
        //                     "app/concursos/services/concursos.service.js",
        //                     "app/questoes/services/questoes.service.js",
        //                     "app/questoes/factory/questoes.factory.js",
        //                     "app/cargos/services/cargos.service.js",
        //                     "app/disciplinas/services/disciplinas.service.js",
        //                     "app/assuntos/services/assuntos.service.js",
        //                     "app/provas/services/provas.service.js",
        //                     "app/common/constants.js",
        //                     "app/common/canonico.functions.js",
        //                     "app/questoes/directives/fileModel.js",
        //                     "bower_components/angular-file-upload/dist/angular-file-upload.js"
        //                 ]
        //             })
        //         }]
        //     }
        //   })
        //   .state('questoes.adicionar', {
        //       url : '/questoes/adicionar',
        //       controller : 'QuestoesController',
        //       controllerAs : 'questoesCtrl',
        //       templateUrl:'app/questoes/templates/questoes.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/questoes/controllers/questoes.controller.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/questoes/services/questoes.service.js",
        //                       "app/questoes/factory/questoes.factory.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/assuntos/services/assuntos.service.js",
        //                       "app/provas/services/provas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js",
        //                       "app/questoes/directives/fileModel.js",
        //                       "bower_components/angular-file-upload/dist/angular-file-upload.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('questoes.editar', {
        //       url : '/questoes/editar/:id',
        //       controller : 'QuestoesController',
        //       controllerAs : 'questoesCtrl',
        //       templateUrl:'app/questoes/templates/questoes.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/questoes/controllers/questoes.controller.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/questoes/services/questoes.service.js",
        //                       "app/questoes/factory/questoes.factory.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/assuntos/services/assuntos.service.js",
        //                       "app/provas/services/provas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js",
        //                       "app/questoes/directives/fileModel.js",
        //                       "bower_components/angular-file-upload/dist/angular-file-upload.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('assuntos', {
        //       url : '/assuntos',
        //       controller : 'AssuntosController',
        //       controllerAs : 'assuntosCtrl',
        //       templateUrl : 'app/assuntos/templates/assuntos.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/assuntos/controllers/assuntos.controller.js",
        //                       "app/assuntos/services/assuntos.service.js",
        //                       "app/assuntos/factories/assuntos.factory.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('assuntos.adicionar', {
        //       url : '/assuntos/adicionar',
        //       controller : 'AssuntosController',
        //       controllerAs : 'assuntosCtrl',
        //       templateUrl : 'app/assuntos/templates/assuntos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/assuntos/controllers/assuntos.controller.js",
        //                       "app/assuntos/services/assuntos.service.js",
        //                       "app/assuntos/factories/assuntos.factory.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('assuntos.editar', {
        //       url : '/assuntos/editar/:id',
        //       controller : 'AssuntosController',
        //       controllerAs : 'assuntosCtrl',
        //       templateUrl : 'app/assuntos/templates/assuntos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/assuntos/controllers/assuntos.controller.js",
        //                       "app/assuntos/services/assuntos.service.js",
        //                       "app/assuntos/factories/assuntos.factory.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('bancas', {
        //       url : '/bancas',
        //       controller : 'BancasController',
        //       controllerAs : 'bancasCtrl',
        //       templateUrl : 'app/bancas/templates/bancas.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/bancas/controllers/bancas.controller.js",
        //                       "app/bancas/services/bancas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('bancas.adicionar', {
        //       url : '/bancas/adicionar',
        //       controller : 'BancasController',
        //       controllerAs : 'bancasCtrl',
        //       templateUrl : 'app/bancas/templates/bancas.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/bancas/controllers/bancas.controller.js",
        //                       "app/bancas/services/bancas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('bancas.editar', {
        //       url : '/bancas/editar/:id',
        //       controller : 'BancasController',
        //       controllerAs : 'bancasCtrl',
        //       templateUrl : 'app/bancas/templates/bancas.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/bancas/controllers/bancas.controller.js",
        //                       "app/bancas/services/bancas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('cargos', {
        //       url : '/cargos',
        //       controller : 'CargosController',
        //       controllerAs : 'cargosCtrl',
        //       templateUrl : 'app/cargos/templates/cargos.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/cargos/controllers/cargos.controller.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('cargos.adicionar', {
        //       url : '/cargos/adicionar',
        //       controller : 'CargosController',
        //       controllerAs : 'cargosCtrl',
        //       templateUrl : 'app/cargos/templates/cargos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/cargos/controllers/cargos.controller.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('cargos.editar', {
        //       url : '/cargos/editar/:id',
        //       controller : 'CargosController',
        //       controllerAs : 'cargosCtrl',
        //       templateUrl : 'app/cargos/templates/cargos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/cargos/controllers/cargos.controller.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('orgaos', {
        //       url : '/orgaos',
        //       controller : 'OrgaosController',
        //       controllerAs : 'orgaosCtrl',
        //       templateUrl : 'app/orgaos/templates/orgaos.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/orgaos/controllers/orgaos.controller.js",
        //                       "app/orgaos/services/orgaos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('orgaos.adicionar', {
        //       url : '/orgaos/adicionar',
        //       controller : 'OrgaosController',
        //       controllerAs : 'orgaosCtrl',
        //       templateUrl : 'app/orgaos/templates/orgaos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/orgaos/controllers/orgaos.controller.js",
        //                       "app/orgaos/services/orgaos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('orgaos.editar', {
        //       url : '/orgaos/editar/:id',
        //       controller : 'OrgaosController',
        //       controllerAs : 'orgaosCtrl',
        //       templateUrl : 'app/orgaos/templates/orgaos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/orgaos/controllers/orgaos.controller.js",
        //                       "app/orgaos/services/orgaos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('disciplinas', {
        //       url : '/disciplinas',
        //       controller : 'DisciplinasController',
        //       controllerAs : 'disciplinasCtrl',
        //       templateUrl : 'app/disciplinas/templates/disciplinas.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/disciplinas/controllers/disciplinas.controller.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('disciplinas.adicionar', {
        //       url : '/disciplinas/adicionar',
        //       controller : 'DisciplinasController',
        //       controllerAs : 'disciplinasCtrl',
        //       templateUrl : 'app/disciplinas/templates/disciplinas.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/disciplinas/controllers/disciplinas.controller.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('disciplinas.editar', {
        //       url : '/disciplinas/editar/:id',
        //       controller : 'DisciplinasController',
        //       controllerAs : 'disciplinasCtrl',
        //       templateUrl : 'app/disciplinas/templates/disciplinas.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/disciplinas/controllers/disciplinas.controller.js",
        //                       "app/disciplinas/services/disciplinas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('concursos', {
        //       url : '/concursos',
        //       controller : 'ConcursosController',
        //       controllerAs : 'concursosCtrl',
        //       templateUrl : 'app/concursos/templates/concursos.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/concursos/controllers/concursos.controller.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/orgaos/services/orgaos.service.js",
        //                       "app/bancas/services/bancas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('concursos.adicionar', {
        //       url : '/concursos/adicionar',
        //       controller : 'ConcursosController',
        //       controllerAs : 'concursosCtrl',
        //       templateUrl : 'app/concursos/templates/concursos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/concursos/controllers/concursos.controller.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/orgaos/services/orgaos.service.js",
        //                       "app/bancas/services/bancas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('concursos.editar', {
        //       url : '/concursos/editar/:id',
        //       controller : 'ConcursosController',
        //       controllerAs : 'concursosCtrl',
        //       templateUrl : 'app/concursos/templates/concursos.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/concursos/controllers/concursos.controller.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/orgaos/services/orgaos.service.js",
        //                       "app/bancas/services/bancas.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('provas', {
        //       url : '/provas',
        //       controller : 'ProvasController',
        //       controllerAs : 'provasCtrl',
        //       templateUrl : 'app/provas/templates/provas.template.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/provas/controllers/provas.controller.js",
        //                       "app/provas/services/provas.service.js",
        //                       "app/provas/factories/provas.factory.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('provas.adicionar', {
        //       url : '/provas/adicionar',
        //       controller : 'ProvasController',
        //       controllerAs : 'provasCtrl',
        //       templateUrl : 'app/provas/templates/provas.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/provas/controllers/provas.controller.js",
        //                       "app/provas/services/provas.service.js",
        //                       "app/provas/factories/provas.factory.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   })
        //   .state('provas.editar', {
        //       url : '/provas/editar/:id',
        //       controller : 'ProvasController',
        //       controllerAs : 'provasCtrl',
        //       templateUrl : 'app/provas/templates/provas.form.html',
        //       resolve : {
        //           loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //               return $ocLazyLoad.load({
        //                   serie : true,
        //                   files : [
        //                       "app/provas/controllers/provas.controller.js",
        //                       "app/provas/services/provas.service.js",
        //                       "app/provas/factories/provas.factory.js",
        //                       "app/concursos/services/concursos.service.js",
        //                       "app/cargos/services/cargos.service.js",
        //                       "app/common/constants.js",
        //                       "app/common/canonico.functions.js"
        //                   ]
        //               })
        //           }]
        //       }
        //   }).state('dashboard', {
        //     url : '/dashboard',
        //     controller : 'DashboardController',
        //     controllerAs : 'dashboardCtrl',
        //     templateUrl : 'app/dashboard/templates/dashboard.template.html',
        //     resolve : {
        //         loadDeps : ['$ocLazyLoad', function($ocLazyLoad){
        //             return $ocLazyLoad.load({
        //                 serie : true,
        //                 files : [
        //                     "app/dashboard/controllers/dashboard.controller.js",
        //                     "app/orgaos/services/orgaos.service.js",
        //                     "app/bancas/services/bancas.service.js",
        //                     "app/questoes/services/questoes.service.js",
        //                     "app/concursos/services/concursos.service.js",
        //                     "app/common/constants.js",
        //                     "app/common/canonico.functions.js"
        //                 ]
        //             })
        //         }]
        //     }
        // });
    }]).
filter('trust',['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);

