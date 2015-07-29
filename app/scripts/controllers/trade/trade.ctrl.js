'use strict';

angular.module('portalDemoApp')
	.controller('tradeCtrl', ['tradeQuoteViewSvc','staticStorageSvc','$scope', '$state',
		function(tradeQuoteViewSvc,staticStorageSvc,$scope, $state) {
			$scope.$on('$viewContentLoaded', function(event) {
				$state.go('trade.order', {}, {
					location: false
				});
			});

			$scope.$on('refresh.order', function(e, params) {
				$state.go('trade.order', params,{reload:true,location: false,inherit:false});
				$scope.$broadcast('refreshOrderBook');
			});
			$scope.$on('refresh.orderBook', function(e, params) {
				$scope.$broadcast('refreshOrderBook');
			});

			$scope.exit = function(){
				tradeQuoteViewSvc.closeConnection();
				staticStorageSvc.clear();
				$state.go('login');
			}
		}
	]);