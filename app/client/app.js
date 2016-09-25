/**
 * Created by paulo on 18/09/2016.
 */
angular.module('biblioteca-concurseiro', ['ngRoute', 'ui.tinymce'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl:'app/client/dashboard/templates/dashboard.template.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            })
            .when('/dashboard', {
                templateUrl:'app/client/dashboard/templates/dashboard.template.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            })
            .when('/dashboard/perfil/:id', {
                templateUrl:'app/client/dashboard/templates/dashboard.perfil.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            })
            .when('/questoes', {
                templateUrl:'app/client/questoes/templates/questoes.template.html',
                controller : 'QuestoesController',
                controllerAs : 'questoesCtrl'
            })
            .when('/questoes/adicionar', {
                templateUrl:'app/client/questoes/templates/questoes.form.template.html',
                controller : 'QuestoesController',
                controllerAs : 'questoesCtrl'
            })
            .when('/questoes/editar/:id', {
                templateUrl:'app/client/questoes/templates/questoes.form.template.html',
                controller : 'QuestoesController',
                controllerAs : 'questoesCtrl'
            })

            .when('/bancas',{
                templateUrl:'app/client/bancas/templates/bancas.template.html',
                controller : 'BancasController',
                controllerAs : 'bancasCtrl'
            })
            .when('/bancas/adicionar',{
                templateUrl:'app/client/bancas/templates/bancas.form.html',
                controller : 'BancasController',
                controllerAs : 'bancasCtrl'
            })
            .when('/bancas/editar/:id',{
                templateUrl:'app/client/bancas/templates/bancas.form.html',
                controller : 'BancasController',
                controllerAs : 'bancasCtrl'
            })

            .when('/disciplinas',{
                templateUrl:'app/client/disciplinas/templates/disciplinas.template.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })
            .when('/disciplinas/adicionar',{
                templateUrl:'app/client/disciplinas/templates/disciplinas.form.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })
            .when('/disciplinas/editar/:id',{
                templateUrl:'app/client/disciplinas/templates/disciplinas.form.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })

            .when('/orgaos',{
                templateUrl:'app/client/orgaos/templates/orgaos.template.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })
            .when('/orgaos/editar/:id',{
                templateUrl:'app/client/orgaos/templates/orgaos.form.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })
            .when('/orgaos/adicionar',{
                templateUrl:'app/client/orgaos/templates/orgaos.form.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })

            .when('/concursos',{
                templateUrl:'app/client/concursos/templates/concursos.template.html',
                controller : 'ConcursosController',
                controllerAs : 'concursosCtrl'
            })
            .when('/concursos/editar/:id',{
                templateUrl:'app/client/concursos/templates/concursos.form.html',
                controller : 'ConcursosController',
                controllerAs : 'concursosCtrl'
            })
            .when('/concursos/adicionar',{
                templateUrl:'app/client/concursos/templates/concursos.form.html',
                controller : 'ConcursosController',
                controllerAs : 'concursosCtrl'
            })

            .when('/cargos',{
                templateUrl:'app/client/cargos/templates/cargos.template.html',
                controller : 'CargosController',
                controllerAs : 'cargosCtrl'
            })
            .when('/cargos/editar/:id',{
                templateUrl:'app/client/cargos/templates/cargos.form.html',
                controller : 'CargosController',
                controllerAs : 'cargosCtrl'
            })
            .when('/cargos/adicionar',{
                templateUrl:'app/client/cargos/templates/cargos.form.html',
                controller : 'CargosController',
                controllerAs : 'cargosCtrl'
            })
    }]);
