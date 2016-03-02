

// $(function(){
//   pageInit();
// });
// function pageInit(){
//   jQuery("#todayAlert").jqGrid(
//       {
//         url : "http://73.72.10.30:8100/rest/alerts",
//         datatype : "json",
//         colNames : [ 'ID', '预警类型', '名称', '预警时间', '触发人','详细内容' ],
//         colModel : [ 
//                      {name : 'id',index : 'id',width : 55}, 
//                      {name : 'type',index : 'type',width : 90}, 
//                      {name : 'name',index : 'name asc, invdate',width : 100}, 
//                      {name : 'time',index : 'time',width : 80,align : "right"}, 
//                      {name : 'nameT',index : 'nameT',width : 80,align : "right"}, 
//                      {name : 'detail',index : 'detail',width : 80,align : "right"}
//                    ],
//         rowNum : 10,
//         rowList : [ 10, 20, 30 ],
//         pager : '#pager2',
//         sortname : 'id',
//         mtype : "post",
//         viewrecords : true,
//         sortorder : "desc",
//       });
//   jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : true,del : true});
// }

$(function(){
	// var data=[];
	// var json=；	
queryData(1);
queryKeyData(1);

})
function queryData(page){
	var tbody=$("#todayAlertTbody");
	var thisweek=$("#thisweekAlertBody");
	var history=$("#historyAlertBody");
	var innerHtmls=[];
$.ajax({
		url:"http://73.72.10.30:8100/rest/alerts",
		// data:{page:page,pageSize:10},
		data:{page:0,size:10},
		dataType:"json",
		type:"get",
		success:function(data){
			var innerData=data.data.rows;
			if(innerData!=null&&innerData.length>0){
				for(var i=0;i<innerData.length;i++){
					var plan=innerData[i];
					var myDate=new Date();
					var nowDate=myDate.toLocaleDateString();
					var dateTime=plan.logtime.date.year+"/"+plan.logtime.date.month+"/"+plan.logtime.date.day;
					var dateBeyween=daysBetween(nowDate,dateTime);
					var alarmTypes="";
					var keyType=plan.types
					if(keyType.length>0){
						for(var j=0;j<keyType.length;j++){
							var alarmTemp="";
							if(keyType[j]=='KEYWORD'){
								alarmTemp="关键词";
							}
							if(keyType[j]=='TOPIC'){
								alarmTemp="专题";
							}
							if(keyType[j]=='LEADER'){
								alarmTemp="领导人";
							}

							if(j==keyType.length-1){
								alarmTypes+=alarmTemp;

							}else{
								alarmTypes+=alarmTemp+",";
							}
						}
					}
					var keyDetails="";
					if(plan.keywords!=null&&plan.keywords.length>0){
						var keyDetail="关键词：";
						var temp="";
						for(var j=0;j<plan.keywords.length;j++){
							if(j==plan.keywords.length-1){
								temp+=plan.keywords[j]+";";

							}else{
								temp+=plan.keywords[j]+",";
							}


						}
						keyDetail+=temp;
						keyDetails+=keyDetail;
						
					}
					if(plan.topics!=null&&plan.topics.length>0){
						var keyDetail="专题：";
						var temp="";
						for(var j=0;j<plan.topics.length;j++){
							if(j==plan.topics.length-1){
								temp+=plan.topics[j]+";";

							}else{
								temp+=plan.topics[j]+",";
							}


						}
						keyDetail+=temp;
						keyDetails+=keyDetail;
						
					}
					if(plan.leaders!=null&&plan.leaders.length>0){
						var keyDetail="专题：";
						var temp="";
						for(var j=0;j<plan.leaders.length;j++){
							if(j==plan.leaders.length-1){
								temp+=plan.leaders[j]+";";

							}else{
								temp+=plan.leaders[j]+",";
							}
						}
						keyDetail+=temp;
						keyDetails+=keyDetail;
					}
					

					if (dateTime==nowDate) {
						console.log(1);
						innerHtmls.push("<tr>");
						innerHtmls.push("<td>"+i+"</td>");
						innerHtmls.push("<td>"+alarmTypes+"</td>");
						innerHtmls.push("<td>"+keyDetails+"</td>");
						innerHtmls.push("<td>"+plan.logtime.date.year+"-"+plan.logtime.date.month+"-"+plan.logtime.date.day+" "+plan.logtime.time.hour+":"+plan.logtime.time.minute+":"+plan.logtime.time.second+"</td>");
	                    innerHtmls.push("<td>"+plan.srcIp+"</td>");
	                    innerHtmls.push("<td>"+plan.host+"</td>");
	                    innerHtmls.push("</tr>");
	                    tbody.html(innerHtmls.join(""));
					}else if(dateBeyween<=7){
						console.log(2);
						innerHtmls.push("<tr>");
						innerHtmls.push("<td>"+i+"</td>");
						innerHtmls.push("<td>"+alarmTypes+"</td>");
						innerHtmls.push("<td>"+keyDetails+"</td>");
						innerHtmls.push("<td>"+plan.logtime.date.year+"-"+plan.logtime.date.month+"-"+plan.logtime.date.day+" "+plan.logtime.time.hour+":"+plan.logtime.time.minute+":"+plan.logtime.time.second+"</td>");
	                    innerHtmls.push("<td>"+plan.srcIp+"</td>");
	                    innerHtmls.push("<td>"+plan.host+"</td>");
	                    innerHtmls.push("</tr>");
	                    thisweek.html(innerHtmls.join(""));
					}else{
						console.log(3);
						innerHtmls.push("<tr>");
						innerHtmls.push("<td>"+i+"</td>");
						innerHtmls.push("<td>"+alarmTypes+"</td>");
						innerHtmls.push("<td>"+keyDetails+"</td>");
						innerHtmls.push("<td>"+plan.logtime.date.year+"-"+plan.logtime.date.month+"-"+plan.logtime.date.day+" "+plan.logtime.time.hour+":"+plan.logtime.time.minute+":"+plan.logtime.time.second+"</td>");
	                    innerHtmls.push("<td>"+plan.srcIp+"</td>");
	                    innerHtmls.push("<td>"+plan.host+"</td>");
	                    innerHtmls.push("</tr>");
	                    history.html(innerHtmls.join(""));
					}
				}
				
			}
			pageding($("#todayAlertPage"),"queryData",data); 
		} 
	})
}

