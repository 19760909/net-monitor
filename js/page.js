// 预警标签操作js
$(function(){
	
	var addbody = $("#addbody");
	var addTips = $("#addbody .addTips");
	var delbody = $("#delbody");
	var delTips = $("#delbody .delTips");
	$(addTips).click(function(){
		var addTxt=$(this).text();
		var i=0;
		$("#delbody .delTips .txt").each(function(){
			if($(this).text()==addTxt){
				i=1;
			};
		});
		if(i!=1){
		$(this).clone().addClass('delTips').removeClass('addTips').append('<span class="close" aria-label="Close"><span aria-hidden="true">&times;</span></span>').appendTo(delbody);
		selData();
		}
		$(this).parent(".addbody").siblings('.delbody').find('.close').click(function(event) {
			$(this).parent(".delTips").detach();
			selData();
		});
	})
})

function selData(){
	var tagTxts=$("#delbody .delTips .txt").text();
	var tagTxt=$("#delbody .delTips .txt")
	var tags="";
	tagTxt.each(function(index){
		if (index==tagTxt.length-1) {
			tags+=$(this).text();
		}else{
			tags+=$(this).text()+",";
		}
	});
	// for(var i=0;i<tagTxt.length;i++){
	// 	if (i==tagTxt.length-1) {
	// 		tags+=tagTxt[i];
	// 	}else{
	// 		tags+=tagTxt[i]+",";
	// 		console.log(tags);
	// 	}
	// };
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTags/"+tags,
		dataType:"json",
		type:"get",
		success:function(data){
			// queryDataAlert3();
		}
	})
}

$(function(){
	queryDataAlert1();
	queryDataAlert2();
	queryDataAlert3();
	queryAlertWords();
	showLog();
})

// 今日预警
function queryDataAlert1(page){
	var tbody=$("#todayAlertTbody");
	var thisweek=$("#thisweekAlertBody");
	var history=$("#historyAlertBody");
	var innerHtmls=[];
	var period="today";
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTime?period="+period+"&page="+page+"&size=20",
		// data:{page:0,size:10},
		dataType:"json",
		type:"get",
		success:function(data){
			var innerData=data.data.rows;
			if (innerData!=null&&innerData.length>0) {
				for(var i=0;i<innerData.length;i++){
					var plan=innerData[i];
					var dataTags=plan.tags;
					var dataWords=plan.words;
					var alterTime=plan.logtime.date.year+"-"+plan.logtime.date.month+"-"+plan.logtime.date.day+"&nbsp;"+plan.logtime.time.hour+":"+plan.logtime.time.minute+plan.logtime.time.second;
					if (dataTags!=null&&dataTags.length>0) {
						var alertTags="";
						for(var j=0;j<dataTags.length;j++){
							if (j==dataTags.length-1) {
								alertTags+=dataTags[j];
							}else{
								alertTags+=dataTags[j]+",";
							}
						};
					};
					if (dataWords!=null&&dataWords.length>0) {
						var alertWords="";
						for(var j=0;j<dataWords.length;j++){
							if (j==dataWords.length-1) {
								alertWords+=dataWords[j];
							}else{
								alertWords+=dataWords[j]+",";
							}
						};
					};
					innerHtmls.push("<tr>");
					innerHtmls.push("<th scope='row'>"+i+"</th>");
					innerHtmls.push("<td>"+alertTags+"</td>");
					innerHtmls.push("<td>"+alertWords+"</td>");
					innerHtmls.push("<td>"+alterTime+"</td>");
					innerHtmls.push("<td>"+plan.seq+"</td>");
					innerHtmls.push("<td><a href="+'"'+plan.url+'"'+">查看</a></td>");
					innerHtmls.push("</tr>");
					tbody.html(innerHtmls.join(""));
				};
			}
			pageding($("#todayAlertPage"),"queryDataAlert1",data);
		}
	})
}

