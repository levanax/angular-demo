/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

var util = {};
(function(_this) {
	_this.parseNumber = function(args){
		var result = null;
		if(typeof args === "string"){
			result = args.replace(/[^.0-9]/g,"");
		}
		return result;
	},
	_this.isEmpty = function(args) {
		var result = true;
		var reg = /\s*$/;
		if (typeof args !== 'undefined' && reg.test(args)) {
			result = false;
		}
		return result;
	},
	_this.isNotEmpty = function(args) {
		var result = true;
		if (_this.isEmpty(args)) {
			result = false;
		}
		return result;
	},
	_this.add = function(arg1, arg2) {
		var result = null;
		try {
			var a = new BigDecimal(arg1.toString());
			var b = new BigDecimal(arg2.toString());
			result = a.add(b).toString();
		} catch (e) {
			console.error(e);
		}
		return result;
	},
	_this.subtract = function(arg1, arg2) {
		var result = null;
		try {
			var a = new BigDecimal(arg1.toString());
			var b = new BigDecimal(arg2.toString());
			result = a.subtract(b).toString();
		} catch (e) {
			console.error(e);
		}
		return result;
	},
	_this.multiply = function(arg1, arg2) {
		var result = null;
		try {
			var a = new BigDecimal(arg1.toString());
			var b = new BigDecimal(arg2.toString());
			result = a.multiply(b).toString();
		} catch (e) {
			console.error(e);
		}
		return result;
	},
	_this.divide = function(arg1, arg2, arg3, arg4) {
		/**
		 * 两数相除 默认按原有小数输出 不四舍五入
		 * @param arg1 被除数
		 * @param arg2 除数
		 * @param arg3 保留小数位
		 * @param arg4 舍入模式-- 根据下列数组 下标 来设定舍入方式（与java 类似）
		 * [ROUND_HALF_UP,ROUND_UNNECESSARY,ROUND_CEILING,ROUND_DOWN,ROUND_FLOOR,ROUND_HALF_DOWN,ROUND_HALF_EVEN,ROUND_UP]
		 * @returns {Number}
		 */
		var result = null;
		try {
			var a = new BigDecimal(arg1.toString());
			var b = new BigDecimal(arg2.toString());
			if (typeof arg4 !== 'undefined')
				result = a.divide(b, arg3, arg4).toString();
			else if (typeof arg3 !== 'undefined')
				result = a.divide(b, arg3, 1).toString();
			else
				result = a.divide(b, 16, 1).toString().match(/[-]?\d*(?:\d|[.]\d*[^0])/); //与javascript 原始 除法(/)保持一致 按原有小数位输出, 最大保留16位小数
		} catch (e) {
			console.error(e);
		}
		return result;
	}
})(util);