'use strict';

angular.module('portalDemoApp')
	.factory('orderViewSvc', ['usersDao', '$translate', '$filter', 'staticStorageSvc', 'constant', 'securityDaoSvc',
		function(usersDao, $translate, $filter, staticStorageSvc, constant, securityDaoSvc) {
			var service = {
				initialize: function(scopePointer, stateParams) {
					scopePointer.order = {};
					scopePointer.security = {};
					//session value.
					scopePointer.isBuy = false;
					scopePointer.isSell = false;
					scopePointer.accountCurrent = null;

					//initalize accounts and buypower
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					scopePointer.accounts = accountInfoTemp.getAccounts();
					scopePointer.accountCurrent = accountInfoTemp.getAccounts()[0];
					scopePointer.order.accNum = angular.isDefined(stateParams.accNum) ? stateParams.accNum : scopePointer.accountCurrent.AccNum;
					scopePointer.order.currencyType = $filter('currencyFormat')(scopePointer.accountCurrent.CucyCode);


					//initalize market and orderType
					var markets = staticStorageSvc.get(constant.markets);
					if (markets == null) {
						var securityDaoSvcBak = securityDaoSvc;
						var params = {
							'sessId': accountInfoTemp.getSessionId()
						}
						securityDaoSvc.queryOrderMarkets(params).then(function(data) {
							scopePointer.markets = data;
							scopePointer.order.market = angular.isDefined(stateParams.market) ? stateParams.market : data[0];
							var params = {
								'sessId': accountInfoTemp.getSessionId(),
								'market': scopePointer.order.market
							}
							securityDaoSvcBak.queryOrderType(params).then(function(data) {
								// fill content in the switchBuyMode/switchSellMode// udpate order side and fill order types(select element
								scopePointer.updateOrderSide('B');
							});
						});
					} else {
						scopePointer.markets = markets;
						scopePointer.order.market = angular.isDefined(stateParams.market) ? stateParams.market : markets[0];
						// udpate order side and fill order types(select element
						scopePointer.updateOrderSide('B');
					}
					var qabParams = {
						'sessId': accountInfoTemp.getSessionId(),
						'accNum': scopePointer.order.accNum,
						'cucyCode': scopePointer.accountCurrent.CucyCode
					};
					securityDaoSvc.queryAccCashBalance(qabParams).then(function(data) {
						scopePointer.buyPower = $filter('currency')(data.getBuyPower(), '$', 2);
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
						if (angular.isDefined(data.Static)) {
							scopePointer.security.lotSize = $filter('number')(data.Static.LotSize);
							scopePointer.security.name = $filter('siftingSecurityName')(data.Static.SctyName);
							if (scopePointer.isSell) {
								var params = {
									sessId: accountInfoTemp.getSessionId(),
									accNum: scopePointer.order.accNum,
									sctyID: scopePointer.security.id,
									market: scopePointer.order.market,
									cucyCode: scopePointer.accountCurrent.CucyCode
								}
								usersDao.Security.queryBalance(params).then(function(data) {
									var sctyBal = data.SctyBal;
									if (angular.isDefined(sctyBal)) {
										scopePointer.order.ableSellQty = $filter('number')(sctyBal.LockupSctyBal) + ' / ' + $filter('number')(sctyBal.LedgerSctyBal);
									} else {
										scopePointer.order.ableSellQty = '0 / 0';
									}
								})
							}
						} else {
							scopePointer.security.name = 'Securities Null';
						}
					});
				},
				calculatedAbleBuyQty: function(scopePointer) {
					//xml max buy qty????
					var buyPower = util.parseNumber(scopePointer.buyPower);
					var price = util.parseNumber(scopePointer.order.price);
					scopePointer.order.ableBuyQty = util.divide(buyPower, price, 0);
				},
				switchBuyMode: function(scopePointer) {
					scopePointer.isBuy = true;
					scopePointer.isSell = false;

					var orderTypesTempObj = staticStorageSvc.get(constant.orderTypes);
					if (angular.isDefined(orderTypesTempObj)) {
						scopePointer.orderTypes = orderTypesTempObj.getTypes(scopePointer.order.side);
						scopePointer.order.type = scopePointer.orderTypes[0].OrdType;
					}
				},
				switchSellMode: function(scopePointer) {
					scopePointer.isBuy = false;
					scopePointer.isSell = true;

					var orderTypesTempObj = staticStorageSvc.get(constant.orderTypes);
					if (angular.isDefined(orderTypesTempObj)) {
						scopePointer.orderTypes = orderTypesTempObj.getTypes(scopePointer.order.side);
						scopePointer.order.type = scopePointer.orderTypes[0].OrdType;
					}
				},
				signingOrder: function(scopePointer) {
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					var params = {
						sessId: accountInfoTemp.getSessionId(),
						sctyID: scopePointer.security.id,
						market: scopePointer.order.market,
						ordSide: scopePointer.order.side,
						ordType: scopePointer.order.type,
						ordQty: scopePointer.order.qty,
						price: scopePointer.order.price,
						accNum: scopePointer.order.accNum,
						cucyCode: scopePointer.accountCurrent.CucyCode
					}
					securityDaoSvc.signingOrder(params).then(function(data) {
						scopePointer.systemMsg = data.OrderExecution.Order.SysCode + ' - ' + data.OrderExecution.Order.SysMsg;
						$("#newPopUp").modal('toggle');
						$("#resultPopUp").modal('toggle');
					});
				},
				resetForm: function(scopePointer) {
					//orderForm.reset();
					scopePointer.submitted = false;
					scopePointer.security.id = undefined;
					scopePointer.security.name = undefined;
					scopePointer.security.lotSize = undefined;
					scopePointer.order.price = undefined;
					scopePointer.order.qty = undefined;
					scopePointer.orderForm.$setPristine(); // clear from validator message
				}
			}
			return service;
		}
	]);