// 本周预警
function queryDataAlert2(page){
	var tbody=$("#todayAlertTbody");
	var thisweek=$("#thisweekAlertBody");
	var history=$("#historyAlertBody");
	var innerHtmls=[];
	var period="week";
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTime?period="+period+"&page="+page+"&size=20",
		data:{page:0,size:10},
		dataType:"json",
		type:"get",
		success:function(data){
			var innerData=data.data.rows;
			if (innerData!=null&&innerData.length>0) {
				for(var i=0;i<innerData.length;i++){
					var plan=innerData[i];
					var dataTags=plan.tags;
					var dataWords=plan.words;
					var alterTime=plan.logtime.date.year+"-"+plan.logtime.date.month+"-"+plan.logtime.date.day+"&nbsp;"+plan.logtime.time.hour+":"+plan.logtime.time.minute+plan.logtime.time.second;
					if (dataTags!=null&&dataTags.length>0) {
						var alertTags="";
						for(var j=0;j<dataTags.length;j++){
							if (j==dataTags.length-1) {
								alertTags+=dataTags[j];
							}else{
								alertTags+=dataTags[j]+",";
							}
						};
					};
					if (dataWords!=null&&dataWords.length>0) {
						var alertWords="";
						for(var j=0;j<dataWords.length;j++){
							if (j==dataWords.length-1) {
								alertWords+=dataWords[j];
							}else{
								alertWords+=dataWords[j]+",";
							}
						};
					};
					innerHtmls.push("<tr>");
					innerHtmls.push("<th scope='row'>"+i+"</th>");
					innerHtmls.push("<td>"+alertTags+"</td>");
					innerHtmls.push("<td>"+alertWords+"</td>");
					innerHtmls.push("<td>"+alterTime+"</td>");
					innerHtmls.push("<td>"+plan.seq+"</td>");
					innerHtmls.push("<td><a href="+'"'+plan.url+'"'+">查看</a></td>");
					innerHtmls.push("</tr>");
					thisweek.html(innerHtmls.join(""));
				};
			}
			pageding($("#weekAlertPage"),"queryDataAlert2",data);
		}
	})
}

// 历史预警
function queryDataAlert3(page){
	var history=$("#historyAlertBody");
	var innerHtmls=[];
	var period="history";
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTime?period="+period+"&page="+page+"&size=20",
		// data:{page:0,size:10},
		dataType:"json",
		type:"get",
		success:function(data){
			var innerData=data.data.rows;
			if (innerData!=null&&innerData.length>0) {
				for(var i=0;i<innerData.length;i++){
					var plan=innerData[i];
					var dataTags=plan.tags;
					var dataWords=plan.words;
					var alterTime=plan.logtime.date.year+"-"+plan.logtime.date.month+"-"+plan.logtime.date.day+"&nbsp;"+plan.logtime.time.hour+":"+plan.logtime.time.minute+plan.logtime.time.second;
					if (dataTags!=null&&dataTags.length>0) {
						var alertTags="";
						for(var j=0;j<dataTags.length;j++){
							if (j==dataTags.length-1) {
								alertTags+=dataTags[j];
							}else{
								alertTags+=dataTags[j]+",";
							}
						};
					};
					if (dataWords!=null&&dataWords.length>0) {
						var alertWords="";
						for(var j=0;j<dataWords.length;j++){
							if (j==dataWords.length-1) {
								alertWords+=dataWords[j];
							}else{
								alertWords+=dataWords[j]+",";
							}
						};
					};
					innerHtmls.push("<tr>");
					innerHtmls.push("<th scope='row'>"+i+"</th>");
					innerHtmls.push("<td>"+alertTags+"</td>");
					innerHtmls.push("<td>"+alertWords+"</td>");
					innerHtmls.push("<td>"+alterTime+"</td>");
					innerHtmls.push("<td>"+plan.seq+"</td>");
					innerHtmls.push("<td><a href="+'"'+plan.url+'"'+">查看</a></td>");
					innerHtmls.push("</tr>");
					history.html(innerHtmls.join(""));
				};
			}
			pageding($("#historyAlertPage"),"queryDataAlert3",data);
		}
	})
}

// 预警词列表
function queryAlertWords(page){
	var hotKeywords=$('#hotKeywordsBody');
	var innerHtmls=[];
	
	$.ajax({
		url:"http://73.72.10.30:8100/rest/keywords?page="+page+"&size=20",
		// data:{page:page,size:size},
		dataType:"json",
		type:"get",
		success:function(data){
			var innerData=data.data.rows;
			if (innerData!=null&&innerData.length>0) {
				for(var i=0;i<innerData.length;i++){
					var plan=innerData[i];
					var dataTags=plan.tags;
					var dataWords=plan.words;
					var alterTime=plan.createtime.date.year+"-"+plan.createtime.date.month+"-"+plan.createtime.date.day+"&nbsp;"+plan.createtime.time.hour+":"+plan.createtime.time.minute+plan.createtime.time.second;
					var alertTags="";
					var alertWords="";
					if (dataTags!=null&&dataTags.length>0) {
						
						for(var j=0;j<dataTags.length;j++){
							if (j==dataTags.length-1) {
								alertTags+=dataTags[j];
							}else{
								alertTags+=dataTags[j]+",";
							}
						};
					};
					if (dataWords!=null&&dataWords.length>0) {
						
						for(var j=0;j<dataWords.length;j++){
							if (j==dataWords.length-1) {
								alertWords+=dataWords[j];
							}else{
								alertWords+=dataWords[j]+",";
							}
						};
					};
					innerHtmls.push("<tr>");
					innerHtmls.push("<th scope='row'><input type='checkbox' value='"+plan.id+"'></th>");
					innerHtmls.push("<td>"+alertTags+"</td>");
					innerHtmls.push("<td>"+alertWords+"</td>");
					innerHtmls.push("<td>"+alterTime+"</td>");
					innerHtmls.push("<td>"+plan.matched+"</td>");
					innerHtmls.push("</tr>");
					hotKeywords.html(innerHtmls.join(""));
				}
			}
			pageding($("#AlertPage"),"queryAlertWords",data);
		}
	})

}

