;(function (window, document, undefined) {
    //定义 foldcontent_jquery 的构造函数
    var foldcontent_jquery = function (ele,opt) {
        this.$element = ele;
        this.defaults = {
            'btnBg': '#eff6fa',
            'btnColor': '#0c5897',
            'fixBtnBg': '#81baeb',
            'fixBtnColor': '#fff',
            'fontSize': '12px',
            'padding': '5px',
            'initialText': '展开',
            'fixText': '收起',
            'bottom': '10px',
            'right': '20px',
            'lineHeight': '1'
        };
        this.options = $.extend({}, this.defaults, opt)
    };
    //定义方法
    foldcontent_jquery.prototype = {
        config: function () {
            this.$element.text(this.options.initialText);
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
                btnPadding = parseInt($('.unfold').css('padding')) || 0,
                btnFontSize = parseInt($('.unfold').css('font-size')) || 0,
                panelWidth = parseInt($('.foldcontent-panel').css('width')) || 0,
                panelPaddingBtm = parseInt($('.foldcontent-panel').css('padding-Bottom')) || 0,
                btnRight = parseInt((this.options.right)),
                initialText = this.options.initialText,
                fixText = this.options.fixText;
            var btnBottom = panelPaddingBtm + btnPadding * 2 + btnFontSize + parseInt(this.options.bottom) || 0;
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
                if (unfold.text() !== fixText) {
                    unfold.text(fixText).siblings('.part-content').hide().siblings('.all-content').show();
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
                                panel.offset().top - scrollHeight < -90 && unfold.text() !== initialText) {
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
                        fold.text(initialText).siblings('.part-content').show()
                            .siblings('.all-content').hide();
                    }
            });
            return this;
        }
    };
    //在插件中使用 foldcontent_jquery 对象
    $.fn.foldContentPlugin = function (options) {
        //创建 FoldContent 的实体
        var foldcontent_j = new foldcontent_jquery(this, options);
        //调用其方法
        foldcontent_j.config();
        foldcontent_j.fontContentFunction();
    }
})(window, document);