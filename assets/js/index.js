$(function () {
    //先隐藏 字体头像 和系统头像
    $('.layui-nav-img').hide();
    $('.iconVia').hide();
    getuserinfo();
    // 获取 layer 
    var layer = layui.layer;
    $('.logout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //确认退出后  清除 浏览器保存的token
            localStorage.removeItem('token');
            //跳转回 登录页面
            location.href = './login.html'

            layer.close(index);
        });
    });
});
//获取 用户的基本信息
function getuserinfo() {
    //发送ajax
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            console.log(res);
            // 失败判断
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(res.message);
            // 获取成功渲染 用户的头像
            renderAvatar(res.data);
        }
    });
};
//渲染 头像 
function renderAvatar(user) {
    // 1.先获取用户名
    var username = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + username);
    //3.判断用户是否已经上传了自定义头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        //3.2 渲染字体头像
        $('.layui-nav-img').hide()
        //3.3 获取用户名的首字母
        var first = username[0].toUpperCase()
        $('.iconVia').html(first).show();
    }

};