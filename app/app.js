'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
  'ngRoute',
    'issueTracker.home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
//CORRECT???
//    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/');
