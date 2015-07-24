'use strict';

angular.module('portalDemoApp')
	.constant('server', {
		/*urlPrefix:'http://192.168.7.128:8080/AngularTest/',*/
		urlPrefix: 'http://192.168.7.127:3030/',
		supportLanguages:['en-us', 'zh-cn'],
		languages: 'zh-cn'
	});