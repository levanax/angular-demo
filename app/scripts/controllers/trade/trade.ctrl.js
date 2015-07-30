'use strict';

angular.module('portalDemoApp')
	.controller('tradeCtrl', ['tradeQuoteViewSvc', 'staticStorageSvc', '$scope', '$state',
		function(tradeQuoteViewSvc, staticStorageSvc, $scope, $state) {
			$scope.$on('$viewContentLoaded', function(event) {

			});

			$scope.$on('emit.quote', function(event, params) {
				$scope.$broadcast('quote.query', params);
			});
			$scope.$on('emit.chart', function(event, params) {
				$scope.$broadcast('chart.update', params);
			});
			$scope.$on('emit.order.set', function(event, params) {
				$scope.$broadcast('order.set', params);
			});

			$scope.$on('refresh.order', function(e, params) {
				//$state.go('trade.order', params,{reload:true,location: false,inherit:false});
				$scope.$broadcast('refreshOrderBook');
				$scope.$broadcast('refreshOrder');
			});
			$scope.$on('refresh.orderBook', function(e, params) {
				$scope.$broadcast('refreshOrderBook');
			});

			$scope.exit = function() {
				tradeQuoteViewSvc.closeConnection();
				staticStorageSvc.clear();
				$state.go('login');
			}
			//load order
			$state.go('trade.order', {}, {
				location: false
			});
		}
	]);