'use strict';

angular.module('portalDemoApp')
	.factory('orderViewSvc', ['$translate', '$filter', 'staticStorageSvc', 'httpSvc', 'constant', 'securityDaoSvc',
		function($translate, $filter, staticStorageSvc, httpSvc, constant, securityDaoSvc) {
			var service = {
				initialize: function(scopePointer) {
					scopePointer.order = {};
					scopePointer.security = {};
					//session value.
					scopePointer.isBuy = false;
					scopePointer.isSell = false;
					scopePointer.accountCurrent = null;

					scopePointer.updateOrderSide('buy');
					var markets = staticStorageSvc.get(constant.markets);
					if (markets == null) {
						securityDaoSvc.queryOrderMarkets({}).then(function(data) {
							scopePointer.markets = data;
							scopePointer.order.market = data[0];
							var params = {
								'market': scopePointer.order.market
							}
							securityDaoSvc.queryOrderType(params).then(function(data) {
								var orderTypesTemp = data.getTypes(scopePointer.order.side);
								scopePointer.orderTypes = orderTypesTemp;
								scopePointer.order.type = orderTypesTemp[0].OrdType + ',' + orderTypesTemp[0].GTD;
							});
						});
					} else {
						scopePointer.markets = markets;
						scopePointer.order.market = markets[0];

						var orderTypesTemp = staticStorageSvc.get(constant.orderTypes).getTypes(scopePointer.order.side);
						scopePointer.orderTypes = orderTypesTemp;
						scopePointer.order.type = orderTypesTemp[0].OrdType + ',' + orderTypesTemp[0].GTD;
					}

					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					scopePointer.accounts = accountInfoTemp.getAccounts();
					scopePointer.accountCurrent = accountInfoTemp.getAccounts()[0];
					scopePointer.order.accNum = scopePointer.accountCurrent.AccNum;
					scopePointer.order.currencyType = $filter('currencyFormat')(scopePointer.accountCurrent.CucyCode);

					var qabParams = {
						'sessId': accountInfoTemp.getSessionId(),
						'accNum': scopePointer.order.accNum,
						'cucyCode': scopePointer.accountCurrent.CucyCode
					};
					securityDaoSvc.queryAccCashBalance(qabParams).then(function(data) {
						scopePointer.buyPower = $filter('currency')(data.getBuyPower(), '$', 2);
					});

					$("#switch").bootstrapSwitch();
					$('[data-toggle="popover"]').popover();
					$(".form_datetime").datetimepicker({
						format: "yyyy-mm-dd"
					});
				},
				enterSecurity: function(scopePointer) {
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					var params = {
						sessId: accountInfoTemp.getSessionId(),
						sctyID: scopePointer.security.id,
						market: scopePointer.order.market
					};
					securityDaoSvc.querySecurity(params).then(function(data) {
						scopePointer.security.lotSize = $filter('number')(data.Static.LotSize);
						scopePointer.security.name = $filter('siftingSecurityName')(data.Static.SctyName);
					});
				}
			}
			return service;
		}
	]);