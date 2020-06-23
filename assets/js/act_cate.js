$(function () {
    //获取 layui 
    var layer = layui.layer;
    var form = layui.form;
    getArticle();
    //获取文章列表
    function getArticle() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                // console.log(res);
                //失败判定
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败!');
                }
                //成功后执行模板引擎
                var strhtml = template('getarticle', res)
                $('tbody').html(strhtml);
            }
        });
    };
    //声明全局变量 储存添加分类图层ID
    var addID = null;
    //声明全局变量 储存修改分类图层ID
    var editID = null;
    //注册添加文章类别点击事件
    $('.submit').on('click', function () {
        //获取一下当前图层的ID
        addID = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#form_type').html(),

        });
    });
    //委托注册     添加分类点击事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                //失败判断
                if (res.status !== 0) {
                    return layer.msg('添加文章分类失败!');
                }
                //清除 弹出图层
                layer.close(addID);
                //成功提示
                layer.msg('添加文章分类成功!');
                //成功后重新加载页面
                getArticle();
            }
        });
    });
    //委托注册     编辑文章点击事件
    $('tbody').on('click', '.btn-edit', function () {
        editID = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#form_compile').html(),
        });
        //先把 获取到的 文章类型 渲染到 页面表单中
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类型失败!');
                }
                //快速添加到 form表单中
                form.val('form-edit', res.data)
            }
        });
    });
    // 委托注册  修改文章 提交事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改文章类型失败!');
                }
                layer.msg('修改文章类型成功!');
                //清除 弹出图层
                layer.close(editID);
                //重新加载
                getArticle();
            }
        });
    });
    //注册 委托  删除文章的 点击事件
    $('body').on('click', '#btn-delete', function () {
        // 获取要删除的ID
        var id = $(this).attr('data-id');

        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            //确认之后 发送删除的ajax请求
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败!');
                    }
                    layer.msg('删除成功!');
                    getArticle();
                }
            });

        });
    });
});