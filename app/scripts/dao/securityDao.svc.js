angular.module('portalDemoApp')
	.factory('securityDaoSvc', ['$q', 'constant', 'server', 'staticStorageSvc', '$http',
		function($q, constant, server, staticStorageSvc, $http) {
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
					var result = null;
					var markets = staticStorageSvc.get(constant.markets);
					if (util.isNotNull(markets)) {
						var deferred = $q.defer();
						deferred.resolve(markets);
						result = deferred.promise;
					} else {
						result = $http({
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
					}
					return result;
				},
				queryOrderType: function(params) {
					var result = null;
					var orderType = staticStorageSvc.get(constant.orderType);
					if (util.isNotNull(orderType)) {
						var deferred = $q.defer();
						deferred.resolve(orderType);
						result = deferred.promise;
					} else {
						result = $http({
							method: 'post',
							url: server.urlPrefix + 'stock/availableOrderType',
							data: params,
							transformRequest: function(data) {
								return $.param(data);
							}
						}).then(function(result) {
							var data = result.data;
							staticStorageSvc.put(constant.orderType, data.AvailableOrderType);
							return staticStorageSvc.get(constant.orderType);
						});
					}
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