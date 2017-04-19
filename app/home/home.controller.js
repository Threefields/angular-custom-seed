angular.module('sample.home', [
  'ui.router',
  'LocalStorageModule',
  'angular-jwt'
])
.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: 'home/home.template.html',
    data: {
      requiresLogin: true
    }
  });
})
.controller('HomeCtrl', function HomeController($scope, $http, localStorageService, jwtHelper) {

  $scope.jwt        = localStorageService.get('jwt');
  $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

  $scope.callAnonymousApi = function() {
    callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  };

  $scope.callSecuredApi   = function() {
    callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  };

  function callApi(type, url) {
    $scope.response = null;
    $scope.api = type;
    $http({
      url: url,
      method: 'GET'
    }).then(function(quote) {
      $scope.response = quote.data;
    }, function(error) {
      $scope.response = error.data;
    });
  }

});
