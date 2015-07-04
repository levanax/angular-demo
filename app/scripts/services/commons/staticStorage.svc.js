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
				set: function(key) {
					var result = null,
						value = null;
					var transitResult = dataStorageSvc.session.get(key);
					var objType = transitResult.type;
					var obj = transitResult.value;
					switch (objType) {
						case constant.userinfo:
							value = new accountInfo(obj);
							break;
						default:
							console.error('not found object at the staticStorage service');
							break;
					};
					if (value != null) {
						this[key] = value;
						result = value;
					}
					return result;
				},
				put: function(key, value) {
					this[key] = value;
				},
				get: function(key) {
					var result = this[key];
					if (typeof result === 'undefined') {
						result = this.set(key);
					}
					return result;
				}
			}
			return service;
		}
	]);