# foldcontent-zhihu

> 用 jquery 实现知乎收起答案功能

> 具体实现可以看一下这篇[文章](https://segmentfault.com/a/1190000007503399) ٩(ˊᗜˋ*)و

## Introduction

demo/ 目录下是🌰

## Install

```
$ npm install foldcontent-zhihu --save
```


## Usage

### HTML

```HTML
<div class="foldcontent-panel">
    <div class="part-content"><!--此处是部分内容--></div>
    <div class="all-content"><!--此处是全部内容--></div>
    <div class="unfold"></div><!--这是折叠按钮-->
</div>
<!-- ... -->
<script src="foldcontent.min.js"></script>
```

### JS

```JS
$('.unfold').foldContentPlugin({ 
   
});
```

#### Options

```JS
this.defaults = {
            'btnBg': '#eff6fa',     // 按钮背景颜色
            'btnColor': '#0c5897',  // 按钮字体颜色
            'fixBtnBg': '#81baeb',  // 固定定位按钮背景颜色
            'fixBtnColor': '#fff',  // 固定定位按钮字体颜色
            'fontSize': '12px',     // 按钮字体大小
            'padding': '5px',       // 按钮尺寸
            'initialText': '展开',   // 按钮初始文本内容
            'fixText': '收起',       // 固定定位按钮文本内容
            'bottom': '10px',       
            'right': '20px',        // 绝对定位
            'lineHeight': '1'       // 按钮行高
};
```

#### API

+ `foldContent.config()`                // 样式
+ `foldContent.fontContentFunction();`  // 具体折叠方法的实现

## How to Run 

```
$ npm install
$ npm start
```


## LICENSE

MIT

[MIT License](https://github.com/luyilin/foldcontent-zhihu/blob/master/LICENSE)
