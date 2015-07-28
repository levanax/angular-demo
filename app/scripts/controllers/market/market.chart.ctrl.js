'use strict';

angular.module('portalDemoApp')
	.controller('marketChartCtrl', ['$scope',
		function($scope) {
			$scope.ini = function() {
				echartsClient.ini();
				echartsClient.connect();
			}
			$scope.ini();
		}
	]);