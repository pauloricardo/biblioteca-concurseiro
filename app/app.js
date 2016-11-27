/**
 * Created by paulo on 18/09/2016.
 */
angular.module('biblioteca-concurseiro', ['ui.router', 'ui.tinymce', 'ui.bootstrap', 'angularFileUpload', 'oc.lazyLoad', 'angular-jwt'])
    .config(['$ocLazyLoadProvider', '$stateProvider', '$httpProvider',
        function ($ocLazyLoadProvider, $stateProvider, $httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
                var loginModal, $http, $state;

                // this trick must be done so that we don't receive
                // `Uncaught Error: [$injector:cdep] Circular dependency found`
                $timeout(function () {
                    loginModal = $injector.get('loginModal');
                    $http = $injector.get('$http');
                    $state = $injector.get('$state');
                });

                return {
                    responseError: function (rejection) {
                        if (rejection.status !== 401) {
                            return rejection;
                        }

                        var deferred = $q.defer();

                        loginModal()
                            .then(function () {
                                deferred.resolve($http(rejection.config));
                            })
                            .catch(function () {
                                $state.go('login');
                                deferred.reject(rejection);
                            });

                        return deferred.promise;
                    }
                };
            });
            $httpProvider.interceptors.push(function (AuthService) {
                return {
                    // automatically attach Authorization header
                    request: function (config) {
                        var token = AuthService.getToken();
                        if (token) {
                            config.headers.Authorization = 'Bearer ' + token;
                        }
                        return config;
                    },

                    // If a token was sent back, save it
                    response: function (res) {
                        if (res.data.token) {
                            AuthService.saveToken(res.data.token);
                        }
                        return res;
                    }
                }
            });
            $ocLazyLoadProvider.config({
                debug: false
            });
            $stateProvider.state('welcome', {
                url: '/',
                template:'<ui-view></ui-view>',
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
                .state('app.assuntos', {
                    url: '/app/assuntos',
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
                                    "app/disciplinas/services/disciplinas.service.js",
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.assuntos.adicionar', {
                    url: '/app/assuntos/adicionar',
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
                                    "app/disciplinas/services/disciplinas.service.js",
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.assuntos.editar', {
                    url: '/app/assuntos/editar/:id',
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
                                    "app/disciplinas/services/disciplinas.service.js",
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.bancas', {
                    url: '/app/bancas',
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
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.bancas.adicionar', {
                    url: '/app/bancas/adicionar',
                    views: {
                        'app-view': {
                            controller: 'BancasController',
                            controllerAs: 'bancasCtrl',
                            templateUrl: 'app/bancas/templates/bancas.form.html'
                        }
                    },
                    resolve: {
                        loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    "app/common/config.js",
                                    "app/bancas/controllers/bancas.controller.js",
                                    "app/bancas/services/bancas.service.js",
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"

                                ]
                            })
                        }]
                    }
                })
                .state('app.bancas.editar', {
                    url: '/app/bancas/editar/:id',
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
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.cargos', {
                    url: '/app/cargos',
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
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.cargos.adicionar', {
                    url: '/app/cargos/adicionar',
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
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.cargos.editar', {
                    url: '/app/cargos/editar/:id',
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
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.orgaos', {
                    url: '/app/orgaos',
                    controller: 'OrgaosController',
                    controllerAs: 'orgaosCtrl',
                    templateUrl: 'app/orgaos/templates/orgaos.template.html',
                    resolve: {
                        loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    "app/orgaos/controllers/orgaos.controller.js",
                                    "app/orgaos/services/orgaos.service.js",
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.orgaos.adicionar', {
                    url: '/app/orgaos/adicionar',
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
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.orgaos.editar', {
                    url: '/app/orgaos/editar/:id',
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
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.disciplinas', {
                    url: '/app/disciplinas',
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
                                    "app/common/constants.js",
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.disciplinas.adicionar', {
                    url: '/app/disciplinas/adicionar',
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
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.disciplinas.editar', {
                    url: '/app/disciplinas/editar/:id',
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
                                    "app/common/canonico.functions.js"
                                ]
                            })
                        }]
                    }
                })
                .state('app.concursos', {
                    url: '/app/concursos',
                    controller: 'ConcursosController',
                    controllerAs: 'concursosCtrl',
                    templateUrl: 'app/concursos/templates/concursos.template.html',
                    resolve: {
                        loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    "app/concursos/controllers/concursos.controller.js",
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
                    url: '/app/concursos/adicionar',
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
                    url: '/app/concursos/editar/:id',
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
                    url: '/app/provas',
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
                    url: '/app/provas/adicionar',
                    controller: 'ProvasController',
                    controllerAs: 'provasCtrl',
                    templateUrl: 'app/provas/templates/provas.form.html',
                    resolve: {
                        loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    "app/provas/controllers/provas.controller.js",
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
                    url: '/app/provas/editar/:id',
                    controller: 'ProvasController',
                    controllerAs: 'provasCtrl',
                    templateUrl: 'app/provas/templates/provas.form.html',
                    resolve: {
                        loadDeps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    "app/provas/controllers/provas.controller.js",
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
                }).state('app.dashboard', {
                url: '/app/dashboard',
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
        }]).filter('trust', ['$sce', function ($sce) {
    return function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}]).run(function ($rootScope, $state, loginModal) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        if (requireLogin && typeof $rootScope.token === 'undefined') {
            event.preventDefault();
            loginModal()
                .then(function () {
                    return $state.go(toState.name, toParams);
                })
                .catch(function () {
                    return $state.go('welcome');
                });
        }
    });
});

