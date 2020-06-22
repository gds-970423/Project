$(function () {
    //在登录之前先清除一下 遗留的token
    removetoken();
    //切换注册点击事件
    $('#reg-link').on('click', function () {
        // 点击注册 隐藏登录盒子 显示登录字体
        $('.red-box').hide();
        $('.login-box').show();
    });
    //切换注册点击事件
    $('#login-link').on('click', function () {
        // 点击注册 隐藏登录盒子 显示登录字体
        $('.red-box').show();
        $('.login-box').hide();
    });
    //从layui 里面获取到 layui -form
    var form = layui.form;
    //从layui 里面获取到 layui -layer
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 注册两次密码 验证
        repwd: function (value) {
            //获取第一次密码框的值 
            var pwd = $('.login-box [name=password]').val().trim();
            //判断两个值是否相同
            if (pwd !== value) return '密码不相同,请重新输入!'
        }
    });
    //监听 表单注册事件
    $('#form_reg').on('submit', function (e) {
        //阻止表单的默认跳转行为
        e.preventDefault();
        //获取注册信息
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        };
        //发送ajax请求
        $.post('/api/reguser', data, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            };
            layer.msg('注册成功，请登录!');
            //注册成功之后切换页面
            $('#login-link').click();
        });
    });
    //监听 表单登录事件
    $('#form-login').on('submit', function (e) {
        //阻止表单的默认跳转行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 快速获取表单数值
            data: $(this).serialize(),
            success: function (res) {
                //失败判断
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg(res.message);
                //讲登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token);
                //保存之后再跳转到后台 主页
                location.href = 'index.html';
            }
        });
    });
    function removetoken() {
        localStorage.removeItem('token');
    }
});