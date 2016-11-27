/**
 * @ngdoc directive
 * @name biblioteca-concurseiro:fileModelDirective
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('biblioteca-concurseiro')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('change', function(){
                    scope.$apply(function(){
                        var model = $parse(attrs.fileModel);
                        var modelSetter = model.assign;
                        modelSetter(scope, elem[0].files[0]);
                    });
                });
            }
        };
}]);
