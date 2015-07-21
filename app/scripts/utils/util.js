/**
 * Created by Levana.Xue on 6/11/2015.
 */
'use strict';

var util = {};
(function(_this) {
	_this.isIntheArray = function(arrays, val) {
		var temp = ',' + arrays.join(",") + ",";
		return temp.indexOf("," + val + ",") != -1;
	},
	_this.toString = function(args) {
		if (typeof args !== 'string') {
			return new String(args);
		} else {
			return args;
		}
	},
	_this.parseNumber = function(args, fractionSize) {
		/** util.parseNumber('1000.',0) return '1000'
		 *  util.parseNumber('1000.') return '1000.'
		 * @param fractionSize 最大保留几位小数
		 * @returns {String}
		 */
		var result = null;
		if (typeof args !== 'undefined') {
			var temp = _this.toString(args);
			result = temp.replace(/[^.0-9]/g, "");
			if (typeof fractionSize === 'number') {
				var res = result.split('.');
				var resPre = res[0];
				if (res.length > 1 && fractionSize !== 0) {
					var resEnd = res[1];
					if (resEnd.length !== 0) {
						if (fractionSize < resEnd.length) {
							resEnd = resEnd.substring(0, fractionSize);
						}
						result = resPre + '.' + resEnd;
					} else {
						result = resPre;
					}
				} else {
					result = resPre;
				}
			}
		}
		return result;
	},
	_this.isNull = function(args){
		return args === null;
	},
	_this.isNotNull = function(args){
		return args !== null;
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
		//console.log(arguments)
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


//timeFactory.start();
//console.log(timeFactory.end());
var timeFactory = {};
(function(_this) {
	var startTime, execTime;
	_this.start = function() {
		startTime = new Date().getTime();
		return startTime;
	};
	_this.end = function() {
		execTime = new Date().getTime() - startTime;
		return execTime;
	};
})(timeFactory);