'use strict';

angular.module('issueTracker', [
  'ngRoute',
    'issueTracker.controllers.home',
    'issueTracker.controllers.projects',
    'issueTracker.controllers.users'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');