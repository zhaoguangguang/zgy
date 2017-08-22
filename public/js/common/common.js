/**
 * Created by WIN7 on 2017/8/20.
 */

define(["jquery", 'template',"nprogress", "jquery_cookie"], function ($, template,np) {
  $(function () {
    
    //进度条显示
    np.start();
    setTimeout(function () {
      np.done();
    },500)
  
    //每次发送ajax时候,让遮罩层 小齿轮显示出来
    $(document).ajaxStart(function () {
        $(".mask").show();
    });
    $(document).ajaxStop(function () {
      $(".mask").hide();
    })
    
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
          if (info.code == 200) {
            //退出
            $.removeCookie("userinfo", {path: "/"});
            location.href = "/login";
          }
        }
      })
    });
    
    
    //侧边栏高亮
    var pathname = location.pathname;
    // if ( pathname== "/teacher/add") {
    //   pathname = "/teacher/list";
    // }
    //获取地址栏中的pathname,跟a标签的href对比,如果相同,就让这个高亮,排他
    var pathObj={
      "/teacher/add":"/teacher/list",
    };
    pathname = pathObj[pathname]||pathname;
    
    
    var $links = $(".navs a");
    
    $links.each(function () {
      
      var $that = $(this);
      $that.removeClass("active");
      // console.log(location);
      if ($that.attr("href") == pathname) {
        $that.addClass("active");
      }
    });
    
    
    //二级菜单
    
    //点击时让二级菜单下面的ul显示
    $(".two_menu").on("click", function () {
      
      $(this).children(".list-unstyled").slideToggle();
      
    });
    
    //点击二级菜单下面的每个子元素时,让二级菜单处于展开状态
    $(".two_menu").find(".active").parent().parent().show();
  })
  
})