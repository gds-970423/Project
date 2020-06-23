$(function () {
    //先获取layui
    var form = layui.form;
    var layer = layui.layer;
    // 表单自定义正则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })
    //监听layui-form 下面的submit提交行为
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        //发送ajax
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                //判断失败
                if (res.status !== 0) {
                    return layer.msg('修改密码失败！');
                }
                layer.msg('修改密码成功！');
                //修改成功之后 自动调回login页面 并且清除token值
                // emptypassword();

            }
        });
    });
    //点击重置 
    $('#resetpws').on('click', function (e) {
        //阻止默认提交行为
        e.preventDefault();
        //调用清空
        emptypassword();
    });
    // 清空 密码框
    function emptypassword() {
        $('.layui-input').val('');
    }
});