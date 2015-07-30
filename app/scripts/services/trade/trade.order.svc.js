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
					scopePointer.order.accNum = angular.isDefined(stateParams.accNum) ? stateParams.accNum : scopePointer.accounts[0].AccNum;
					scopePointer.accountCurrent = null;
					for(var i = 0 ;i<scopePointer.accounts.length ;i++){
						if(scopePointer.order.accNum == scopePointer.accounts[i].AccNum){
							scopePointer.accountCurrent = scopePointer.accounts[i];
						}
					}
					scopePointer.order.currencyType = $filter('currencyFormat')(scopePointer.accountCurrent.CucyCode);


					//initalize market and orderType
					var markets = staticStorageSvc.get(constant.markets);
					scopePointer.markets = markets;
					scopePointer.order.market = angular.isDefined(stateParams.market) ? stateParams.market : markets[0];
					var params = {
						'sessId': accountInfoTemp.getSessionId(),
						'market': scopePointer.order.market
					}
					securityDaoSvc.queryOrderType(params).then(function(data) {
						// fill content in the switchBuyMode/switchSellMode// udpate orderSide and fill order types(select element
						scopePointer.updateOrderSide('B');
					});


					var qabParams = {
						'sessId': accountInfoTemp.getSessionId(),
						'accNum': scopePointer.order.accNum,
						'cucyCode': scopePointer.accountCurrent.CucyCode
					};
					securityDaoSvc.queryAccCashBalance(qabParams).then(function(data) {
						scopePointer.buyPower = $filter('currency')(data.getBuyPower(), '$', 2);
					});
				},
				refreshBuyPower:function(scopePointer){
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
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

					var orderTypesTempObj = staticStorageSvc.get(constant.orderType);
					if (angular.isDefined(orderTypesTempObj)) {
						scopePointer.orderTypes = orderTypesTempObj.getTypes(scopePointer.orderSide);
						scopePointer.order.type = scopePointer.orderTypes[0].OrdType;
					}
				},
				switchSellMode: function(scopePointer) {
					scopePointer.isBuy = false;
					scopePointer.isSell = true;

					var orderTypesTempObj = staticStorageSvc.get(constant.orderType);
					if (angular.isDefined(orderTypesTempObj)) {
						scopePointer.orderTypes = orderTypesTempObj.getTypes(scopePointer.orderSide);
						scopePointer.order.type = scopePointer.orderTypes[0].OrdType;
					}
				},
				signingOrder: function(scopePointer) {
					var accountInfoTemp = staticStorageSvc.get(constant.userinfo);
					var params = {
						sessId: accountInfoTemp.getSessionId(),
						sctyID: scopePointer.security.id,
						market: scopePointer.order.market,
						ordSide: scopePointer.orderSide,
						ordType: scopePointer.order.type,
						ordQty: util.parseNumber(scopePointer.order.qty, 0),
						price: util.parseNumber(scopePointer.order.price, 2),
						accNum: scopePointer.order.accNum,
						cucyCode: scopePointer.accountCurrent.CucyCode
					}
					securityDaoSvc.signingOrder(params).then(function(data) {
						if (angular.isDefined(data.OrderExecution.Order.SysCode)) {
							scopePointer.systemMsg = data.OrderExecution.Order.SysCode + ' - ' + data.OrderExecution.Order.SysMsg;
						} else {
							//success
							scopePointer.systemMsg = $filter('translate')('ORDER.ORDER_SUCCESS') + ' ' + data.OrderExecution.Order.OrdID;
						}
						scopePointer.toggleModalOrderStep1();
						scopePointer.toggleModalOrderStep2();
					});
				},
				resetForm: function(scopePointer) {
					//orderForm.reset();
					scopePointer.submitted = false;
					delete scopePointer.security.id;
					delete scopePointer.security.name;
					delete scopePointer.security.lotSize;
					delete scopePointer.order.price;
					delete scopePointer.systemMsg;
					scopePointer.order.qty = undefined;
					scopePointer.orderForm.$setPristine(); // clear from validator message
				}
			}
			return service;
		}
	]);