/**
 * Created by WIN7 on 2017/8/20.
 */

//登录模块
define(["jquery", "jquery_cookie"], function ($) {
  $(function () {
    
    //此处还可以给form注册onsubmit事件,$("#formDate").submit(function()}
    $("#loginBtn").click(function () {
      $.ajax({
        type: "post",
        url: "/api/login",
        dataType: "json",
        data: $("#formDate").serializeArray(),
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo", userinfo, {path: "/", expire: 1});
            location.href = "/";
          }
        }
      })
      
      return false;
    })
  })
})

