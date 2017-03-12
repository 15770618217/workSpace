/**
 * title:"保存投诉查询部分的JS"
 * Author:allenzjw
 * Time:3/11
 */
//点击处理按钮 弹出层
//页面层
$('#tsTable tbody').on('click','.doBtn',function(){
	layer.open({
	  type: 2,
	  skin: 'CLYM-style', //加上边框
	  area: ['510px', '400px'], //宽高
	  title: '处理页面',
	  content: 'dealPage.html'
	});
});

// 点击查询按钮 开始显示表格内容
// 如果查询内容不存在 则显示为空
$('#searchBtn').click(function(){
	var html = '';
	$.ajax({
		type:"GET",
		url:"data/tsResult.json",
		success:function(TS){
			// 拿到投诉案件数据
			// 分页器
			layui.use(['laypage','layer'],function(){
				var laypage = layui.laypage,
				layer = layui.layer;

				var num = 7;//每一页出现的数据量
				// 模拟渲染
				var render = function(curr){//当前页
					var html = '',
						last = curr*num-1;//当前页的最后一行数据的下标
						last = last >= TS.length?(TS.length-1):last;
						for(var i=(curr*num-num); i<=last; i++){
							// 从未显示的第一行开始
							html += '<tr>'+
					            		'<td width="4%">'+TS[i].id+'</td>'+
					            		'<td width="8%">'+TS[i].COMPNAME+'</td>'+
					            		'<td width="12%">'+TS[i].COMTELPHONE+'</td>'+
					            		'<td width="16%">'+TS[i].COMPCARD+'</td>'+
					            		'<td width="8%">'+TS[i].DJRQ_S+'</td>'+
					            		'<td width="8%">'+TS[i].COMTYPE+'</td>'+
					            		'<td width="28%">'+TS[i].COMCONTEXT+'</td>'+
					            		'<td width="8%">'+TS[i].STATE+'</td>'+
					            		'<td width="8%" style="text-align:center;"><button class="layui-btn doBtn">'+TS[i].btn+'</button></td>'+
					            	'</tr>';
						}
						return html;
				};

				laypage({
					cont:'demo4',
					pages:Math.ceil(TS.length/num),
					first:false,
					last: false,
					jump:function(obj){
						document.getElementById('TS-list').innerHTML = render(obj.curr);
					}
				});
			});
		}
	});
});