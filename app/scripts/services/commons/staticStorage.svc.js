/**
 *this file and datastorage 相互配合
 *
 *
 */
'use strict';

angular.module('portalDemoApp')
	.factory('staticStorageSvc', ['constant', 'dataStorageSvc',
		function(constant, dataStorageSvc) {
			var service = {
				container:{},
				set: function(key) {
					var result = null,
						value = null;
					var transitResult = dataStorageSvc.session.get(key);
					if (angular.isObject(transitResult)) {
						var objType = transitResult.type;
						var obj = transitResult.value;
						switch (objType) {
							case constant.userinfo:
								value = new AccountInfo(obj);
								break;
							case constant.accountCashBalance:
								value = new AccountCashBalance(obj);
								break;
							case constant.orderTypes:
								value = new OrderType(obj);
								break;
							default:
								value = obj;
								console.warn('may be not found object at the staticStorage service');
								break;
						};
						if (value != null) {
							this.container[key] = value;
							result = value;
						}
					}
					return result;
				},
				put: function(key, value) {
					//this.container[key] = value;
					dataStorageSvc.session.put(key, value);
				},
				get: function(key) {
					var result = this.container[key];
					if (typeof result === 'undefined') {
						result = this.set(key);
					}
					return result;
				}
			}
			return service;
		}
	]);