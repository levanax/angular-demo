'use strict';

angular.module('portalDemoApp')
	.controller('tradeOrderBookCtrl', ['orderBookViewSvc', '$scope',
		function(orderBookViewSvc, $scope) {
			$scope.$on('refreshOrderBook', function() {
				$scope.REFRESH_ORDER_BOOK();
			});
			$scope.initializeView = function() {
				var scopePointer = $scope;
				orderBookViewSvc.initialize(scopePointer);
			}
			$scope.initializeView();

			$scope.REFRESH_ORDER_BOOK = function() {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			};

			$scope.switchAccountEvent = function(input) {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.switchMarketEvent = function(input) {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.switchBSEvent = function(input) {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.switchStatusEvent = function(input) {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.switchDataRangeEvent = function(input) {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.enterSecurityEvent = function(event) {
				var scopePointer = $scope;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
		}
	]);