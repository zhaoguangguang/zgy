/**
 * Created by WIN7 on 2017/8/22.
 */
define(["jquery","template","uploadify"],function ($,template) {
   $(function () {
     $("#upfile").uploadify({
       height:120,
       swf:"public/assets/uploadify/uploadify.swf",
       uploader:"/api/uploader/avater",
       width:120,
       fileObjName:"tc_avater",
       buttonText:"",
       onUploadSuccess:function (file,data,response) {
           data = JSON.parse(data);
         
         $(".preview img").attr("src",data.result.path);
       }
       
       
       
     })
     
   })
})