'use strict';

angular.module('portalDemoApp')
	.factory('orderViewSvc', ['$filter', 'staticStorageSvc','httpSvc','constant','dataStorageSvc',
		function($filter, staticStorageSvc,httpSvc,constant,dataStorageSvc) {
			var service = {
				initialize: function(scopePointer) {
					scopePointer.order = {};
					scopePointer.security = {};
					//session value.
					scopePointer.isBuy = false;
					scopePointer.isSell = false;
					scopePointer.accountCurrent = null;

					scopePointer.markets = null;
					
					scopePointer.updateOrderSide('buy');
					scopePointer.order.type = null;

					var userInfoTemp = staticStorageSvc.get(constant.userinfo);

					scopePointer.accounts = userInfoTemp.getAccounts();
					scopePointer.accountCurrent = userInfoTemp.getAccounts()[0];
					scopePointer.order.accNum = scopePointer.accountCurrent.AccNum;
					scopePointer.order.currencyType = $filter('currencyFormat')('HKD');
					// httpSvc.post('stock/accountCashBalance',{'sessId':userInfoTemp.getSessionId(),'accNum':scopePointer.order.accNum,'cucyCode':scopePointer.accountCurrent.CucyCode}).then(function(result){
					// 	console.log(result);
					// });
					scopePointer.buyPower = $filter('currency')(1000, '$', 2);


					$("#switch").bootstrapSwitch();
					$('[data-toggle="popover"]').popover();
					$(".form_datetime").datetimepicker({
						format: "yyyy-mm-dd"
					});
				}
			}
			return service;
		}
	]);