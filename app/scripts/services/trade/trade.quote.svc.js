'use strict';

angular.module('portalDemoApp')
	.factory('tradeQuoteViewSvc', ['$log',

		function($log) {
			var service = {
				scopePointer: null,
				openConnection: function(scopePointer,token) {
					var client = new PriceClient();
					client._scope = scopePointer;
					client._token = token;
					priceClient = client;
					client.connect();
				},
				closeConnection: function() {
					var client = priceClient;
					try {
						if (client.isConnected()) {
							client.leave();
						}
					} catch (e) {
						$log.warn('close connention error.');
					}
				},
				subscribeStock: function(scopePointer) {
					this.scopePointer = scopePointer;
					var client = priceClient;
					if (client.isConnected()) {
						client.subscribe(scopePointer.stockCode, this.releaseData);
					}
				},
				unsubscribeStock: function() {
					var client = priceClient;
					if (client.isConnected()) {
						client.unsubscribe();
					}
				},
				releaseData: function(msg) {
					var scope = priceClient._scope;
					var data = msg.data;
					switch (data.MESSAGE_TYPE) {
						case "UNKNOWN":
							$log.warn("stock is null.");
							break;
						case "001":
							priceClient.releaseData020(data, scope);
							priceClient.releaseData021(data, scope);
							priceClient.releaseData022(data, scope);
							priceClient.releaseData023(data, scope);
							priceClient.releaseData024(data, scope);
							break;
						case "020":
							priceClient.releaseData020(data, scope);
							break;
						case "021":
							priceClient.releaseData021(data, scope);
							break;
						case "022":
							priceClient.releaseData022(data, scope);
							break;
						case "023":
							priceClient.releaseData023(data, scope);
							break;
						case "024":
							priceClient.releaseData024(data, scope);
							break;
						default:
							console.warn("type :" + message_type + " is not exist.");
							break;
					}
				}
			}
			return service;
		}
	]);