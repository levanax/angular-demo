angular.module('portalDemoApp')
	.factory('securityDaoSvc', ['constant', 'server', 'staticStorageSvc', '$http',
		function(constant, server, staticStorageSvc, $http) {
			var service = {
				querySecurity: function(params) {
					/*params keys:[sessId,sctyID,market]*/
					var result = null;
					result = $http({
						method: 'post',
						url: server.urlPrefix + 'stock/querySecurityStaticData',
						data: params,
						transformRequest: function(data) {
							return $.param(data);
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
						method: 'post',
						url: server.urlPrefix + 'stock/newOrder',
						data: params,
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						return result.data;
					});
					return result;
				},
				modifyOrder: function() {

				},
				queryOrderMarkets: function(params) {
					return $http({
						method: 'post',
						url: server.urlPrefix + 'system/orderMarkets',
						data: params,
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						var data = result.data;
						staticStorageSvc.put(constant.markets, data);
						return staticStorageSvc.get(constant.markets);
					});
				},
				queryOrderType: function(params) {
					var result = $http({
						method: 'post',
						url: server.urlPrefix + 'stock/availableOrderType',
						data: params,
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						var data = result.data;
						staticStorageSvc.put(constant.orderTypes, data.AvailableOrderType);
						return staticStorageSvc.get(constant.orderTypes);
					});
					return result;
				},
				queryAccCashBalance: function(params) {
					var result = $http({
						method: 'post',
						url: server.urlPrefix + 'stock/accountCashBalance',
						data: params,
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						var data = result.data;
						staticStorageSvc.put(constant.accountCashBalance, data.Account);
						return staticStorageSvc.get(constant.accountCashBalance);
					});
					return result;
				},
				queryOrderBook: function(params) {
					var result = null;
					result = $http({
						method: 'post',
						url: server.urlPrefix + 'stock/accountOrderHistory',
						data: params,
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						return result.data.Account.OrdHist;
					});
					return result;
				}
			}
			return service;
		}
	])