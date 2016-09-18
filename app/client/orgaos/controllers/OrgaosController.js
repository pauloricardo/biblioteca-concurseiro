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
        .controller('OrgaosController', OrgaosController);

    OrgaosController.$inject = ['$scope'];

    function OrgaosController($scope){
        var vm = this;
    }
});
