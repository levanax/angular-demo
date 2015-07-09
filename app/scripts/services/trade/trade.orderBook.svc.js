'use strict';

angular.module('portalDemoApp')
	.factory('orderBookViewSvc', ['securityDaoSvc','constant','staticStorageSvc',
		function(securityDaoSvc,constant,staticStorageSvc) {
			var service = {
				initialize: function(scopePointer) {
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					scopePointer.accounts = accountInfoTemp.getAccounts();
					scopePointer.accountCurrent = scopePointer.accounts[0];
					scopePointer.accNum = scopePointer.accountCurrent.AccNum;
					
					var markets = staticStorageSvc.get(constant.markets);
					if (markets == null) {
						securityDaoSvc.queryOrderMarkets({}).then(function(data) {
							scopePointer.markets = data;
							scopePointer.market = data[0];
						});
					} else {
						scopePointer.markets = markets;
						scopePointer.market = markets[0];
					}
					scopePointer.BS = "B/S";
					scopePointer.status = "All";
					scopePointer.DataRange = "1";
					this.loadOrderBook(scopePointer);
				},
				loadOrderBook:function(scopePointer){
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					var params = {
						sessId:accountInfoTemp.getSessionId(),
						accNum:scopePointer.accNum,
						cucyCode:scopePointer.accountCurrent.CucyCode
					};
					securityDaoSvc.queryOrderBook(params).then(function(data){
						var orders = data.order;
						if(angular.isDefined(orders)){
							scopePointer.ordHists = orders;
						}else{
							scopePointer.ordHists = undefined;
						}
					});
				}
			};
			return service;
		}
	])