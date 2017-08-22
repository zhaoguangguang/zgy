/**
 * Created by WIN7 on 2017/8/22.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  $(function () {
    // console.log(tool);
    //判断是新增还是修改操作,需要判断tc_id,如果有tc_id,说明是编辑操作,反之,新增操作
    var tc_id = tool.getParam("tc_id");
    
    if (tc_id) {
      //说明是编辑操作,需要发送ajax请求
      $.ajax({
        type: "get",
        url: "/api/teacher/edit",
        data: {
          tc_id: tc_id
        },
        success: function (info) {
          var data = info.result;
          data.title = "编辑讲师";
          data.btnText = "修 改";
          data.type = "edit";
          var html = template("teacher_add_tpl", data);
          $(".teacher").html(html);
          
          tool.setDate("#tc_join_date");
        }
      })
    } else {
      //说明是添加操作
      var html = template("teacher_add_tpl", {
        type: "add",
        title: "添加讲师",
        btnText: "添 加"
      });
      $(".teacher").html(html);
      tool.setDate("#tc_join_date");
    }
    
    //给按钮注册事件
    $("body").on("click", ".btn_add", function () {
      
      var url = "";
      if (tc_id) {
        url = "/api/teacher/update";
      } else {
        url = "/api/teacher/add";
      }
      
      $.ajax({
        type: "post",
        url: url,
        data:$("form").serialize(),
        success: function (info) {
          console.log(info);
          if(info.code == 200){
            
            location.href = "/teacher/list";
          }
        }
      });
      
    })
    
    
    
  })
  
  
})