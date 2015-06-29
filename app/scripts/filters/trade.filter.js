'use strict';

angular.module("portalDemoApp")
.filter('accFormat',['$filter',function($filter){
return function(input){
	if(angular.isObject(input)){
		var acc = input,result = null;
		var accNum = acc.AccNum.toString();

		var accType = null;
		var typeChar = accNum.substring(9,10);
		if(typeChar=="1" || typeChar =="8"){
			accType = $filter('translate')("ACCOUNT_TYPE_CASH");
		}else{
			accType = $filter('translate')("ACCOUNT_TYPE_MARGIN");
		}
		result = accNum +" "+accType+" "+ acc.CucyCode;
		return result;
	}
}
}]);