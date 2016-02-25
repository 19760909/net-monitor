$(function(){
	var iptUsername=window.sessionStorage.getItem("userNmae");
	$("#iptUsername").text(iptUsername);
	 $("#userOut").click(function(){
          console.log(1122);
          window.location.href="./login.html";
        });
})