//+---------------------------------------------------
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd
//+---------------------------------------------------
function daysBetween(DateOne,DateTwo)
{
var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('/'));
var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('/')+1);
var OneYear = DateOne.substring(0,DateOne.indexOf ('/'));

var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('/'));
var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('/')+1);
var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('/'));

var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
return Math.abs(cha);
}

// function queryData(page){
// 	var tbody=$("#todayAlertTbody");
// 	var innerHtmls=[];
// $.ajax({
// 		url:"http://73.72.10.30:8100/rest/alerts",
// 		// data:{page:page,pageSize:10},
// 		dataType:"json",
// 		type:"get",
// 		success:function(data){
// 			var innerData=data.data;
// 			if(innerData!=null&&innerData.length>0){
// 				for(var i=0;i<innerData.length;i++){
// 					var plan=innerData[i];
// 					innerHtmls.push("<tr>");
// 					innerHtmls.push("<td>"+i+"</td>");
// 					var alterType="热词";
// 					if(plan.topics!=null&&plan.topics.length>0){
// 						alterType="专题";
// 					}
// 					// if(){

// 					// }
// 					innerHtmls.push("<td>"+alterType+"</td>");
// 					innerHtmls.push("<td>"+plan.keywords||paln.topics+"</td>");
// 					innerHtmls.push("<td>"+plan.rows.logtime.date.year+"-"+plan.rows.logtime.date.month+"-"+plan.rows.logtime.date.day+" "+plan.rows.logtime.time.hour+":"+plan.rows.logtime.time.minute+":"+plan.rows.logtime.time.second+"</td>");
//                     innerHtmls.push("<td>"+plan.srcIp+"</td>");
//                     innerHtmls.push("<td>"+plan.url+"</td>");
//                     innerHtmls.push("</tr>");
// 				}
// 				tbody.html(innerHtmls.join(""));
// 			}
// 			// getPageBar($("#todayAlertPage"),"queryData",data); 
// 		} 
// 	})
// }

