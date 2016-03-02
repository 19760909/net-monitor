 function yanzheng(token){

if(token==null||token==""){
  window.location.href="../../login.html";
}

}
 yanzheng(window.sessionStorage.getItem("token"));

function lost(){
	window.sessionStorage.setItem("token","");
	yanzheng(window.sessionStorage.getItem("token"));
	
}
setTimeout("lost()",10000000000);


