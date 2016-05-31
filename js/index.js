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
var config = [//config ����
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
];//��ʵ����һ�����õ� �涨��ÿ��ͼƬ�Ĵ�Сλ�ò㼶͸����

//1.��꾭������ ��������ʾarrow ����뿪 ����������arrow
wrap.onmouseover = function () {
    animate(arrow, {"opacity": 1});
}
wrap.onmouseout = function () {
    animate(arrow, {"opacity": 0});
}

//2.�������õ� ��ÿһ��li��λ�ý��з���
function assign() {
    for (var i = 0; i < lis.length; i++) {
        //��ͼƬ�����ص���ָ��λ��
        animate(lis[i], config[i], function () {
            //ִ�лص�������ʱ��˵�������Ѿ�ִ������
            flag = true;//�򿪽�����
        });
    }
}


assign();

//3.�����ͷ��ľ��ת����
arrRight.onclick = function () {
    if (flag) {//�����ť��ʱ��Է��ŵ�״̬�����ж� ����Ǵ򿪵ľͿ���ִ��
        //�رս�����
        //����Ҳఴť ���õ� ɾ����һ��Ԫ�� ׷�ӵ���β
        config.push(config.shift());//�޸����õ�
        assign();//�����޸���ɵ����õ���λ�ý������·���
        flag = false;
    }
}
arrLeft.onclick = function () {
    if (flag) {

        //�����ఴť ���õ� ɾ�����һ�� ׷�ӵ���ͷ
        config.unshift(config.pop());//�޸����õ�
        assign();//�����޸���ɵ����õ���λ�ý������·���
        flag = false;
    }
}

//4.��ӽ�����
var flag = true;//flagΪtrue��ʱ���ʾ�������� ��ͷ���Ե��






//����鿴���з�����Ϸ����ת�Ļ���
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




//TD����������ʱ����ʾ�ĵ���Ч��
$("td").on("mouseenter", function () {
    $(this).children().children(".td-des").stop().fadeTo(400,1);
    //$(this).children().children(".td-des").slideDown();
});
$("td").on("mouseleave", function () {
    $(this).children().children(".td-des").stop().fadeTo(400,0);
    //$(this).children().children(".td-des").slideUp();
});


//��Ϸ���а��е����Ч��
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
