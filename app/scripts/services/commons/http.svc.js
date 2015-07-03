'use strict';

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
				}
			}
			return service;
		}
	])