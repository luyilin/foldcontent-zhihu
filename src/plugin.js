;(function ($, window, document, undefined) {
    //定义 FoldContent 的构造函数
    var FoldContent = function (ele,opt) {
        this.$element = ele;
        this.defaults = {
            'btnBg': '#eff6fa',
            'btnColor': '#0c5897',
            'fixBtnBg': '#81baeb',
            'fixBtnColor': '#fff',
            'fontSize': '12px',
            'padding': '5px',
            'text': '展开',
            'bottom': '10px',
            'right': '20px',
            'lineHeight': '1'
        };
        this.options = $.extend({}, this.defaults, opt)
    };
    //定义方法
    FoldContent.prototype = {
        config: function () {
            this.$element.text(this.options.text);
            this.$element.css({
                'color': this.options.btnColor,
                'fontSize': this.options.fontSize,
                'backgroundColor': this.options.btnBg,
                'position': 'absolute',
                'borderRadius': '5px',
                'padding':  this.options.padding,
                'bottom': this.options.bottom,
                'right': this.options.right,
                'lineHeight': this.options.lineHeight
            });
            return this;
        },
        fontContentFunction: function () {
            var fixBtnColor = this.options.fixBtnColor,
                fixBtnBg = this.options.fixBtnBg,
                btnColor = this.options.btnColor,
                btnBg = this.options.btnBg,
                btnPadding = Number($('.unfold').css('padding').replace('px', '')),
                btnFontSize = Number($('.unfold').css('font-size').replace('px', '')),
                panelWidth = Number($('.foldContentPanel').css('width').replace('px','')),
                panelPaddingBtm = Number($('.foldContentPanel').css('padding-Bottom').replace('px', '')),
                btnRight = Number((this.options.right).replace('px', ''));
            var btnBottom = panelPaddingBtm + btnPadding * 2 + btnFontSize;
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
                    var right = (win.width() - panelWidth) / 2 + btnRight > btnRight ?
                    (win.width() - panelWidth) / 2 + btnRight : btnRight;
                    if (scrollHeight - panelScroll < btnBottom) {
                        unfold.css({
                            'right': right
                        });
                        changeToFix(unfold);
                    }
                    var cb = {
                        onscroll: function() {
                            var panelScroll = panel.offset().top + panel.height();
                            var scrollHeight = doc.scrollTop() + win.height();
                            var right = (win.width() - panelWidth) / 2 + btnRight > btnRight ?
                            (win.width() - panelWidth) / 2 + btnRight : btnRight;
                            if (scrollHeight - panelScroll < btnBottom &&
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
        var foldContent = new FoldContent(this, options);
        //调用其方法
        foldContent.config();
        foldContent.fontContentFunction();
    }
})(jQuery, window, document);
