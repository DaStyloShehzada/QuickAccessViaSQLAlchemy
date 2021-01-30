var MultiDatabase="N";
var RefreshIntervalTime="60";  <!--Should be defined in  Seconds 60-->


function setDefaults(){

delCookie("MultiDatabase","/",null);
setCookie("MultiDatabase",MultiDatabase,null,"/",null,null);

delCookie("RefreshInterval","/",null);
setCookie("RefreshInterval",RefreshIntervalTime,null,"/",null,null);

}
