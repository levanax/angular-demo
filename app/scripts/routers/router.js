/**
 * Created by Levana.Xue on 6/9/2015.
 */
'use strict';

angular.module('portalDemoApp')
.config(function ($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  $stateProvider
    .state('login', {
      url:'/index',
      templateUrl: 'views/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('main', {
      url:'/main',
      templateUrl: 'views/main/main.html',
      controller: function(){

      }
    });
});
