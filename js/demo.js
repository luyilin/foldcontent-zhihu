define(['jquery'], function() {
    (function () {
        var doc = $(document);
        var win = $(window);
        // 多次使用, 缓存起来
        doc.on('click', '.unfold', function () {
            var unfold = $(this);
            if (unfold.text() !== '收起') {
                unfold.text('收起').siblings('.part-content').hide().siblings('.all-content').show();
                win.on('scroll', function () {
                    // document 对象是 window 对象的一个属性, 是显示于窗口内的一个文档,可以用 window.document 属性访问
                    // window 是一个顶层对象, 是浏览器中打开的窗口
                    var panel = unfold.parent();
                    var scrollHeight = doc.scrollTop() + win.height();
                    var right = win.width() / 2 - 350 + 20 > 0 ? win.width() / 2 - 350 + 20 : 20;
                    if (unfold.offset().top - scrollHeight > -50 &&
                        panel.offset().top - scrollHeight < -90 && unfold.text() !== '展开') {
                        unfold.next().show().css('right', right);
                    } else {
                        unfold.next().hide();
                    }
                })
            } else {
                $(this).text('展开').siblings('.fold-fix').hide().siblings('.part-content').show()
                    .siblings('.all-content').hide();
            }
        });

        doc.on('click', '.fold-fix', foldFixContent);

        function foldFixContent() {
            $(this).hide().siblings('.part-content').show()
                .siblings('.all-content').hide().siblings('.unfold').text('展开');
        }

    })()
});
