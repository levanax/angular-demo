'use strict';

angular.module('portalDemoApp')
	.factory('usersDao', ['$http', '$state', 'server', 'dataStorageSvc',
		function($http, $state, server, dataStorageSvc) {
			var service = {
				login: function(loginParams) {
					return $http({
						method: 'post',
						url: server.urlPrefix + 'login/submit',
						data: loginParams,
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						console.log(result)
						return result.data;
					});
				},
				logout: function() {},
				Security: {
					queryBalance: function(params) {
						return $http({
							method: 'post',
							url: server.urlPrefix + 'stock/queryAccountSingleSecurityBalance',
							data: params,
							transformRequest: function(data) {
								return $.param(data);
							}
						}).then(function(result) {
							return result.data;
						});
					}
				}
			};
			return service;
		}
	]);