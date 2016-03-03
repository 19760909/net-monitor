// 预警标签操作js
$(function(){
	var $addTips = $("#tipsPanel .addbody .addTips");
	var $delbody = $("#tipsPanel .delbody");
	var $delTips = $("#tipsPanel .delbody .delTips");
	$($addTips).siblings().click(function(event) {
		$(this).clone().appendTo($delbody).addClass('delTips').removeClass('addTips').append('<span class="close" aria-label="Close"><span aria-hidden="true">&times;</span></span>');
		$(this).hide();
		$(this).parent(".addbody").siblings('.delbody').find('.close').on('click',  function(event) {
			event.preventDefault();
			console.log(1112);
			$(this).parent(".delTips").remove();
		});
	});
})



$(function(){
	queryDataAlert1();
	queryDataAlert2();
	queryDataAlert3();
	queryAlertWords();
})

// 今日预警
function queryDataAlert1(){
	var tbody=$("#todayAlertTbody");
	var thisweek=$("#thisweekAlertBody");
	var history=$("#historyAlertBody");
	var innerHtmls=[];
	var period="today";
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTime?period="+period,
		data:{},
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
			
		}
	})
}

// 本周预警
function queryDataAlert2(){
	var tbody=$("#todayAlertTbody");
	var thisweek=$("#thisweekAlertBody");
	var history=$("#historyAlertBody");
	var innerHtmls=[];
	var period="week";
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTime?period="+period,
		data:{},
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
			
		}
	})
}

// 历史预警
function queryDataAlert3(){
	var history=$("#historyAlertBody");
	var innerHtmls=[];
	var period="history";
	$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts/byTime?period="+period,
		data:{},
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
			
		}
	})
}

// 预警词列表
function queryAlertWords(){
	var hotKeywords=$('#hotKeywordsBody');
	var innerHtmls=[];
	$.ajax({
		url:"http://73.72.10.30:8100/rest/keywords",
		data:{},
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
					innerHtmls.push("<th scope='row'><input type='checkbox'></th>");
					innerHtmls.push("<td>"+alertTags+"</td>");
					innerHtmls.push("<td>"+alertWords+"</td>");
					innerHtmls.push("<td>"+alterTime+"</td>");
					innerHtmls.push("<td>"+plan.matched+"</td>");
					innerHtmls.push("</tr>");
					hotKeywords.html(innerHtmls.join(""));
				}
			}
		}
	})

}


