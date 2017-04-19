angular.module('sample', [
  'sample.home',
  'sample.login',
  'sample.signup',
  'angular-jwt',
  'LocalStorageModule'
])
.config(function myAppConfig($urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  jwtInterceptorProvider.tokenGetter = function(localStorageService) {
    return localStorageService.get('jwt');
  }

  $httpProvider.interceptors.push('jwtInterceptor');
})
.run(function($rootScope, $state, localStorageService, jwtHelper) {
  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.data && to.data.requiresLogin) {
      if (!localStorageService.get('jwt') || jwtHelper.isTokenExpired(localStorageService.get('jwt'))) {
        e.preventDefault();
        $state.go('login');
      }
    }
  });
})
.controller('AppCtrl', function AppCtrl($scope, $location) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Sample' ;
    }
  });
});
