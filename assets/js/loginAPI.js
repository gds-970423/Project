$.ajaxPrefilter(function (options) {
    //拼接 url请求头
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    //拼接headers 请求头
    // 判断一下 以 /my/ 开头的请求路径
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //localStorage.getItem('token')  这里获取的token 是 登录是 浏览器保存的
            Authorization: localStorage.getItem('token') || '',
        };
    }
    // 不论成功还是失败，最终都会调用 complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
});