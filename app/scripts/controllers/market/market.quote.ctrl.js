'use strict';

angular.module('portalDemoApp')
	.controller('marketQuoteCtrl', ['securityDaoSvc','constant','staticStorageSvc','$filter', 'marketQuoteViewSvc', '$scope',
		function(securityDaoSvc,constant,staticStorageSvc,$filter, marketQuoteViewSvc, $scope) {

			$scope.enterStockCode = function() {
				//blur event
				var scopePointer = $scope;
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

			$scope.ini = function() {
				var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
				var params = {
					'sessId': accountInfoTemp.getSessionId()
				}
				var scopePointer = $scope;
				securityDaoSvc.queryCometdToken(params).then(function(data) {
					var token = data.token;
					marketQuoteViewSvc.openConnection(scopePointer,token);
				});
			}
			$scope.ini();
		}
	]);