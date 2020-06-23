$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //获取 layui 
    var layer = layui.layer;
    //注册点击上传事件
    $('#Upload').on('click', function () {
        $('#file').click();
    });
    //鉴定文件上传 事件
    $('#file').on('change', function (e) {
        // 获取 用户上传的 文件
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请选择要上传的图片');
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });
    //添加 点击上传确定事件
    $('#headUpload').on('click', function () {
        //先获取到 要上传的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        //发送 ajax请求 更换头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                //失败判断 
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!');
                }
                //更换 成功后
                layer.msg('更换头像成功!');
                // 从新加载客户信息
                window.parent.getuserinfo();
            }
        });
    });
});