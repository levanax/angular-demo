/**
 * Created by Levana.Xue on 6/10/2015.
 */
'use strict';

angular.module("portalDemoApp")
	.directive('appPattern', ['$filter',
		function($filter) {
			var directive = {
				restrict: 'EAC',
				scope:true,
				require: ['?ngModel'],
				link: function(scope, ele, attrs, ngModel) {
					var model = ngModel[0];
					scope.$watch(attrs.ngModel, function(newValue, oldValue, scope) {
						if(angular.isDefined(newValue) && !angular.equals(newValue, oldValue) ){
							var valT = newValue.toString().trim();
							if(util.isNotEmpty(valT)){
								var val = valT.replace(/\,/g,'');
								var length = attrs.appPattern.length;
								var exp = attrs.appPattern.substring(1,length-1);
								var reg = new RegExp(exp);
								if(reg.test(val)){
									model.$setValidity('pattern', true);
								}else{
									model.$setValidity('pattern', false);
								}
							}
						}
					});
				}
			}
			return directive;
		}
	]);