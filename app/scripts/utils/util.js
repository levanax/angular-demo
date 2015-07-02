/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

var util = {};
(function(_this){
	_this.isEmpty = function(args){
		var result = true;
		var reg = /\s*$/;
		if(args && reg.test(args)){
			result = false;
		}
		return result;
	},
	_this.isNotEmpty = function(args){
		var result = true;
		if(_this.isEmpty(args)){
			result = false;
		}
		return result;
	}
})(util);