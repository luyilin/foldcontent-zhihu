(function() {
	$(document).on('click', '.unfold', function() {
		var unfold = $(this);
        unfold.css('display','none');
        unfold.siblings('.fold').css('display', 'block');
        unfold.siblings('.part-content').css('display', 'none');
        unfold.siblings('.all-content').css('display', 'block');
        $(document).on('scroll', window, function () {
            var fold = unfold.siblings('.fold');
            var panel = unfold.parent();
            var scrollHeight = $(document).scrollTop() + $(window).height();
            var left = $(window).width()/2 - 350 + 20 > 0 ? $(window).width()/2 - 350 + 20 : 20;
            if (fold.offset().top - scrollHeight > -30 && panel.offset().top - scrollHeight < -90) {
                fold.next().css('display','block');
                fold.next().css('right', left);
            } else {
                fold.next().css('display','none');
            }
        })
    });

    $(document).on('click', '.fold', foldContent);
    $(document).on('click', '.fold-fix', foldContent);

    function foldContent() {
        var fold = $(this);
        fold.css('display','none');
        fold.siblings('.fold').css('display', 'none');
        fold.siblings('.fold-fix').css('display', 'none');
        fold.siblings('.unfold').css('display', 'block');
        fold.siblings('.part-content').css('display', 'block');
        fold.siblings('.all-content').css('display', 'none');
    }

    // Todo: 搞懂知乎折叠答案后显示如何显示部分内容的算法

})()
