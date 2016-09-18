/**
 * @ngdoc controller
 * @name biblioteca-concurseiro:DashboardCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
(function () {
    'use strict';

    angular.module('biblioteca-concurseiro')
        .controller('BancasController', BancasController);

    BancasController.$inject = ['$scope'];

    function BancasController($scope) {
        var vm = this;
    }
});
