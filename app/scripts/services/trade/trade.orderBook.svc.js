'use strict';

angular.module('portalDemoApp')
	.factory('orderBookViewSvc', ['securityDaoSvc', 'constant', 'staticStorageSvc',
		function(securityDaoSvc, constant, staticStorageSvc) {
			var service = {
				initialize: function(scopePointer) {
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					scopePointer.accounts = accountInfoTemp.getAccounts();
					scopePointer.accountCurrent = scopePointer.accounts[0];
					scopePointer.accNum = scopePointer.accountCurrent.AccNum;
					scopePointer.noRecords = true;

					var params = {
						'sessId': accountInfoTemp.getSessionId()
					}
					securityDaoSvc.queryOrderMarkets(params).then(function(data) {
						scopePointer.markets = data;
						scopePointer.market = data[0];
					});

					scopePointer.BS = "B/S";
					scopePointer.status = "All";
					scopePointer.DataRange = "1";
					this.loadOrderBook(scopePointer);
				},
				loadOrderBook: function(scopePointer) {
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					var params = {
						sessId: accountInfoTemp.getSessionId(),
						accNum: scopePointer.accNum,
						cucyCode: scopePointer.accountCurrent.CucyCode
					};
					securityDaoSvc.queryOrderBook(params).then(function(data) {
						var orders = data.Order;
						if (angular.isDefined(orders)) {
							if ( ! angular.isArray(orders)) {
								orders = new Array(orders);
							}
							scopePointer.ordHists = orders;
							scopePointer.noRecords = false;
						} else {
							scopePointer.ordHists = undefined;
							scopePointer.noRecords = true;
						}
					});
				}
			};
			return service;
		}
	])