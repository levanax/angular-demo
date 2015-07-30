'use strict';

angular.module("portalDemoApp")
	.directive('panelQuote', [

		function() {
			return {
				templateUrl: 'views/trade/commons/quote.html',
				replace: false,
				transclude: false,
				restrict: 'A',
				controller:'tradeQuoteCtrl'
			};
		}
	])
	.directive('panelChart', [

		function() {
			return {
				templateUrl: 'views/trade/commons/chart.html',
				replace: false,
				transclude: false,
				restrict: 'A',
				controller:'tradeChartCtrl'
			};
		}
	]);