'use strict';

angular.module('portalDemoApp')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      var omnipotentState = {
        name: 'info',
        url: '/info/{businessName}',
        templateUrl: function($stateParams) {
          return 'views/info/' + $stateParams.businessName + '.html';
        },
        controller: function($scope) {

        }
      };
      var loginState = {
        name: 'login',
        url: '/index',
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      };
      $stateProvider
        .state(omnipotentState)
        .state(loginState);
    }
  ]);