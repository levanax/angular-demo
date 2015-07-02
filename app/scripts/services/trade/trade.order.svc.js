'use strict';

angular.module('portalDemoApp')
.factory('orderViewSvc',['$filter','dataStorageSvc',function($filter,dataStorageSvc){
	var service = {
		initialize:function(scopePointer){
			scopePointer.order = {};
			scopePointer.security = {};
			
			scopePointer.markets = null;
			scopePointer.currencyType = $filter('currencyFormat')('HKD');
			scopePointer.buyPower = $filter('currency')(1000,'$',3);
			scopePointer.updateOrderSide('buy');
			scopePointer.order.type = null;
			//scopePointer.accounts = dataStorageSvc.session.get(constant.userinfo).AccProfile.Account;

			$("#switch").bootstrapSwitch();
			$(".form_datetime").datetimepicker({
		        format: "yyyy-mm-dd"
		    });
		}
	}
	return service;
}]);