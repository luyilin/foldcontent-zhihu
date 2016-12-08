# foldcontent-zhihu

> 用 jquery 实现知乎收起答案功能

> 具体实现可以看一下这篇[文章](https://segmentfault.com/a/1190000007503399) ٩(ˊᗜˋ*)و

## Introduction

demo/ 目录下是🌰

## Install

* 请安装3.0.2及以上版本, version1.0.0 ~ 3.0.0 经测试存在 bug (ó﹏ò｡)请已经 install 的盆友们更新一下吧
* 至于为什么 version 跨度这么大。。我发四再也不用 --force 参数了 Σ(っ °Д °;)っ
```
$ npm install foldcontent-zhihu@">=3.0.2" --save
```


## Usage

* 注意本模块正常使用需要先安装 jquery , 请认真看如下配置哦 ๑•̀⌄•́๑
### 方法一: webpack 模块加载  

#### HTML
```HTML
<div class="foldcontent-panel">
    <div class="part-content"><!--此处是部分内容--></div>
    <div class="all-content"><!--此处是全部内容--></div>
    <div class="unfold"></div><!--这是折叠按钮-->
</div>
<!-- ... -->
```

#### JS

```JS
require('foldcontent-zhihu');
$('.unfold').foldContentPlugin({ 
   
});
```

#### webpack

```
// webpack 全局加载 jquery 的一种方法
resolve: {
        alias: {
            jquery: path.resolve(js_path, 'lib/01-jquery-1.11.3.min.js')
        }
},
plugins: [ 
        new webpack.ProvidePlugin({
            $: 'jquery' // 将jquery暴露给所有模块，不用显式require('jquery')；只要模块的代码中出现了$，webpack就会自动将jQuery注入。
        }),
]
```

### 方法二: 直接通过 script 标签引入 dist/目录下的 foldcontent.min.js 文件

#### HTML

```HTML
<div class="foldcontent-panel">
    <div class="part-content"><!--此处是部分内容--></div>
    <div class="all-content"><!--此处是全部内容--></div>
    <div class="unfold"></div><!--这是折叠按钮-->
</div>
<!-- ... -->
<script src="../js/lib/01-jquery-1.11.3.min.js"></script>
<script src="foldcontent.min.js"></script>
```

#### JS

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
