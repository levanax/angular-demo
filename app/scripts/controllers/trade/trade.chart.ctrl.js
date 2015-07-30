'use strict';

angular.module('portalDemoApp')
	.controller('tradeChartCtrl', ['$scope',
		function($scope) {
			$scope.ini = function(args) {
				echartsClient.ini(args);
				echartsClient.connect();
			}
			$scope.ini();

			$scope.$on('chart.update',function(event,params){
				if(angular.isString(params)){
					$scope.ini(params);
				}
			});
		}
	]);