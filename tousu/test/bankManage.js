/**
 * Created by Kinpin on 2017/3/8.
 */
$(function(){
	$('body').height(document.body.offsetHeight);
	page();
	
	//关闭
	$('.cancel').click(function(){
		huiHide();
		$(this).parent().parent().hide();
	});
	$('.no').click(function(){
		huiHide();
		$(this).parent().parent().hide();
	})
	
	//灰色图层遮盖
	$('.hui').height(window.screen.availHeight);
	
	
	//根据查询条件生成列表
	$('#search').click(function(){
		$.ajax({
			url:"",
			type:"POST",
			dataType:"json",
			data:{},
			success:function(res){
				
			}
		})
	});
	
	//自定义表头弹框
	$('#zdybt').click(function(){
		huiShow();
		$('.autoList').show();
		autoList();
	});
	
	//自定义表头提交
	$('#autoListConfirm').click(function(){
		var data=[];
		console.log($('#delEl li'));
		$('#delEl li').each(function(i){
			var json = new Object();
			//console.log(this);
			json.name = $(this).children('span').attr('name');
			json.text = $(this).children('span').text();
			console.log(json);
			console.log(i);
			data[i] = json;
		});
		console.log(data);
		$('#table>thead>tr').empty();
		$('#table>tbody').empty();
		$.each(data,function(i){
			$('#table>thead>tr').append('<th>'+ data[i].text +'</th>');
		})
		
		
	})
})

    //分页查询.初始化默认表格
    function page(curr) {
        var pageSize = 8;
        //以下将以jquery.ajax为例，演示一个异步分页
        $.getJSON(basePath + 'billcontroller/queryBill', {    //获得json数据
                    "pageIndex": curr || 1,
                    "pageSize": pageSize,
                    "QUERYCONDITION":""
                },
                function (res) { //从第1页开始请求。返回的json格式可以任意定义
                    laypage({
                        cont: 'page1', //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
//                        pages: res.TotalPage, //通过后台拿到的总页数
                        pages: Math.ceil(res.total/pageSize), //通过后台拿到的总页数
                        curr: curr || 1,
                        first: 1, //若不显示，设置false即可
                        //last: res.TotalPage, //若不显示，设置false即可
                        //prev: '<', //若不显示，设置false即可
                        //next: '>', //若不显示，设置false即可
                        skip:true,
                        groups:4,
                        skin:'#5BC0DE',
                        jump: function (obj,first) { //触发分页后的回调
                            if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                                page(obj.curr);
                            }
                        }
                    });
                   
                    $('#sort').html('');
                    $('#sort').append('<p class="red">共 <span style="color:#888;">'+res.total+'</span> 条&nbsp;&nbsp;&nbsp;&nbsp;共 <span style="color:#888;">'+Math.ceil(res.total/pageSize)+'</span> 页&nbsp;&nbsp;&nbsp;&nbsp;当前第 <span style="color:#888;">'+ res.index +'</span> 页</p>');
                    $('#table>tbody').empty();
                    var html="";
                    var data = res.data;
                    $.each(data,function (i) {
                        html += "<tr><td>"+ (i+1) +"</td>" +
                        "<td>"+ (data[i].AJBH==null?"":data[i].AJBH) +"</td>" +
                            "<td>"+ (data[i].ZHXM==null?"":data[i].ZHXM) +"</td>" +
                            "<td class='SAZH' title='查看上级/下级账户'>"+ (data[i].SAZH==null?"":data[i].SAZH) +"</td>" +
                            "<td>"+ (data[i].MC==null?"":data[i].MC.split("·")[1]) +"</td>" +
                            "<td>"+ (data[i].SSD==null?"":data[i].SSD) +"</td>" +
                            "<td>"+ (data[i].HKJE==null?"":data[i].HKJE) +"</td>" +
                            "<td>"+ (data[i].HKSJ==null?"":new Date(data[i].HKSJ).toLocaleString()) +"</td>" +
                            "<td>"+ (data[i].STATE==0?data[i].ZFSX:data[i].STATE==3?data[i].JZFSX:'') +"</td>" +
                            "<td>"+ (data[i].ZFJE==null?"":data[i].ZFJE) +"</td>" +
                            "<td>"+ (data[i].STATE_MC==null?"":data[i].STATE_MC) +"</td>" +
                            "<td class='option'><span class='stopPay' onclick='stopPayPrint("+ JSON.stringify(data[i]) +")'>止付 </span><span class='nextAccount Cyan4' onclick='lookAndAdd("+ JSON.stringify(data[i]) +")'>下级账户 </span><span class='changeContent Cyan4' onClick='changeContent("+JSON.stringify(data[i])+")'>修改 </span><span class='mark Cyan4'>标记</span></td>" +
                            "</tr>";
                    })
                    $('#table tbody').append(html);
                });
        //提交修改内容
        $('#confirm').click(function(){
        	var AJBH = $('#changeForm input[name="AJBH"]').val(),
        		SAZH = $('#changeForm input[name="SAZH"]').val(),
        		HKJE = $('#changeForm input[name="HKJE"]').val(),
        		HKSJ = $('#changeForm input[name="HKSJ"]').val()==''?'':new Date($('#changeForm input[name="HKSJ"]').val()).toLocaleString(),
        		ZFJE = $('#changeForm input[name="ZFJE"]').val();
//        		STATE = $('#changeForm input[name="STATE_MC"]').val();
        	 $.getJSON(basePath+'billcontroller/updateBillInfo',{
        		 "AJBH":AJBH,
        		 "SAZH":SAZH,
        		 "HKJE":HKJE,
        		 "HKSJ":HKSJ,	
        		 "ZFJE":ZFJE,
        		 "STATE":0
	        },function(res){
	        	console.log(res);
	        	location.reload();
	        })
        }) 
       
    }


