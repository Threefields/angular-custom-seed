angular.module('sample.signup', [
  'ui.router',
  'LocalStorageModule'
])
.config(function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    controller: 'SignupCtrl',
    templateUrl: 'signup/signup.template.html'
  });
})
.controller('SignupCtrl', function SignupController($scope, $http, localStorageService, $state) {

  $scope.user = {};

  $scope.createUser = function() {
    $http({
      url: 'http://localhost:3001/users',
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
