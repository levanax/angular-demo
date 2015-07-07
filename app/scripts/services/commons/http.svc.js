'use strict';
// delete filed
angular.module('portalDemoApp')
	.factory('httpSvc', ['$http','server',
		function($http,server) {
			var service = {
				post: function(urlSuffix, params) {
					return $http({
						method: 'post',
						url: server.urlPrefix + urlSuffix,
						data: params,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						return result;
					});
				},
				get:function(urlSuffix,params,options){
					var optionsDefault = {
						cache:false
					}
					if(typeof options !== 'undefined'){
						if(options.cache !== 'undefined'){
							optionsDefault.cache = options.cache;
						}
					}
					return $http({
						method: 'get',
						url: server.urlPrefix + urlSuffix,
						params: params,
						cache:optionsDefault.cache,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						}
					}).then(function(result) {
						return result;
					});
				}
			}
			return service;
		}
	])