//修改弹框
function changeContent(data) {
	console.log(data);
	huiShow();
    $('#change').show();
    $('.layui-input').val("");
    $('#changeForm div .layui-input').each(function (i) {
        var nam = $(this).attr('name');
        if(nam=='SSJG'){
        	nam = 'MC';
        	$(this).val(data[nam]==null?"":data[nam].split("·")[1]);
        }else if(nam=='HKSJ'){
        	$(this).val(data[nam]==null?"":new Date(data[nam]).toLocaleString());
        }else{
        	$(this).val(data[nam]);
        }
    });
}

//自定义表头btn
function autoList(){
	$('#delEl').on('click','li',function () {
	    $(this).children('i').html('&#xe608;');
	    $('#addEl').append($(this));
	});
	$('#addEl').on('click','li',function () {
	    $(this).children('i').html('&#xe640;');
	    $('#delEl').append($(this));
	});
}


//止付弹框
function stopPayPrint(data){
	console.log(data.STATE);
	if(data.STATE==0){
		return;
	}
	$('.stopPayBox').show();
	layer.open({
		type:2,
		area:['46%','530px'],
//		content:basePath + 'href/action?_NEXTPAGE=billinfo/stopPayPrint'
	})
}

//添加查看下级账户弹框
function lookAndAdd(data){
	huiShow();
	$('.lookAndAdd').show();
	$.ajax({
		url:basePath+'billcontroller/findNextAccount',
		type:"POST",
		dataType:"json",
		data:{
			"SAZH":data.SAZH
		},
		success:function(res){
			console.log(res);
		}
	})
	
}

//年月日方法
Date.prototype.toLocaleString = function() {
	return this.getFullYear()+"-"+(this.getMonth()+1)+"-"+this.getDate();
};

//遮盖层显示body不可滚动
function huiShow(){
	$('.hui').show();
	$('body').css('overflow',"hidden");
}
//遮盖层隐藏body可滚动
function huiHide(){
	$('.hui').hide();
	$('body').css('overflow',"auto");
}









