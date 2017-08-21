/**
 * Created by WIN7 on 2017/8/20.
 */

define(["jquery", 'template', "jquery_cookie"], function ($, template) {
  $(function () {
    
    //判断页面是不是登录页面,如果是登录页面,就不用渲染头像,如果是,则需要渲染;
    
    if (location.pathname != "/login") {
      //判断用户有没有PHPSESSID,如果有,就说明登录了,如果没有,就跳到login页面
      if ($.cookie("PHPSESSID")) {
        
        var userinfo = $.cookie("userinfo");
        console.log(userinfo);
        var info = JSON.parse(userinfo);
        var html = template("userinfo-tpl", info);
        
        $("#user_pro").html(html);
      } else {
        location.href = "/login";
      }
      
    }
    
    
    //退出登录
    $("#logout").on("click", function () {
      
      $.ajax({
        type: "post",
        url: "/api/logout",
        success: function (info) {
          console.log(info);
          if (info.code == 200) {
            //退出
            $.removeCookie("userinfo", {path: "/"});
            location.href = "/login";
          }
        }
      })
    });
    
    
    
    //侧边栏高亮
    
    var $links = $(".navs a");
  
      $links.each(function () {

        var $that = $(this);
        $that.removeClass("active");
        // console.log(location);
        if($that.attr("href")==location.pathname){
          $that.addClass("active");
        }
      });

  
    
    //二级菜单
    
    //点击时让二级菜单下面的ul显示
    $(".two_menu").on("click",function () {
    
        $(this).children(".list-unstyled").slideToggle();
      
    });
    
    //点击二级菜单下面的每个子元素时,让二级菜单处于展开状态
    $(".two_menu").find(".active").parent().parent().show();
  })
  
})