'use strict';

angular.module('portalDemoApp')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      var tradeState = {
        name: 'trade',
        url: '/trade/{target}',
        templateUrl: 'views/trade/trade.html',
        controller: 'tradeCtrl'
        /*controller:['$state',function($state){
      //this one controller is not defined. 
      //In the other routers, Can't through 'tradeController' to refer to the controller. [solution:use 'controllerAs']
      $state.go('trade.order',{},{location:false});
    }]*/
      }
      var tradeOrderState = {
        name: 'trade.order',
        url: '/trade/order?market&{accNum:int}',
        views: {
          'content@trade': {
            templateUrl: 'views/trade/commons/order.html',
            controller: 'tradeOrderCtrl'
          }
        },
        resolve: {
          markets: ['constant', 'staticStorageSvc', 'securityDaoSvc',
            function(constant, staticStorageSvc, securityDaoSvc) {
              var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
              var params = {
                'sessId': accountInfoTemp.getSessionId()
              }
              return securityDaoSvc.queryOrderMarkets(params).then(function(data) {
                return data;
              })
            }
          ]
        }
      }
      var tradeOrderBookState = {
        name: 'trade.orderBook',
        url: '/trade/orderBook',
        views: {
          'content@trade': {
            templateUrl: 'views/trade/commons/orderBook.html',
            controller: 'tradeOrderBookCtrl'
          }
        }
      }

      $stateProvider
        .state(tradeState)
        .state(tradeOrderState)
        .state(tradeOrderBookState);
    }
  ]);