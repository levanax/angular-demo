'use strict';

angular.module('portalDemoApp')
	.factory('accountObjSvc', ['constant', 'dataStorageSvc',
		function(constant, dataStorageSvc) {
			var service = {
				accountInfo: null,
				setAccountInfo: function() {
					if (this.accountInfo == null) {
						console.log(' set accountInfo ..................');
						var result = dataStorageSvc.session.get(constant.userinfo);
						this.accountInfo = result;
					}
				},
				getSessionId: function() {
					this.setAccountInfo();
					return this.accountInfo.SessId;
				},
				getAccount: function() {
					this.setAccountInfo();
					return this.accountInfo.UserLoginResponse.User.AccProfile.Account;
				}
			};
			return service;
		}
	]);