// 保存添加预警信息 
   
    function currentTime(){
    var d = new Date(),str = '';
     str += d.getFullYear()+'-';
     str  += d.getMonth() + 1+'-';
     str  += d.getDate()+' ';
     str += d.getHours()+':'; 
     str  += d.getMinutes()+':'; 
    str+= d.getSeconds()+':'; 
    return str;
    } 
    
    $(function(){
      $('#alertSave').on("click",function(event) {
        // var alertTag=$('#inputalertTxt').val();
        // var tisMsg=$('#inputlabel').val();
        // var d = new Date(),str = '';
        //  str += d.getFullYear()+'-';
        //  str  += d.getMonth() + 1+'-';
        //  str  += d.getDate()+' ';
        //  str += d.getHours()+':'; 
        //  str  += d.getMinutes()+':'; 
        //  str+= d.getSeconds()+'';
        // $('#hotKeywordsBody').append("<tr><th scope='row'> <input type='checkbox'></th><td>"+tisMsg+"</td><td>"+alertTag+"</td><td>"+str+"</td><td>0</td></tr>");
        // $(this).prop('data-dismiss',modal);
        var alertTag=$('#inputalertTxt').val();
        var tisMsg=$('#inputlabel').val();
        var token=window.sessionStorage.getItem("token");
        $.ajax({
         url:"http://73.72.10.30:8100/rest/keywords?token="+token,
         contentType:"application/json",
          data:JSON.stringify({ 
          	 name: "TEST",
			  words: [
			    alertTag 
			  ],
			  tags: [
			    tisMsg 
			  ]
			  }),
          dataType:"json",
          type:"POST",
          success:function(data){
          	// alert(JSON.stringify(data));
           window.location.reload();
          }
        })

      });
    })

     // 删除预警信息 
   
      $(function(){
        $('#deleteTags').click(function(){
        var id='';
        var len=$('#hotKeywordsBody').find('input:checked').length;
        var checkedVal=$('#hotKeywordsBody').find('input:checked');
        if (len>0) {
        	  $('#hotKeywordsBody').find('input:checked').each(function(index) {
	         	if (index==$('#hotKeywordsBody').find('input:checked').length-1) {
	         		id+=$(this).val();
	         	}else{
	         		id+=$(this).val()+",";
	         	}
	         });
        	  $('#sureDel').click(function(){
        	  	$.ajax({
        	  		url:"http://73.72.10.30:8100/rest/keywords/"+id,
        	  		data:{id:id},
        	  		dataType:"json",
        	  		type:"DELETE",
        	  		success:function(){
        	  			window.location.reload();
        	  		}
        	  	})
        	  })
        	}else{
        		alert("请选择标签");
        	};
        	
        })
      })


     function pageding(pagearr,fun_name,data){
                        var html1=[];
                        var totalPage =0;
                        if(data.data.pageTotal > 0){
                            totalPage = data.data.pageTotal-1;
                        }
                        html1.push("<span>共有<b>"+totalPage+"</b>页</span> ");
                        html1.push("<span>当前"+data.data.pageNumber+"/"+totalPage+"</span>");
                        if(data.data.pageNumber>0){
                            var shang = data.data.pageNumber-1;
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"(0)'>首页</a>");
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"("+shang+")'>上一页</a>");
                        }
                        if(data.data.pageNumber<data.data.pageTotal-1){
                            var xia = data.data.pageNumber+1;
                            var mo =data.data.pageTotal-1;
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"("+xia+")'>下一页</a>");
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"("+mo+")'>末页</a>");
                        }
                        pagearr.html("");
                        pagearr.append(html1.join(""));
        } 


// 查看日志

function showLog(){
	$('#show').click(function(){
		var Timebegin=$('#inputTimebegin').val();
		var Timeend=$('#inputTimeend').val();
		console.log(Timebegin);
		console.log(Timeend);
		$.ajax({
			url:"http://73.72.10.30:8100/rest/logfiles",
			dataType:"json",
			type:"get",
			success:function(){
				
			}
		})
	})
}