function queryKeyData(page){
	var keyTbody=$("#hotKeywordsBody");
	var topicTbody=$("#topicBody");
	var leaderTbody=$("#leaderBody");
	var keyinnerHtmls=[];
	var topicinnerHtmls=[];
	var leaderinnerHtmls=[];
	var type=$("#type").val();
$.ajax({
		url:"http://73.72.10.30:8100/rest/keywords",
		// data:{page:0,size:10},
		dataType:"json",
		type:"get",
		success:function(data){
			var innerData=data.data.rows;
			if(innerData!=null&&innerData.length>0){
				for(var i=0;i<innerData.length;i++){
					var plan=innerData[i];
					var keywordsType=plan.type
					if(keywordsType=='KEYWORD'){
						keyinnerHtmls.push("<tr>");
						keyinnerHtmls.push("<th scope='row'><input type='checkbox'></th>");
						keyinnerHtmls.push("<td>"+plan.keywords+"</td>");
						keyinnerHtmls.push("<td>"+plan.createtime.date.year+"-"+plan.createtime.date.month+"-"+plan.createtime.date.day+" "+plan.createtime.time.hour+":"+plan.createtime.time.minute+":"+plan.createtime.time.second+"</td>");
						keyinnerHtmls.push("<td>"+plan.matched+"</td>");
	                    keyinnerHtmls.push("</tr>");
	                    keyTbody.html(keyinnerHtmls.join(""));

					}else if(keywordsType=='TOPIC'){
						topicinnerHtmls.push("<tr>");
						topicinnerHtmls.push("<th scope='row'><input type='checkbox'></th>");
						topicinnerHtmls.push("<td>"+plan.keywords+"</td>");
						topicinnerHtmls.push("<td>"+plan.createtime.date.year+"-"+plan.createtime.date.month+"-"+plan.createtime.date.day+" "+plan.createtime.time.hour+":"+plan.createtime.time.minute+":"+plan.createtime.time.second+"</td>");
						topicinnerHtmls.push("<td>"+plan.matched+"</td>");
	                    topicinnerHtmls.push("</tr>");
	                    topicTbody.html(topicinnerHtmls.join(""));
					}else{
						leaderinnerHtmls.push("<tr>");
						leaderinnerHtmls.push("<th scope='row'><input type='checkbox'></th>");
						leaderinnerHtmls.push("<td>"+plan.keywords+"</td>");
						leaderinnerHtmls.push("<td>"+plan.createtime.date.year+"-"+plan.createtime.date.month+"-"+plan.createtime.date.day+" "+plan.createtime.time.hour+":"+plan.createtime.time.minute+":"+plan.createtime.time.second+"</td>");
						leaderinnerHtmls.push("<td>"+plan.matched+"</td>");
	                    leaderinnerHtmls.push("</tr>");
	                    leaderTbody.html(leaderinnerHtmls.join(""));
					}
					// if(plan.topics!=null&&plan.topics.length>0){
					// 	alterType="专题";
					// }
					// if(){
					// }
				}
				
			}
			// getPageBar($("#todayAlertPage"),"queryKeyData",data); 
		} 
	})
}

// function paddingDay(pagearr,data){
// pageding(pagearr,"paddingDay",data);

// }
function pageding(pagearr,fun_name,data){
                        var html1=[];
                        var totalPage =0;
                        if(data.data.pageTotal > 0){
                            totalPage = data.data.pageTotal;
                        }
                        html1.push("<span>共有<b>"+totalPage+"</b>页</span> ");
                        html1.push("<span>当前"+data.data.pageNumber+"/"+totalPage+"</span>");
                        if(data.data.pageNumber>0){
                            var shang = data.data.pageNumber-1;
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"(0)'>首页</a>");
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"("+shang+")'>上一页</a>");
                        }
                        if(data.data.pageNumber<data.data.pageTotal){
                            var xia = data.data.pageNumber+1;
                            var mo =data.data.pageTotal;
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"("+xia+")'>下一页</a>");
                            html1.push("<a href='javascript:void(0)' onclick='"+fun_name+"("+mo+")'>末页</a>");
                           
                        }
                        pagearr.html("");
                        pagearr.append(html1.join(""));
        } 


