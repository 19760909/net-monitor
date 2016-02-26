$(function(){
	var iptUsername=window.sessionStorage.getItem("userNmae");
	$("#iptUsername").text(iptUsername);
	 $("#userOut").click(function(){
          window.location.href="../../login.html";
        });
})