/**
 * Created by sunwei on 2016/4/23.
 */
//�ײ��и��ֲ�ͼ��Ч

//��ת�ֲ���Ч
var current = 0;
$('.prev').on('click', function () {
    current++;
    $('.view li').each(function (key) {
        $(this).css({
            'transform': 'rotateX(' + current * 90 + 'deg)',
            'transition-delay': key * 0.25 + 's'
        });
    });
});
$('.next').on('click', function () {
    current--;
    $('.view li').each(function (key) {
        $(this).css({
            'transform': 'rotateX(' + current * 90 + 'deg)',
            'transition-delay': key * 0.25 + 's'
        });
    });
});


//��ͷ��Ч

$(".view").on("mouseenter", function () {
    $(".arrBox").stop().fadeTo(400,1);
});
$(".view").on("mouseleave", function () {
    $(".arrBox").stop().fadeTo(400,0);
});
