'use strict';

angular.module("portalDemoApp")
	.filter('accFormat', ['$filter',
		function($filter) {
			return function(input) {
				if (angular.isObject(input)) {
					var acc = input,
						result = null;
					var accNum = acc.AccNum.toString();

					var accType = null;
					var typeChar = accNum.substring(9, 10);
					var translateFilter = $filter('translate');
					if (typeChar == "1" || typeChar == "8") {
						accType = translateFilter("ACCOUNT_TYPE_CASH");
					} else {
						accType = translateFilter("ACCOUNT_TYPE_MARGIN");
					}
					var cucyField = translateFilter("CURRENCYS." + angular.uppercase(acc.CucyCode));
					result = accNum + " " + accType + " " + cucyField;
					return result;
				}
			}
		}
	])
	.filter('currencyFormat', ['$filter',
		function($filter) {
			return function(input) {
				if (angular.isString(input)) {
					var localKey = "CURRENCYS." + input;
					var $filterMarket = $filter('translate');
					//here is have problem.
					return $filterMarket(localKey);
				}
			}
		}
	])
	.filter('marketFormat', ['$filter',
		function($filter) {
			return function(input) {
				if (angular.isString(input)) {
					return $filter('translate')("MARKETS." + angular.uppercase(input));
				}
			}
		}
	])
	.filter('orderTypeByLocal', ['$translate',
		function($translate) {
			return function(input) {
				if (angular.isArray(input)) {
					//Returns the current language key .
					var currentLanguage = $translate.use();
					var result = null;
					switch (currentLanguage) {
						case 'en':
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "EN") {
									result = input[i].$t;
									break;
								}
							}
							break;
						case 'cn':
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "CN") {
									result = input[i].$t;
									break;
								}
							}
							break;
						default:
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "ZH") {
									result = input[i].$t;
									break;
								}
							}
							break;
					}
					return result;
				}
			}
		}
	]).filter('siftingSecurityName', ['$translate',
		function($translate) {
			return function(input) {
				if (angular.isObject(input)) {
					var currentLanguage = $translate.use(),
						result = null;
					switch (currentLanguage) {
						case 'en':
							for(var i = 0 ;i<input.length ;i++){
								if(input[i].LangCode === "EN"){
									result = input[i].$t;
									break;
								}
							}
							break;
						case 'cn':
							for(var i = 0 ;i<input.length ;i++){
								if(input[i].LangCode === "CN"){
									result = input[i].$t;
									break;
								}
							}
							break;
						default:
							for(var i = 0 ;i<input.length ;i++){
								if(input[i].LangCode === "ZH"){
									result = input[i].$t;
									break;
								}
							}
							break;
					}
					return result;
				}
			}
		}
	]);