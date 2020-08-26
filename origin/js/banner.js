;
(function() {
    //获取元素
    var $box = $('.conRight');
    var $imgList = $('.imgList');
    var $leftBtn = $('.leftBtn');
    var $rightBtn = $('.rightBtn');
    var $circle = $('.circle li');

    //获取初始化宽度box
    var $boxWidth = $box.width();
    //定义锁
    var flag = true;
    //定义计数器
    var num = 0;
    //设置左按钮点击事件
    $rightBtn.click(right());

    function right() {
        //判断锁
        if (!flag) {
            return;
        }
        flag = false;
        num++;
        $imgList.animate({
            left: -num * $boxWidth
        }, function() {
            if (num >= 3) {
                num = 0;
                $imgList.css('left', 0);
            }
            flag = true;
            circleRed();
        });
    }
    // //设置右按钮点击事件
    $leftBtn.click(function() {
        if (!flag) {
            return;
        }
        flag = false;
        num--;
        if (num < 0) {
            num = 3;
            $imgList.css('left', -950 * 3);
            num--;
        }
        $imgList.animate({
            left: -num * $boxWidth
        }, function() {
            flag = true;
            circleRed();
        });
    });
    //设置小圆圈
    $circle.each(function(index, value) {
        $(value).click(function() {
            num = index;
            $imgList.animate({
                left: -num * $boxWidth
            }, function() {
                circleRed();
            });
        });
    });

    //设置小圆点样式
    function circleRed() {
        $circle.each(function(index, value) {
            if (index == num) {
                $(value).addClass('active');
            } else {
                $(value).removeClass();
            }
        });
    }

    //设置定时器自动播放轮播图
    var time = setInterval(function() {
        right();
    }, 2000);


})();