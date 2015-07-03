'use strict';

angular.module('portalDemoApp')
.factory('securitySvc',[function(){
	var service = {
		query:function(queryParams){
			/*queryParams keys:[stockCode,accNum,market,tradeSide]*/
			//对参数作一些验证处理

			var result = null;
			result = $http({
                method:'post',
                url:server.urlPrefix+'stock/querySecurityStaticData',
                data:queryParams,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest:function(data){
                  return $.param(data);
                }
            }).then(function(result) {
                return result.data;
            });
			return result;
		},
        calculatedCharges:function(params){
            //params keys :accNum,cucyCode,sctyID,sctyID,ordSide,ordType,ordQty,price
            var result = null;
            result = $http({
                method:'post',
                url:server.urlPrefix+'StockTrade',
                data:queryParams,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                transformRequest:function(data){
                  return $.param(data);
                }
            }).then(function(result) {
                return result.data;
            });
            return result;
        },
        trade:function(){
            /*params keys :
            * priceLimit,priceIdeal,priceReality,tradePassword,orderCharges
            * price,market,accNum,{tradeType:NEW},tradeSide,stockCode,currency,qty
            * expiryDate,orderType,quickOrderMode
            */
        },
        modifyOrder:function(){

        }
	}
	return service;
}]);