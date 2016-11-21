/**
 * Created by paulo on 18/09/2016.
 */
angular.module('biblioteca-concurseiro', ['ngRoute', 'ui.tinymce', 'ui.bootstrap', 'angularFileUpload'])
    .config(['$routeProvider', '$locationProvider','$httpProvider',
     function($routeProvider, $locationProvider, $httpProvider){
       $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};

        $routeProvider
            .when('/', {
                templateUrl:'app/dashboard/templates/dashboard.template.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            })
            .when('/dashboard', {
                templateUrl:'app/dashboard/templates/dashboard.template.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            })
            .when('/dashboard/perfil/:id', {
                templateUrl:'app/dashboard/templates/dashboard.perfil.html',
                controller: 'DashboardController',
                controllerAs: 'dashboardCtrl'
            })
            .when('/questoes', {
                templateUrl:'app/questoes/templates/questoes.template.html',
                controller : 'QuestoesController',
                controllerAs : 'questoesCtrl'
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

            .when('/bancas',{
                templateUrl:'app/bancas/templates/bancas.template.html',
                controller : 'BancasController',
                controllerAs : 'bancasCtrl'
            })
            .when('/bancas/adicionar',{
                templateUrl:'app/bancas/templates/bancas.form.html',
                controller : 'BancasController',
                controllerAs : 'bancasCtrl'
            })
            .when('/bancas/editar/:id',{
                templateUrl:'app/bancas/templates/bancas.form.html',
                controller : 'BancasController',
                controllerAs : 'bancasCtrl'
            })

            .when('/disciplinas',{
                templateUrl:'app/disciplinas/templates/disciplinas.template.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })
            .when('/disciplinas/adicionar',{
                templateUrl:'app/disciplinas/templates/disciplinas.form.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })
            .when('/disciplinas/editar/:id',{
                templateUrl:'app/disciplinas/templates/disciplinas.form.html',
                controller : 'DisciplinasController',
                controllerAs : 'disciplinasCtrl'
            })
            .when('/orgaos',{
                templateUrl:'app/orgaos/templates/orgaos.template.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })
            .when('/orgaos/editar/:id',{
                templateUrl:'app/orgaos/templates/orgaos.form.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })
            .when('/orgaos/adicionar',{
                templateUrl:'app/orgaos/templates/orgaos.form.html',
                controller : 'OrgaosController',
                controllerAs : 'orgaosCtrl'
            })

            .when('/concursos',{
                templateUrl:'app/concursos/templates/concursos.template.html',
                controller : 'ConcursosController',
                controllerAs : 'concursosCtrl'
            })
            .when('/concursos/editar/:id',{
                templateUrl:'app/concursos/templates/concursos.form.html',
                controller : 'ConcursosController',
                controllerAs : 'concursosCtrl'
            })
            .when('/concursos/adicionar',{
                templateUrl:'app/concursos/templates/concursos.form.html',
                controller : 'ConcursosController',
                controllerAs : 'concursosCtrl'
            })

            .when('/cargos',{
                templateUrl:'app/cargos/templates/cargos.template.html',
                controller : 'CargosController',
                controllerAs : 'cargosCtrl'
            })
            .when('/cargos/editar/:id',{
                templateUrl:'app/cargos/templates/cargos.form.html',
                controller : 'CargosController',
                controllerAs : 'cargosCtrl'
            })
            .when('/cargos/adicionar',{
                templateUrl:'app/cargos/templates/cargos.form.html',
                controller : 'CargosController',
                controllerAs : 'cargosCtrl'
            })

            .when('/assuntos',{
                templateUrl:'app/assuntos/templates/assuntos.template.html',
                controller : 'AssuntosController',
                controllerAs : 'assuntosCtrl'
            })
            .when('/assuntos/editar/:id',{
                templateUrl:'app/assuntos/templates/assuntos.form.html',
                controller : 'AssuntosController',
                controllerAs : 'assuntosCtrl'
            })
            .when('/assuntos/adicionar',{
                templateUrl:'app/assuntos/templates/assuntos.form.html',
                controller : 'AssuntosController',
                controllerAs : 'assuntosCtrl'
            })
            .when('/provas',{
                templateUrl:'app/provas/templates/provas.template.html',
                controller : 'ProvasController',
                controllerAs : 'provasCtrl'
            })
            .when('/provas/editar/:id',{
                templateUrl:'app/provas/templates/provas.form.html',
                controller : 'ProvasController',
                controllerAs : 'provasCtrl'
            })
            .when('/provas/adicionar',{
                templateUrl:'app/provas/templates/provas.form.html',
                controller : 'ProvasController',
                controllerAs : 'provasCtrl'
            })
    }]).
filter('trust',['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);

