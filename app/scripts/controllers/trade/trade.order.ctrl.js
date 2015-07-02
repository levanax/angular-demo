'use strict';

angular.module('portalDemoApp')
	.controller('tradeOrderCtrl', ['constant', '$scope', '$filter', '$timeout', 'dataStorageSvc', 'securitySvc', 'orderViewSvc',
		function(constant, $scope, $filter, $timeout, dataStorageSvc, securitySvc, orderViewSvc) {
			$scope.$on('$viewContentLoaded', function(event) {
				var scopePointer = $scope;
				orderViewSvc.initialize(scopePointer);
			});


			$scope.$watch('order.side', function(input, oldInput, childScope) {
				console.log('in wathc ................')
				if (angular.isString(input)) {
					if (input === 'BUY') {
						$scope.isBuy = true;
						$scope.isSell = false;
					} else {
						$scope.isBuy = false;
						$scope.isSell = true;
					}
				}
			});
			$scope.updateOrderSide = function(orderSide) {
				$scope.order.side = angular.uppercase(orderSide);
			}

			$scope.enterSecurityEvent = null;
			$scope.$watch('security.id', function(newValue, oldValue, scope) {
				var securityId = newValue;
				$timeout.cancel($scope.enterSecurityEvent);
				if (util.isNotEmpty(securityId)) {
					$scope.enterSecurityEvent = $timeout(function() {
						console.log(securityId);
					}, 3000);
				}
			});
			$scope.enterSecurityId = function() {
				var queryParams = {
					stockCode: $scope.stock,
					accNum: $scope.accNum,
					market: $scope.market,
					tradeSide: $scope.tradeSide
				}
				securitySvc.query(queryParams).then(function(data) {

				});
			}

			$scope.isHiddenPriceSperad = false;
			$scope.$watch('security.priceSperad', function() {
				var priceSperad = $scope.security.priceSperad;
				if (angular.isString(priceSperad)) {
					$scope.isHiddenPriceSperad = false;
				} else {
					$scope.isHiddenPriceSperad = true;
				}
			});
		}
	]);