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
				if (angular.isObject(input)) {
					//Returns the language key of language that is currently loaded asynchronously.
					var currentLanguage = $translate.proposedLanguage();
					var result = null;
					switch (currentLanguage) {
						case 'en':
							result = input.ordTypeNameEN;
							break;
						case 'cn':
							result = input.ordTypeNameCN;
							break;
						default:
							result = input.ordTypeNameEN;
							break;
					}
					return result;
				}
			}
		}
	]);