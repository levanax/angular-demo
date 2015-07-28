'use strict';

angular.module('portalDemoApp')
	.controller('marketQuoteCtrl', ['$filter', 'marketQuoteViewSvc', '$scope',
		function($filter, marketQuoteViewSvc, $scope) {
			//
			var scopePointer = $scope;
			marketQuoteViewSvc.openConnection(scopePointer);

			$scope.enterStockCode = function() {
				//blur event
				marketQuoteViewSvc.subscribeStock(scopePointer);
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
		}
	]);