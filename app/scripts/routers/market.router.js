'use strict';

angular.module('portalDemoApp')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      var marketState = {
        name: 'market',
        url: '/market/{target}',
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

      var marketChartState = {
        name: 'market.chart',
        url: '/market/chart',
        views: {
          'content@market': {
            templateUrl: 'views/market/commons/chart.html',
            controller: 'marketChartCtrl'
          }
        }
      };

      $stateProvider
        .state(marketState)
        .state(marketQuoteState)
        .state(marketChartState);
    }
  ]);