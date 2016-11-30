/**
 * Created by paulo.r.monteiro on 28/11/2016.
 */


angular.module('biblioteca-concurseiro')
  .config(['$ocLazyLoadProvider', '$stateProvider', '$httpProvider',
    function ($ocLazyLoadProvider, $stateProvider, $httpProvider) {
      $ocLazyLoadProvider.config({
        debug: false
      });
      $stateProvider.state('welcome', {
          url: '/',
          template: '<ui-view></ui-view>',
          data: {
            requireLogin: false // this property will apply to all children of 'app'
          }
        })
        .state('login', {
          url: '/login',
          controller: 'LoginModalController',
          controllerAs: 'loginModalCtrl',
          templateUrl: 'app/login/templates/login.form.template.html',
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  "app/login/controllers/login.controller.js",
                  "app/login/services/authservice.js",
                  "app/login/factory/authinterceptor.js",
                  "app/login/services/login.modal.service.js",
                  "app/common/config.js",
                  "app/login/services/user.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app', {
          template: '<ui-view></ui-view>',
          abstract: true,
          data: {
            requireLogin: true // this property will apply to all children of 'app'
          }
        })
        .state('app.questoes', {
          url: '',
          cache: false,
          template: "<ui-view></ui-view>"
        }).state('app.questoes.home', {
          url: '/questoes',
          cache: false,
          views: {
            '': {
              templateUrl: 'app/questoes/templates/questoes.html',
              controller: 'QuestoesController',
              controllerAs: 'questoesCtrl'
            }
          },
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  "app/questoes/controllers/questoes.controller.js",
                  "app/concursos/services/concursos.service.js",
                  "app/questoes/services/questoes.service.js",
                  "app/questoes/factory/questoes.factory.js",
                  "app/cargos/services/cargos.service.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/assuntos/services/assuntos.service.js",
                  "app/provas/services/provas.service.js",
                  "app/common/constants.js",
                  "app/common/config.js",
                  "app/common/canonico.functions.js",
                  "app/questoes/directives/fileModel.js",
                  "bower_components/angular-file-upload/dist/angular-file-upload.js"
                ]
              })
            }]
          }
        })
        .state('app.questoes.adicionar', {
          url: '/questoes/adicionar',
          cache: false,
          parent: 'app.questoes',
          controller: 'QuestoesFormController',
          controllerAs: 'questoesFormCtrl',
          templateUrl: 'app/questoes/templates/questoes.form.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  "app/questoes/controllers/questoes.form.controller.js",
                  "app/concursos/services/concursos.service.js",
                  "app/questoes/services/questoes.service.js",
                  "app/questoes/factory/questoes.factory.js",
                  "app/common/config.js",
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
        .state('app.questoes.editar', {
          url: '/questoes/editar/:id',
          controller: 'QuestoesFormController',
          controllerAs: 'questoesFormCtrl',
          templateUrl: 'app/questoes/templates/questoes.form.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/questoes/controllers/questoes.form.controller.js",
                  "app/concursos/services/concursos.service.js",
                  "app/questoes/services/questoes.service.js",
                  "app/questoes/factory/questoes.factory.js",
                  "app/cargos/services/cargos.service.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/assuntos/services/assuntos.service.js",
                  "app/common/config.js",
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
        /** assuntos **/
        .state('app.assuntos', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.assuntos.home', {
          url: '/assuntos',
          controller: 'AssuntosController',
          controllerAs: 'assuntosCtrl',
          templateUrl: 'app/assuntos/templates/assuntos.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/assuntos/controllers/assuntos.controller.js",
                  "app/assuntos/services/assuntos.service.js",
                  "app/assuntos/factories/assuntos.factory.js",
                  "app/common/config.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.assuntos.adicionar', {
          url: '/assuntos/adicionar',
          controller: 'AssuntosController',
          controllerAs: 'assuntosCtrl',
          templateUrl: 'app/assuntos/templates/assuntos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/assuntos/controllers/assuntos.controller.js",
                  "app/assuntos/services/assuntos.service.js",
                  "app/common/config.js",
                  "app/assuntos/factories/assuntos.factory.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.assuntos.editar', {
          url: '/assuntos/editar/:id',
          controller: 'AssuntosController',
          controllerAs: 'assuntosCtrl',
          templateUrl: 'app/assuntos/templates/assuntos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/assuntos/controllers/assuntos.controller.js",
                  "app/assuntos/services/assuntos.service.js",
                  "app/assuntos/factories/assuntos.factory.js",
                  "app/common/config.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.bancas', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.bancas.home', {
          url: '/bancas',
          controller: 'BancasController',
          controllerAs: 'bancasCtrl',
          templateUrl: 'app/bancas/templates/bancas.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/common/config.js",
                  "app/bancas/controllers/bancas.controller.js",
                  "app/bancas/services/bancas.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.bancas.adicionar', {
          url: '/bancas/adicionar',
          controller: 'BancasController',
          controllerAs: 'bancasCtrl',
          templateUrl: 'app/bancas/templates/bancas.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/common/config.js",
                  "app/bancas/controllers/bancas.controller.js",
                  "app/bancas/services/bancas.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"

                ]
              })
            }]
          }
        })
        .state('app.bancas.editar', {
          url: '/bancas/editar/:id',
          controller: 'BancasController',
          controllerAs: 'bancasCtrl',
          templateUrl: 'app/bancas/templates/bancas.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/common/config.js",
                  "app/bancas/controllers/bancas.controller.js",
                  "app/bancas/services/bancas.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.cargos', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.cargos.home', {
          url: '/cargos',
          controller: 'CargosController',
          controllerAs: 'cargosCtrl',
          templateUrl: 'app/cargos/templates/cargos.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/cargos/controllers/cargos.controller.js",
                  "app/cargos/services/cargos.service.js",
                  "app/common/constants.js",
                  "app/common/config.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.cargos.adicionar', {
          url: '/adicionar',
          controller: 'CargosController',
          controllerAs: 'cargosCtrl',
          templateUrl: 'app/cargos/templates/cargos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/cargos/controllers/cargos.controller.js",
                  "app/cargos/services/cargos.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.cargos.editar', {
          url: '/cargos/editar/:id',
          controller: 'CargosController',
          controllerAs: 'cargosCtrl',
          templateUrl: 'app/cargos/templates/cargos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/cargos/controllers/cargos.controller.js",
                  "app/cargos/services/cargos.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.orgaos', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.orgaos.home', {
          url: '/orgaos',
          controller: 'OrgaosController',
          controllerAs: 'orgaosCtrl',
          templateUrl: 'app/orgaos/templates/orgaos.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/orgaos/controllers/orgaos.controller.js",
                  "app/common/config.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.orgaos.adicionar', {
          url: '/orgaos/adicionar',
          controller: 'OrgaosController',
          controllerAs: 'orgaosCtrl',
          templateUrl: 'app/orgaos/templates/orgaos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/orgaos/controllers/orgaos.controller.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.orgaos.editar', {
          url: '/orgaos/editar/:id',
          controller: 'OrgaosController',
          controllerAs: 'orgaosCtrl',
          templateUrl: 'app/orgaos/templates/orgaos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/orgaos/controllers/orgaos.controller.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/common/constants.js",
                  "app/common/config.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.disciplinas', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.disciplinas.home', {
          url: '/disciplinas',
          controller: 'DisciplinasController',
          controllerAs: 'disciplinasCtrl',
          templateUrl: 'app/disciplinas/templates/disciplinas.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/disciplinas/controllers/disciplinas.controller.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.disciplinas.adicionar', {
          url: '/disciplinas/adicionar',
          controller: 'DisciplinasController',
          controllerAs: 'disciplinasCtrl',
          templateUrl: 'app/disciplinas/templates/disciplinas.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/disciplinas/controllers/disciplinas.controller.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/common/constants.js",
                  "app/common/config.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.disciplinas.editar', {
          url: '/disciplinas/editar/:id',
          controller: 'DisciplinasController',
          controllerAs: 'disciplinasCtrl',
          templateUrl: 'app/disciplinas/templates/disciplinas.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/disciplinas/controllers/disciplinas.controller.js",
                  "app/disciplinas/services/disciplinas.service.js",
                  "app/common/config.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.concursos', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.concursos.home', {
          url: '/concursos',
          controller: 'ConcursosController',
          controllerAs: 'concursosCtrl',
          templateUrl: 'app/concursos/templates/concursos.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/concursos/controllers/concursos.controller.js",
                  "app/common/config.js",
                  "app/concursos/services/concursos.service.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/bancas/services/bancas.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })

        .state('app.concursos.adicionar', {
          url: '/concursos/adicionar',
          controller: 'ConcursosController',
          controllerAs: 'concursosCtrl',
          templateUrl: 'app/concursos/templates/concursos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/concursos/controllers/concursos.controller.js",
                  "app/concursos/services/concursos.service.js",
                  "app/common/config.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/bancas/services/bancas.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.concursos.editar', {
          url: '/concursos/editar/:id',
          controller: 'ConcursosController',
          controllerAs: 'concursosCtrl',
          templateUrl: 'app/concursos/templates/concursos.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/concursos/controllers/concursos.controller.js",
                  "app/common/config.js",
                  "app/concursos/services/concursos.service.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/bancas/services/bancas.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.provas', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.provas.home', {
          url: '/provas',
          controller: 'ProvasController',
          controllerAs: 'provasCtrl',
          templateUrl: 'app/provas/templates/provas.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/provas/controllers/provas.controller.js",
                  "app/provas/services/provas.service.js",
                  "app/common/config.js",
                  "app/provas/factories/provas.factory.js",
                  "app/concursos/services/concursos.service.js",
                  "app/cargos/services/cargos.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.provas.adicionar', {
          url: '/provas/adicionar',
          controller: 'ProvasController',
          controllerAs: 'provasCtrl',
          templateUrl: 'app/provas/templates/provas.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/provas/controllers/provas.controller.js",
                  "app/common/config.js",
                  "app/provas/services/provas.service.js",
                  "app/provas/factories/provas.factory.js",
                  "app/concursos/services/concursos.service.js",
                  "app/cargos/services/cargos.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.provas.editar', {
          url: '/provas/editar/:id',
          controller: 'ProvasController',
          controllerAs: 'provasCtrl',
          templateUrl: 'app/provas/templates/provas.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/provas/controllers/provas.controller.js",
                  "app/common/config.js",
                  "app/provas/services/provas.service.js",
                  "app/provas/factories/provas.factory.js",
                  "app/concursos/services/concursos.service.js",
                  "app/cargos/services/cargos.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.usuarios', {
          url: '',
          template: '<ui-view></ui-view>'
        })
        .state('app.usuarios.home', {
          url: '/usuarios',
          controller: 'UsuariosController',
          controllerAs: 'usuariosCtrl',
          templateUrl: 'app/usuarios/templates/usuarios.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/usuarios/controllers/usuarios.controller.js",
                  "app/usuarios/services/usuarios.service.js",
                  "app/common/config.js",
                  "app/usuarios/factories/usuarios.factory.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.usuarios.adicionar', {
          url: '/usuarios/adicionar',
          controller: 'UsuariosController',
          controllerAs: 'usuariosCtrl',
          templateUrl: 'app/usuarios/templates/usuarios.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/usuarios/controllers/usuarios.controller.js",
                  "app/usuarios/services/usuarios.service.js",
                  "app/common/config.js",
                  "app/usuarios/factories/usuarios.factory.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.usuarios.editar', {
          url: '/usuarios/editar/:id',
          controller: 'UsuariosController',
          controllerAs: 'usuariosCtrl',
          templateUrl: 'app/usuarios/templates/usuarios.form.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/usuarios/controllers/usuarios.controller.js",
                  "app/usuarios/services/usuarios.service.js",
                  "app/common/config.js",
                  "app/usuarios/factories/usuarios.factory.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        })
        .state('app.dashboard', {
          url: '/dashboard',
          controller: 'DashboardController',
          controllerAs: 'dashboardCtrl',
          templateUrl: 'app/dashboard/templates/dashboard.template.html',
          resolve: {
            loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                serie: true,
                files: [
                  "app/dashboard/controllers/dashboard.controller.js",
                  "app/orgaos/services/orgaos.service.js",
                  "app/common/config.js",
                  "app/bancas/services/bancas.service.js",
                  "app/questoes/services/questoes.service.js",
                  "app/concursos/services/concursos.service.js",
                  "app/common/constants.js",
                  "app/common/canonico.functions.js"
                ]
              })
            }]
          }
        });
    }]);
