'use strict';

angular.module('portalDemoApp')
.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  var tradeState = {
    name:'trade',
    url:'/trade',
    templateUrl:'views/trade/trade.html',
    controller:['$state',function($state){
      $state.go('trade.order',{},{location:false});
    }]
  }
  var tradeOrderState = {
    name:'trade.order',
    views:{
      'order@trade':{
        templateUrl:'views/trade/commons/order.html',
        controller:['constant','$scope','dataStorageSvc',function(constant,$scope,dataStorageSvc){
          $scope.accounts = dataStorageSvc.session.get(constant.userinfo).AccProfile.Account;
        }]
      }
    }
  }
  $stateProvider
    .state(tradeState)
    .state(tradeOrderState);
}]);
