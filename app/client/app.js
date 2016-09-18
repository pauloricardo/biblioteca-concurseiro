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
            .when('/disciplinas',{
                templateUrl:'app/client/disciplinas/templates/disciplinas.template.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })
            .when('/orgaos',{
                templateUrl:'app/client/orgaos/templates/orgaos.template.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })
    }]);
