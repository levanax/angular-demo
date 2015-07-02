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
<p>1. 在自定义filter内 使用 $filter('translate'),sometimes return KEY.</p>
<p>Answer: 因之前使用Customer Loaders 延迟加载 languages packages, so ...</p>
<p>使用 partialLoader 也会遇到问题 (1)</p>
<br/>
<p>##---------------problem end ----------------------</p>