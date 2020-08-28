;
(function() {
    //获取元素
    var $titer = $('#tit');
    var $concent = $('#concent');
    $.ajax({
        url: 'http://localhost:3001/json/json1.json',
        type: 'get',
        data: {

        },
        dataType: 'json',
        success(data) {
            var getParam = function(key) {
                    var querystring = location.search.slice(1);
                    var arr = querystring.split("&");
                    for (var i = 0; i < arr.length; i++) {
                        var subArr = arr[i].split("=");
                        if (key === subArr[0]) {
                            return subArr[1];
                        }
                    }
                }
                //获取url的search部分的内容
            var id = getParam("id");
            var titer = getParam('name');



            //根据id获取相对应的内容
            var arr = data.data.list.list;
            console.log(data.data.list.list);
            var arrId = arr.filter(function(value, index) {
                return value.goods_id === id;
            });
            var center = arrId[0]
                //让标题内容改变
            $titer.html(center.goods_name);

            //渲染区域
            $concent.html(`
                    <div class="con-left">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" style="height: 600px;">
                    <div class="carousel-item active">
                        <img src="${center.discount_img}" class="d-block w-100" alt="...">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

        </div>
        <div class="con-right">
            <div class="card mb-3" style="max-width: 600px; height: 600px; padding-left: 50px;">
                <div class="row no-gutters" style="width: 100%; height: 100%;">
                    <div class="col-md-8">
                        <div class="card-body con-style">
                            <h5 class="card-title">${center.goods_name}</h5>
                            <p>${center.desc}</p>
                            <p>id:${center.product_id}</p>
                            <p>￥${center.goods_price}</p>

                            <h4>选择版本</h4>
                            <P>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label style="width: 150px;" class="bg-warning btn btn-secondary active">
                                    <input class="" type="radio" name="options" id="option1" checked> 大
                                </label>
                                    <label style="width: 100px;" class="bg-success btn btn-secondary">
                                    <input  class="" type="radio" name="options" id="option2"> 中
                                </label>
                                    <label class="btn btn-secondary">
                                    <input type="radio" name="options" id="option3"> 小
                                </label>
                                </div>
                            </P>
                            <p class="card-text">
                                <span>小米自营</span>
                                <span>总计：${center.goods_price}元</span>
                            </p>
                            <p class="card-text gou"><button type="button" class="btn btn-lg btn-primary btn-gou" >加入购物车</button>
                                <button type="button" class="btn btn-secondary btn-lg" >收藏</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    
                    
                    `);

            // //设置加入购物车按钮
            var $btn = $('.btn-gou');
            $btn.click(function() {

                // console.log(JSON.parse(localStorage.getItem('a')));
                //     //设置本地存储
                var arrCun = JSON.parse(localStorage.getItem('a')) || []; //先把本地存储的数据拿出来
                //     //判断新增的是否和旧数据相同
                //     console.log(arrCun);
                //     console.log(center);
                console.log(arrCun);
                var isArr = arrCun.find(function(value, index) {
                    return value.goods_id === center.goods_id;
                });
                console.log(isArr);
                if (isArr) {
                    isArr.num++;
                } else {
                    center.num = 1;
                    arrCun.push(center);
                }
                localStorage.setItem('a', JSON.stringify(arrCun));
                //     // console.log(isArr);

            });
        }

    });
})();