$(function () {
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
        e.prevenDefault();
        console.log('333');
        //发送ajax请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            console.log(res);
            if (res.status !== 0) return alert(res.message);
            console.log(res.message);
        });
    });
});