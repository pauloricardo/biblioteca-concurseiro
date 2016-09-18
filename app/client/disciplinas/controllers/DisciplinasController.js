/**
 * @ngdoc controller
 * @name biblioteca-concurseiro:DashboardCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
(function(){
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('DisciplinasController', DisciplinasController);

    DisciplinasController.$inject = ['$scope'];

    function DisciplinasController($scope){
        var vm = this;
    }
});
