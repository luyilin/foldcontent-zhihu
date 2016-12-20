;(function ($, window, document, undefined) {
    //定义 FoldContent 的构造函数
    var foldcontent_jquery = function (ele,opt) {
        this.$element = ele;
        this.defaults = {
            'btnBg': '#eff6fa',
            'btnColor': '#0c5897',
            'fixBtnBg': '#81baeb',
            'fixBtnColor': '#fff',
            'fontSize': '12px',
            'paddingTop': '1px',
            'paddingLeft': '5px' // 按钮尺寸
        };
        this.options = $.extend({}, this.defaults, opt)
    };
    //定义方法
    foldcontent_jquery.prototype = {
        config: function () {
             this.$element.css({
                 'color': this.options.btnColor,
                 'fontSize': this.options.fontSize,
                 'backgroundColor': this.options.btnBg
             });
            return this;
        },
        fontContentFunction: function () {
            var fixBtnColor = this.options.fixBtnColor,
                fixBtnBg = this.options.fixBtnBg,
                btnColor = this.options.btnColor,
                btnBg = this.options.btnBg;
            var doc = $(document);
            var win = $(window);
            // 多次使用, 缓存起来
            function changeStyle(i) {
                i.css({
                    'right': '20px',
                    'color': btnColor,
                    'backgroundColor': btnBg,
                    'position': 'absolute'
                });
            }
            function changeToFix(i) {
                i.css({
                    'color': fixBtnColor,
                    'backgroundColor': fixBtnBg,
                    'position': 'fixed'
                });
            }
            doc.on('click', '.unfold', function () {
                    var unfold = $(this);
                    if (unfold.text() !== '收起') {
                        unfold.text('收起').siblings('.part-content').hide().siblings('.all-content').show();
                        var panel = unfold.parent();
                        var panelScroll = panel.offset().top + panel.height();
                        var scrollHeight = doc.scrollTop() + win.height();
                        var right = win.width() / 2 - 350 + 20 > 20 ? win.width() / 2 - 350 + 20 : 20;
                        if (scrollHeight - panelScroll < 50) {
                            unfold.css({
                                'right': right
                            });
                            changeToFix(unfold);
                        }
                        var cb = {
                            onscroll: function() {
                                var panelScroll = panel.offset().top + panel.height();
                                var scrollHeight = doc.scrollTop() + win.height();
                                var right = win.width() / 2 - 350 + 20 > 20 ? win.width() / 2 - 350 + 20 : 20;
                                if (scrollHeight - panelScroll < 50 &&
                                    panel.offset().top - scrollHeight < -90 && unfold.text() !== '展开') {
                                    unfold.css({
                                        'right': right
                                    });
                                    changeToFix(unfold);
                                } else {
                                    changeStyle(unfold);
                                }
                                win.off("scroll", cb.onscroll);
                                setTimeout(function() {
                                    win.on("scroll", cb.onscroll);
                                }, 50);
                            }
                        };
                        win.on("scroll", cb.onscroll);
                    } else {
                        var fold = $(this);
                        changeStyle(fold);
                        fold.text('展开').siblings('.part-content').show()
                            .siblings('.all-content').hide();
                    }
            });
            return this;
        }
    };
    //在插件中使用 FoldContent 对象
    $.fn.foldContentPlugin = function (options) {
        //创建 FoldContent 的实体
        var foldcontent_j = new foldcontent_jquery(this, options);
        //调用其方法
        foldcontent_j.config();
        foldcontent_j.fontContentFunction();
    }
})(jQuery, window, document);

// e.g.
// $(function () {
//     $('.unfold').foldContentPlugin({
//         'btnBg': 'lightpink',
//         'btnColor': '#fff',
//         'paddingTop': '2px'
//     });
// });
