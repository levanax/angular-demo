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
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						transformRequest: function(data) {
							return $.param(data);
						}
					}).then(function(result) {
						return result.data;
					});
				},
				logout: function() {},
				Security: {
					queryBalance: function(params) {
						return $http({
							method: 'get',
							url: server.urlPrefix + 'stock/queryAccountSingleSecurityBalance',
							params: params,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
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