'use strict';

angular.module("portalDemoApp")
	.filter('figure', ['$filter',
		function($filter) {
			return function(input, fractionSize) {
				/**
				 * @param input = [ '1000.','1000.0']
				 * @param fractionSize 最大保留几位小数
				 */
				var nums = input.toString().split('.');
				var numPre = nums[0];

				var result = $filter('number')(numPre);
				if (nums.length > 1) {
					var numEnd = nums[1];
					if (angular.isDefined(fractionSize)) {
						if (fractionSize < numEnd.length) {
							numEnd = numEnd.substring(0,fractionSize);
						}
					}
					result = result.concat('.' + numEnd);
				}
				return result;
			}
		}
	])
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
						case 'en-us':
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "EN") {
									result = input[i].$t;
									break;
								}
							}
							break;
						case 'zh-cn':
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "ZH" && input[i].CntyCode === "CN") {
									result = input[i].$t;
									break;
								}
							}
							break;
						default:
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "ZH" && input[i].CntyCode === "HK") {
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
						case 'en-us':
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "EN") {
									result = input[i].$t;
									break;
								}
							}
							break;
						case 'zh-cn':
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "ZH" && input[i].CntyCode === "CN") {
									result = input[i].$t;
									break;
								}
							}
							break;
						default:
							for (var i = 0; i < input.length; i++) {
								if (input[i].LangCode === "ZH" && input[i].CntyCode === "HK") {
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