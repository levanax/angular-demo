/**
 * this file and datastorage 相互配合
 * 需要考虑 mobile app 内存占用问题
 *
 */
'use strict';

angular.module('portalDemoApp')
	.factory('staticStorageSvc', ['constant', 'dataStorageSvc',
		function(constant, dataStorageSvc) {
			var service = {
				container: {},
				set: function(key) {
					var result = null;
					try {
						var value = null;
						var transitResult = dataStorageSvc.session.get(key);
						if (angular.isObject(transitResult)) {
							var objType = transitResult.type;
							var obj = transitResult.value;

							//set value
							var functionName = objType.substring(1),
								functionNameTypeof = null;
							eval("functionNameTypeof = typeof " + functionName);
							if (functionNameTypeof === "function") {
								eval("value = new " + functionName + "(obj)");
							} else {
								value = obj;
							}

							//set value 
							/*switch (objType) {
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
								break;
						};*/


							if (value != null) {
								//this.container[key] = value;
								result = value;
							}
						}
					} catch (e) {
						console.error(e);
					}
					return result;
				},
				put: function(key, value) {
					dataStorageSvc.session.put(key, value);
				},
				get: function(key) {
					var result = this.container[key];
					if (typeof result === 'undefined') {
						result = this.set(key);
					}
					return result;
				},
				clear: function() {
					this.container = {};
					dataStorageSvc.session.clear();
					dataStorageSvc.local.clear();
				}
			}
			return service;
		}
	]);