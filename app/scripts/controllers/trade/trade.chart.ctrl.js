'use strict';

angular.module('portalDemoApp')
	.controller('tradeChartCtrl', ['$scope',
		function($scope) {
			$scope.ini = function() {
				echartsClient.ini();
				echartsClient.connect();
			}
			$scope.ini();
		}
	]);