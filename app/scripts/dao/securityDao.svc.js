angular.module('portalDemoApp')
	.factory('securityDaoSvc', ['constant', 'server', 'httpSvc', 'staticStorageSvc', '$http',
		function(constant, server, httpSvc, staticStorageSvc, $http) {
			var service = {
				querySecurity: function(params) {
					/*params keys:[sessId,sctyID,market]*/
					//对参数作一些验证处理
					var result = null;
					result = $http({
						method: 'get',
						url: server.urlPrefix + 'stock/querySecurityStaticData',
						params: params,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						}
					}).then(function(result) {
						console.log(result);
						return result.data.Security;
					});
					return result;
				},
				calculatedCharges: function(params) {
					//params keys :accNum,cucyCode,sctyID,sctyID,ordSide,ordType,ordQty,price
					var result = null;
					result = $http({
						method: 'post',
						url: server.urlPrefix + 'StockTrade',
						data: queryParams,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						return result.data;
					});
					return result;
				},
				signingOrder: function(params) {
					//下单
					var result = null;
					result = $http({
						method: 'get',
						url: server.urlPrefix + 'stock/newOrder',
						params: params,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						}
					}).then(function(result) {
						return result.data;
					});
					return result;
				},
				modifyOrder: function() {

				},
				queryOrderMarkets: function(params) {
					var result = httpSvc.get('system/orderMarkets', params).then(function(result) {
						var data = result.data;
						staticStorageSvc.put(constant.markets, data);
						return staticStorageSvc.get(constant.markets);
					});
					return result;
				},
				queryOrderType: function(params) {
					var result = httpSvc.get('stock/availableOrderType', params).then(function(result) {
						var data = result.data;
						staticStorageSvc.put(constant.orderTypes, data.AvailableOrderType);
						return staticStorageSvc.get(constant.orderTypes);
					});
					return result;
				},
				queryAccCashBalance: function(params) {
					var result = httpSvc.get('stock/accountCashBalance', params).then(function(result) {
						var data = result.data;
						staticStorageSvc.put(constant.accountCashBalance, data.Account);
						return staticStorageSvc.get(constant.accountCashBalance);
					});
					return result;
				}
			}
			return service;
		}
	])