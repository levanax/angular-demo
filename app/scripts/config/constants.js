/**
*key constant 与 object Name / staticStorage 相互关联
*/
'use strict';

angular.module('portalDemoApp')
.constant('cookie',{
	life:30
})
.constant('server',{
	/*urlPrefix:'http://192.168.7.128:8080/AngularTest/',*/
	urlPrefix:'http://192.168.7.127:3000/'
})
.constant('constant',{
	//session value _
	'userId':'_userId',
	'userinfo':'_userinfo_constant',
	'accountCashBalance':'_AccountCashBalance',
	'markets':'_markets',
	'orderTypes':'_orderTypes'
});