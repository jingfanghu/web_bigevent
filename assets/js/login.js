$(function () {
    //绑定注册的点击事件
    $('#link_reg').on('click', function () {
        $('.regBox').show();
        $('.loginBox').hide();
    })
    //绑定登录的点击事件
    $('#link_login').on('click', function () {
        $('.regBox').hide();
        $('.loginBox').show();
    })

    //要利用layui的一些方法的话需要先获取这个方法
    var form = layui.form;
    var layer = layui.layer;
    // 自定义表单验证的规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            if ($('.regBox [name=password]').val() !== value) {
                return '两次输入密码不一致';
            }
        }
    })

    //实现登录提交功能
    $('#from_login').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('.loginBox [name=username]').val(),
            password: $('.loginBox [name=password]').val(),
        }
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);

            }

            //利用layui的组件实现弹窗的效果
            layer.msg("登录成功");
            localStorage.setItem('token', res.token)
            location.herf = '/index.html';//登录成功之后跳转到首页
        }
        )
    })

    //实现注册功能
    $('#from_reg').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: 'data',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录");
                $('#link_login').click();
            }

        })



    })

    })