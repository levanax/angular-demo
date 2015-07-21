/**
 *key constant 与 object Name / staticStorage 相互关联
 */
'use strict';

angular.module('portalDemoApp')
	.constant('constant', {
		//session value _
		'constantName':'$FunctionName',
		'userId': '$userId',
		'userinfo': '$AccountInfo',
		'accountCashBalance': '$AccountCashBalance',
		'markets': '$markets',
		'orderType': '$OrderType'
	});