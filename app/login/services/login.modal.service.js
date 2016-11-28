/**
 * Created by paulo on 18/09/2016.
 */
angular
    .module('biblioteca-concurseiro')
    .service('loginModal', loginModal);

loginModal.$inject = ['$uibModal', '$rootScope'];
function loginModal($uibModal, $rootScope) {


    function assignCurrentUser(token) {
        $rootScope.token = token;
        return token;
    }

    return function () {
        var instance = $uibModal.open({
            templateUrl: 'app/login/templates/login.form.template.html',
            controller: 'LoginModalController',
            controllerAs: 'loginModalCtrl',
            backdrop: 'static'
        });
        return instance.result.then(assignCurrentUser);
    };
}