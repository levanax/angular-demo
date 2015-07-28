# portal-demo

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

##must use support HTML5 browser

<p>##---------------problem start----------------------</p>
<br/>
<p>languages must use json file. only this can reduce resource usage.</p>
<br/>
<p>(1). 在自定义filter内 使用 $filter('translate'),sometimes return KEY.<br/>
	Answer: 因之前使用Customer Loaders 延迟加载 languages packages, so ...</p>
<p>使用 partialLoader 也会遇到问题 (1)</p>
<br/>
<p>现在面临一个问题：现在对象都在客户端存储，拿取object property 用key，太繁琐，而且灵活性不好。<br/>必须添加 object function[似java object class]，这样灵活性会好，如果对象结构改了，也只需update object function 即可</p>

<br/>
<p>更改内存数据存储方式，<b>object /contant /dataStorage / statStorage</b> 配合 ，很大的简化了抓取数据时一些重复的操作<br/>
object 存储 在dataStorage 里更改格式为 
{key:
  {
  type:dataType,
  value:object
  }
}</p>
<p>##---------------problem end ----------------------</p>

```javascript
$http({
	method: 'post',
	url: server.urlPrefix + urlSuffix,
	data: params,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	transformRequest: function(data) {
		return $.param(data);
	}
})

$http({
	method: 'get',
	url: server.urlPrefix + urlSuffix,
	params: params,
	cache:optionsDefault.cache,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
})
```

-
**简述 :** *DAO层负责数据抓取,*
*serivces/commons/staticStorage 负责app中 数据存储与抓取,它与 dataStorage 相互协作*

-
*Listening user online/offline status , use cookie resolve*

.jshintrc : javascript check tool - config file

区分风格 不用文件 来区分 就最好， 用区分 class 最好


old version Opera browser 会存在闪（出现源码在页面，因渲染过慢）的问题

-
builded mobile app load缓慢，可使用三个View，预加载当前View左右两个View，这样还可以为左右拖出View提供支持

browser: 系统自带浏览器
1.*使用jquery focus()在手机上获得焦点 不能自动调出 键盘
2.获取焦点元素会保持在原有位置，不会浮现在屏幕中央

-
**页面布局设计**
body分为 head / content / foot (10%/80%/10%) 另加最小高度，content内容较长时，content添加滚动条，foot/head 不建议使用绝对定位
*当用户选择input 弹出键盘时 ，菜单是次要的，不需要突出显示

**字体设计**
跟随系统默认字体大小（建议使用 em ）



