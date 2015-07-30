'use strict';

angular.module('portalDemoApp')
	.controller('tradeQuoteCtrl', ['securityDaoSvc', 'constant', 'staticStorageSvc', '$filter', 'tradeQuoteViewSvc', '$scope',
		function(securityDaoSvc, constant, staticStorageSvc, $filter, tradeQuoteViewSvc, $scope) {

			$scope.$on('quote.query', function(event, params) {
				if (angular.isString(params)) {
					$scope.stockCode = params;
					var scopePointer = $scope;
					tradeQuoteViewSvc.subscribeStock(scopePointer);
				}
			});

			$scope.priceClickEvent = function(price) {
				if (angular.isString(price)) {
					var params = {
						stockCode: $scope.stockCode,
						price: price
					}
					$scope.$emit('emit.order.set',params);
				}
			}

			$scope.enterStockCode = function(event) {
				if (event.keyCode == 13) {
					var scopePointer = $scope;
					tradeQuoteViewSvc.subscribeStock(scopePointer);
				}
			}
			$scope.isEmerge = function(field) {
				if (angular.isUndefined(field)) {
					return false;
				} else {
					return true;
				}
			};

			$scope.getText = function(key) {
				var result = null;
				if (angular.isString(key)) {
					result = $filter('translate')(key);
				}
				return result;
			}

			$scope.ini = function() {
				var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
				var params = {
					'sessId': accountInfoTemp.getSessionId()
				}
				var scopePointer = $scope;
				securityDaoSvc.queryCometdToken(params).then(function(data) {
					var token = data.token;
					tradeQuoteViewSvc.openConnection(scopePointer, token);
				});
			}
			$scope.ini();
		}
	]);