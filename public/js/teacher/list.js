/**
 * Created by WIN7 on 2017/8/20.
 */
define(["jquery", "template", "bootstrap"], function ($, template) {
  
  $.ajax({
    type: "get",
    url: "/api/teacher",
    success: function (info) {
      // console.log(info);
      var html = template("teacher_list_tpl", info);
      $("#teacher_list").html(html);
    }
    
  })
  
  
  //查看功能   点击查看按钮,让模太框显示
  $("body").on("click", ".btn_view", function () {
    var tc_id = $(this).parent().data("id");
    $.ajax({
      type: "get",
      url: "/api/teacher/view",
      data: {
        tc_id: tc_id
      },
      success: function (info) {
        // console.log(info);
        if (info.code == 200) {
          var html = template("teacher_info_tpl", info.result)
          $("#teacherModal_tbody").html(html);
          $("#teacherModal").modal("show");
        }
        
      }
    })
    
    
  })
  
  //注销功能
  $("body").on("click", ".btn_handle", function () {
    var tc_id = $(this).parent().data("id");
    var tc_status = $(this).parent().data("status");
    
    var $that = $(this);
    $.ajax({
      type: "post",
      url: "/api/teacher/handle",
      data: {
        tc_id: tc_id,
        tc_status: tc_status
      },
      success: function (info) {
        console.log(info);
       if(info.code==200){
         if(info.result.tc_status==0){
           $that.text("注 销");
           $that.removeClass("btn-success");
           $that.addClass("btn-warning");
         }else{
           $that.text("启 用");
           $that.removeClass("btn-warning");
           $that.addClass("btn-success");
         }
         
         $that.parent().data("status",info.result.tc_status);
         
       }
        
      }
      
      
    })
    
    
  })
  
  
})