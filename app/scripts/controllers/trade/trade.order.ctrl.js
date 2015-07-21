'use strict';

angular.module('portalDemoApp')
	.controller('tradeOrderCtrl', ['$state', '$stateParams', 'constant', '$scope', '$filter', '$timeout', 'staticStorageSvc', 'orderViewSvc',
		function($state, $stateParams, constant, $scope, $filter, $timeout, staticStorageSvc, orderViewSvc) {
			$scope.$on('$viewContentLoaded', function(event) {
				var scopePointer = $scope;
				orderViewSvc.initialize(scopePointer, $stateParams);
			});

			$scope.isEmerge = function(field) {
				if (angular.isUndefined(field)) {
					return false;
				} else {
					return true;
				}
			};

			$scope.submitted = false; // if reset form ,must set false
			$scope.interacted = function(field) {
				return $scope.submitted || field.$dirty;
			};

			$scope.$watch('order.market', function(newValue, oldValue, scope) {
				if (angular.isDefined(newValue)) {
					var markets = $scope.markets;
					for (var i = 0; i < markets.length; i++) {
						var valueTemp = markets[i];
						if (valueTemp === newValue) {
							$scope.order.marketView = $filter('marketFormat')(markets[i]);
							break;
						}
					}

				}
			});
			$scope.switchMarketEvent = function(input) {
				var params = {
					market: input
				}
				$scope.$emit('refresh.order', params);
			}
			$scope.switchAccountEvent = function(input) {
				var params = {
					market: $scope.order.market,
					accNum: input
				}
				$scope.$emit('refresh.order', params);
			}

			$scope.$watch('order.accNum', function(newValue, oldValue, scope) {
				if (angular.isDefined(newValue)) {
					var accounts = $scope.accounts;
					for (var i = 0; i < accounts.length; i++) {
						var valueTemp = accounts[i].AccNum;
						if (valueTemp === newValue) {
							$scope.order.accNumView = $filter('accFormat')(accounts[i]);
							break;
						}
					}
				}
			})

			$scope.$watch('order.side', function(input, oldInput, childScope) {
				if (angular.isString(input)) {
					$scope.resetFormEvent();
					var scopePointer = $scope;
					if (input === 'B') {
						orderViewSvc.switchBuyMode(scopePointer);
					} else {
						orderViewSvc.switchSellMode(scopePointer);
					}
				}
			});
			$scope.updateOrderSide = function(orderSideParam) {
				var orderSide = orderSideParam.toUpperCase();
				if ($scope.order.side !== orderSide) {
					$scope.order.side = angular.uppercase(orderSide);
				}
			}

			$scope.enterSecurityEvent = null;
			$scope.$watch('security.id', function(newValue, oldValue, scope) {
				var securityIdEle = orderForm.securityId;
				if (angular.isDefined(securityIdEle) && securityIdEle.$error) {
					return false;
				}
				var securityId = newValue;
				$timeout.cancel($scope.enterSecurityEvent);
				if (util.isNotEmpty(securityId)) {
					$scope.enterSecurityEvent = $timeout(function() {
						console.log(securityId);
						$scope.enterSecurityId();
						$timeout.cancel($scope.enterSecurityEvent);
					}, 3000);
				}
			});
			$scope.securityKeyDown = function(event) {
				if (event.keyCode === 13) {
					$timeout.cancel($scope.enterSecurityEvent);
					$scope.enterSecurityId();
					event.preventDefault();
				}
			}
			$scope.enterSecurityId = function() {
				var scopePointer = $scope;
				orderViewSvc.enterSecurity(scopePointer);
			}

			$scope.$watch('order.type', function(newValue, oldValue, scope) {
				if (angular.isDefined(newValue)) {
					var types = $scope.orderTypes;
					for (var i = 0; i < types.length; i++) {
						var valueTemp = types[i].OrdType;
						if (valueTemp === newValue) {
							$scope.order.typeView = $filter('orderTypeByLocal')(types[i].OrdTypeName);
							break;
						}
					}

				}
			})

			$scope.$watch('order.price', function(newValue, oldValue, scope) {
				if (angular.isDefined($scope.security.name) && angular.isDefined(newValue)) {
					var buyPower = util.parseNumber($scope.buyPower);
					var price = util.parseNumber(newValue);
					$scope.order.ableBuyQty = util.divide(buyPower, price, 0);
					$scope.order.priceView = $filter('currency')(price)
				} else {
					$scope.order.ableBuyQty = undefined;
				}
			},true);

			$scope.priceDown = function() {
				var price = $scope.order.price;
				if (util.isNotEmpty(price)) {
					var price = parseFloat(util.parseNumber(price,2)) - 0.5;
					$scope.order.price = $filter('figure')(price);
				}
			}
			$scope.priceUp = function() {
				var price = $scope.order.price;
				if (util.isNotEmpty(price)) {
					var price = parseFloat(util.parseNumber(price,2)) + 0.5;
					$scope.order.price = $filter('figure')(price);
				}
			}

			$scope.formatPrice = function(input) {
				if (angular.isDefined(input)) {
					var value = util.parseNumber(input);
					$scope.order.price = $filter('figure')(value);
				}
			}

			//code 更新 Model ，不会触发 ngChange
			$scope.formatQty = function(input) {
				if (angular.isDefined(input)) {
					var value = util.parseNumber(input);
					$scope.order.qty = $filter('figure')(value);
				}
			}

			$scope.$watch('order.qty', function(newValue, oldValue, scope) {

			});
			$scope.qtyDown = function() {
				var qty = $scope.order.qty;
				if (util.isNotEmpty(qty)) {
					var qty = parseInt(util.parseNumber(qty,0)) - 1000;
					$scope.order.qty = $filter('figure')(qty);
				}
			}
			$scope.qtyUp = function() {
				var qty = $scope.order.qty;
				if (util.isNotEmpty(qty)) {
					var qty = parseInt(util.parseNumber(qty,0)) + 1000;
					$scope.order.qty = $filter('figure')(qty);
				}
			}
			$scope.qtyUpTop = function() {
				var qty = 10000;
				$scope.order.qty = $filter('figure')(qty);
			}

			$scope.submit = function() {
				$scope.submitted = true;
				if ($scope.orderForm.$valid) {
					$("#newPopUp").modal('toggle');//use directives
				}
			}
			$scope.resetFormEvent = function() {
				var scopePointer = $scope;
				orderViewSvc.resetForm(scopePointer);
			}

			$scope.signingOrderEvent = function() {
				var scopePointer = $scope;
				orderViewSvc.signingOrder(scopePointer);
			}

			$scope.reloadPanel = function() {
				$("#resultPopUp").modal('toggle');
				$timeout(function() {
					$scope.$emit('refresh.order', {});
				}, 1000);
			}
		}
	]);