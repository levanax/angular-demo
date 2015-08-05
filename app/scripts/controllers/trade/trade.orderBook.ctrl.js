'use strict';

angular.module('portalDemoApp')
	.controller('tradeOrderBookCtrl', ['orderBookViewSvc', '$scope',
		function(orderBookViewSvc, $scope) {
			$scope.$on('refreshOrderBook', function() {
				$scope.REFRESH_ORDER_BOOK();
			});

			/*$scope.$watch('obStockInput',function(newInput,input,event){
				//test
				console.log(newInput)
			})*/
			
			/*var childScope = $scope.$new();
			console.log(childScope);*/

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
				scopePointer.accNum = input;//mark
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.switchMarketEvent = function(input) {
				var scopePointer = $scope;
				scopePointer.market = input;
				orderBookViewSvc.loadOrderBook(scopePointer);
			}
			$scope.switchBSEvent = function(input) {
				var scopePointer = $scope;
				scopePointer.BS = input;
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