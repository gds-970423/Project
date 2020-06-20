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
});