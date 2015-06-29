'use strict';

angular.module('portalDemoApp')
.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  var tradeState = {
    name:'trade',
    url:'/trade',
    templateUrl:'views/trade/trade.html',
    controller:['$state',function($state){
      //this one controller is not defined. 
      //In the other routers, Can't through 'tradeController' to refer to the controller. [solution:use 'controllerAs']
      $state.go('trade.order',{},{location:false});
    }]
  }
  var tradeOrderState = {
    name:'trade.order',
    views:{
      'order@trade':{
        templateUrl:'views/trade/commons/order.html',
        controller:'tradeOrderCtrl'
      }
    }
  }
  $stateProvider
    .state(tradeState)
    .state(tradeOrderState);
}]);
