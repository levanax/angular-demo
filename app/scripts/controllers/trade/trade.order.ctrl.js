'use strict';

angular.module('portalDemoApp')
	.controller('tradeOrderCtrl', ['constant', '$scope', '$filter', '$timeout', 'dataStorageSvc', 'securitySvc', 'orderViewSvc',
		function(constant, $scope, $filter, $timeout, dataStorageSvc, securitySvc, orderViewSvc) {
			$scope.$on('$viewContentLoaded', function(event) {
				var scopePointer = $scope;
				orderViewSvc.initialize(scopePointer);
			});

			$scope.submitted = false;
			$scope.interacted = function(field) {
				return $scope.submitted || field.$dirty;
			};

			$scope.$watch('order.side', function(input, oldInput, childScope) {
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
				if(orderForm.securityId.$error){
					return false;
				}
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

			$scope.$watch('order.price', function(newValue, oldValue, scope) {

			});
			$scope.priceDown = function() {
				var price = $scope.order.price;
				if (util.isNotEmpty(price)) {
					$scope.order.price = parseFloat(price) - 0.5;
				}
			}
			$scope.priceUp = function() {
				var price = $scope.order.price;
				if (util.isNotEmpty(price)) {
					$scope.order.price = (parseFloat(price) + 0.5);
				}
			}

			$scope.$watch('order.qty', function(newValue, oldValue, scope) {

			});
			$scope.qtyDown = function() {
				var qty = $scope.order.qty;
				if (util.isNotEmpty(qty)) {
					$scope.order.qty = (parseInt(qty) - 1000);
				}
			}
			$scope.qtyUp = function() {
				var qty = $scope.order.qty;
				if (util.isNotEmpty(qty)) {
					$scope.order.qty = (parseInt(qty) + 1000);
				}
			}
			$scope.qtyUpTop = function() {
				$scope.order.qty = 10000;
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

			$scope.submit = function() {
				$scope.submitted = true;
				if ($scope.orderForm.$valid) {
					$("#newPopUp").modal('toggle');
				}
			}
		}
	]);