/**
 * Created by sunwei on 2016/4/20.
 */


var wrap = document.getElementById("wrap");
var slide = document.getElementById("slide");
var ul = slide.children[0];
var lis = ul.children;
var arrRight = document.getElementById("arrRight");
var arrLeft = document.getElementById("arrLeft");

var arrow = document.getElementById("arrow");
var config = [//config 配置
    {
        width: 400,
        top: 20,
        left: 50,
        opacity: 0.2,
        zIndex: 2
    },//0
    {
        width: 600,
        top: 70,
        left: 0,
        opacity: 0.8,
        zIndex: 3
    },//1
    {
        width: 800,
        top: 100,
        left: 200,
        opacity: 1,
        zIndex: 4
    },//2
    {
        width: 600,
        top: 70,
        left: 600,
        opacity: 0.8,
        zIndex: 3
    },//3
    {
        width: 400,
        top: 20,
        left: 750,
        opacity: 0.2,
        zIndex: 2
    }//4
];//其实就是一个配置单 规定了每张图片的大小位置层级透明度

//1.鼠标经过盒子 渐渐地显示arrow 鼠标离开 渐渐地隐藏arrow
wrap.onmouseover = function () {
    animate(arrow, {"opacity": 1});
}
wrap.onmouseout = function () {
    animate(arrow, {"opacity": 0});
}

//2.根据配置单 对每一个li的位置进行分配
function assign() {
    for (var i = 0; i < lis.length; i++) {
        //让图片渐渐地到达指定位置
        animate(lis[i], config[i], function () {
            //执行回调函数的时候说明动画已经执行完了
            flag = true;//打开节流阀
        });
    }
}


assign();

//3.点击箭头让木马转起来
arrRight.onclick = function () {
    if (flag) {//点击按钮的时候对阀门的状态进行判断 如果是打开的就可以执行
        //关闭节流阀
        //点击右侧按钮 配置单 删除第一个元素 追加到结尾
        config.push(config.shift());//修改配置单
        assign();//根据修改完成的配置单对位置进行重新分配
        flag = false;
    }
}
arrLeft.onclick = function () {
    if (flag) {

        //点击左侧按钮 配置单 删除最后一个 追加到开头
        config.unshift(config.pop());//修改配置单
        assign();//根据修改完成的配置单对位置进行重新分配
        flag = false;
    }
}

//4.添加节流阀
var flag = true;//flag为true的时候表示节流阀打开 箭头可以点击






//点击查看所有分类游戏所跳转的缓动
var timer = null;
var leader = 0;
$(window).scroll(function () {
    leader = $(document).scrollTop();
});


$("#check")[0].onclick = function () {
    var target = $("#main-table")[0].offsetTop;
    clearInterval(timer);
    timer = setInterval(function () {
        var step = (target - leader)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        leader = leader + step;
        window.scrollTo(0,leader);
        if(leader == target){
            clearInterval(timer);
        }
    },15)
}




//TD表格鼠标上移时候显示的淡入效果
$("td").on("mouseenter", function () {
    $(this).children().children(".td-des").stop().fadeTo(400,1);
    //$(this).children().children(".td-des").slideDown();
});
$("td").on("mouseleave", function () {
    $(this).children().children(".td-des").stop().fadeTo(400,0);
    //$(this).children().children(".td-des").slideUp();
});


//游戏排行榜中的鼠标效果
$(".con").find("a").on("mouseenter", function () {
    $(this).css("color","orange");
});

$(".con").find("a").on("mouseleave", function () {
    $(this).css("color","#777");
});












function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k == "opacity") {
                var leader = getStyle(obj, k) * 100;
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style[k] = (leader + step) / 100;
            } else if (k == "zIndex") {
                obj.style[k] = json[k];
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style[k] = leader + step + "px";
            }
            if (leader != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15)
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
