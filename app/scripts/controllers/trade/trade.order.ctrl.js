'use strict';

angular.module('portalDemoApp')
.controller('tradeOrderCtrl',['constant','$scope','dataStorageSvc',function(constant,$scope,dataStorageSvc){
	$scope.accounts = dataStorageSvc.session.get(constant.userinfo).AccProfile.Account;
}]);