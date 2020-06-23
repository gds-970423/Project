$(function () {
    //form 获取
    var form = layui.form;
    var layer = layui.layer;
    //点击重置
    $('#reset_info').on('click', function (e) {
        //阻止默认重置效果
        e.preventDefault();
        setuserinfo();
    });
    //点击修改个人信息
    $('.layui-form').on('submit', function (e) {
        //阻止默认重置效果
        e.preventDefault();
        //发送修改信息的ajax
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                //判断失败
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                //提示成功
                layer.msg('更新用户信息成功！');
                //更新成功之后 重新加载 父页面的获取用户信息
                window.parent.getuserinfo();
            }
        });
    });

    //获取基本信息 
    setuserinfo();
    function setuserinfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                //失败判断
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                //快速form赋值
                form.val("form_info", res.data)
            }
        });
    };
    //表单重置
    function reset_info() {

    };
});