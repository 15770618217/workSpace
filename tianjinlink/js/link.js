/*
 * title:"链接信息部分的JS"
 * Author:allenzjw
 * Time:3/13
 */
//第一次加载时 默认是全部的表头
var html = '';
$(function(){
   html = ' <thead>'+
              '<tr>'+
   	            '<th width="6%">序号</th>'+
				'<th width="12%">案件编号</th>'+
				'<th width="10%">姓名</th>'+
				'<th width="24%">涉案网址</th>'+
				'<th width="16%">网站名称</th>'+
				'<th width="12%">链接类型</th>'+
				'<th width="10%">发生时间</th>'+
				'<th width="20%">操作</th>'+
	          '</tr>'+
	       '</thead>';
	$('#ljTable').prepend(html);
});
// 点击查询按钮 发起ajax请求向后台请求数据 并显示
// 如果查询内容不存在 则显示空
$('#searchBtn').click(function(){
	$.ajax({
		type:"GET",
		url:"data/ljData.json",
		success:function(LJ){
			// 拿到数据进行拼接展示
			// 实现分页器
			layui.use(['laypage','layer'],function(){
				var laypage = layui.laypage,
					layer = layui.layer;

				var num = 8;//每一页显示8条数据
				//模拟渲染
				var render = function(curr){//当前页
					var html = '',//调用一次render清空一次html 
						j = 0,
						last = curr*num-1;//当前页的最后一行数据的下标

					last = last >= LJ.length?(LJ.length-1):last;
					for(var i = (curr*num-num); i<=last; i++){
						// 从未显示的第一条数据开始
						j = j+1;
						html += '<tr>'+
					                '<td width="6%">'+j+'</td>'+
					                '<td width="12%">'+LJ[i].AJBH+'</td>'+
					                '<td width="10%">'+LJ[i].XM+'</td>'+
					                '<td width="24%">'+LJ[i].SAWZ+'</td>'+
					                '<td width="16%">'+LJ[i].WZMC+'</td>'+
					                '<td width="12%">'+LJ[i].LJLX+'</td>'+
					                '<td width="10%">'+LJ[i].FSSJ+'</td>'+
					                '<td width="20%">'+
					                	'<span class="detailsClick handelClick">详情</span><span class="modifyClick handelClick">修改</span><span class="signClick handelClick">标记</span>'+			
					                '</td>'+
					            '</tr>';
					}
					return html;
				}; 

				laypage({
					cont:'demo4',
					pages:Math.ceil(LJ.length/num),
					first:false,
					last:false,
					jump:function(obj){
						document.getElementById('LJ-list').innerHTML = render(obj.curr);
					}
				});
			});
		}
	});
});
/**
 *父窗口那子窗口的数据test
 */


/**
 * 点击自定义表头 弹窗
 */
$('#changeTltle').click(function(){
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['490px','300px'],
		title: '自定义表头',
		content: 'changeTitle.html'
	});
});
/**
 * 点击详情 弹窗 账户信息
 */
$('#ljTable tbody').on('click','.detailsClick',function(){
	var _this = $(this),
		data =_this.parent().siblings(),
		arr = [];
	for(var i = 1; i< data.length; i++){
		// console.log($(data[i]).text());
		arr.push($(data[i]).text());
	}
	// console.log(arr);
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['950px','560px'],
		title: '账户信息',
		content: 'accountDetails.html',
		success: function(layero, index){
		    var body = layer.getChildFrame('body',index);
		    var iframeWin = window[layero.find('iframe')[0]['name']];
		    // console.log(arr); //得到iframe页的body内容
		    // console.log(body.find('input'));
		    var inputList = body.find('input');
		    for(var j = 0; j< inputList.length; j++){
		    	$(inputList[j]).val(arr[j]);
		    }
		}
	});
});
/**
 * 点击修改 弹窗 修改账户信息
 */
$('#ljTable tbody').on('click','.modifyClick',function(){
	var _this = $(this),
		data =_this.parent().siblings(),
		arr = [];
	for(var i = 1; i< data.length; i++){
		// console.log($(data[i]).text());
		arr.push($(data[i]).text());
	}
	// console.log(arr);
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['830px','310px'],
		title: '修改账户信息',
		content: 'modifyDetails.html',
		success: function(layero, index){
		    var body = layer.getChildFrame('body',index);
		    var iframeWin = window[layero.find('iframe')[0]['name']];
		    // console.log(arr); //得到iframe页的body内容
		    // console.log(body.find('input'));
		    var inputList = body.find('input');
		    for(var j = 0; j< inputList.length; j++){
		    	$(inputList[j]).val(arr[j]);
		    }
		}
	});
}); 
/**
 * 点击标记 弹窗 标记
 */
$('#ljTable tbody').on('click','.signClick',function(){
	layer.open({
		type: 2,
		skin: 'CLYM-style',
		area: ['500px','300px'],
		title: '标记',
		content: 'sign.html'
	});
});