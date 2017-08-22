/**
 * Created by WIN7 on 2017/8/22.
 */

define(["jquery","datepicker","datepicker_cn"], function ($) {
  
  function getParamObj() {
    var paramStr = location.search;
    paramStr = paramStr.slice(1);
    var paraArr = paramStr.split("&");
    var paraStrObj = {};
    for (var i = 0; i < paraArr.length; i++) {
      var key = paraArr[i].split("=")[0];
      var value = paraArr[i].split("=")[1];
      paraStrObj[key] = value;
    }
    return paraStrObj;
  }
  
  function getParam(key) {
    return getParamObj()[key];
  }
  
  function setDate(ele) {
    $(ele).datepicker({
      formate: "yyyy-mm-dd",
      endDate: "+0d",
      autoclose: true,
      language: "zh-CN",
      todayBtn: "linked",
      todayHighlight: true
      
    })
  }
  
  return {
    getParamObj: getParamObj,
    getParam: getParam,
    setDate: setDate
  }
  
})
