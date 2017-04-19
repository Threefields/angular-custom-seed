angular.module('sample.login', [
  'ui.router',
  'LocalStorageModule'
])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'login/login.template.html'
  });
})
.controller('LoginCtrl', function LoginController($scope, $http, localStorageService, $state) {

  $scope.user = {};

  $scope.login = function() {
    $http({
      url: 'http://localhost:3001/sessions/create',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
      localStorageService.set('jwt', response.data.id_token);
      $state.go('home');
    }, function(error) {
      alert(error.data);
    });
  };

});
