'use strict';

angular.module('portalDemoApp')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      var marketState = {
        name: 'market',
        url: '/market',
        templateUrl: 'views/market/market.html',
        controller: 'marketCtrl'
      };

      var marketQuoteState = {
        name: 'market.quote',
        url: '/market/quote',
        views: {
          'content@market': {
            templateUrl: 'views/market/commons/quote.html',
            controller: 'marketQuoteCtrl'
          }
        }
      };

      $stateProvider
        .state(marketState)
        .state(marketQuoteState);
    }
  ]);