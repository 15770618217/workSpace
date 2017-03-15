/*
 * title:"链接信息部分的JS"
 * Author:allenzjw
 * Time:3/13
 */

//初始化
$(function(){
  // 加载完成后生成 thead
  var initHead =
    '<thead>'+
      '<tr>'+
      '<th width="6%">序号</th>'+
      '<th width="12%" name="AJBH">案件编号</th>'+
      '<th width="10%" name="NAME">姓名</th>'+
      '<th width="24%" name="URL">涉案网址</th>'+
      '<th width="16%" name="URLNAME">网站名称</th>'+
      '<th width="12%" name="TYPE">链接类型</th>'+
      '<th width="10%" name="CREATETIME">发生时间</th>'+
      '<th width="20%">操作</th>'+
      '</tr>'+
    '</thead>';
  $('#ljTable').prepend(initHead);
  //初始化自定义表头
  initTitle();
});

function initTitle(){
  //  初始化时加载changeTitle中的信息
  var initDeleteTitle =
    '<li><span name="AJBH">案件编号</span><i class="layui-icon">&#xe640;</i></li>'+
    '<li><span name="NAME">姓名</span><i class="layui-icon">&#xe640;</i></li>'+
    '<li><span name="URL">涉案网址</span><i class="layui-icon">&#xe640;</i></li>'+
    '<li><span name="URLNAME">网站名称</span><i class="layui-icon">&#xe640;</i></li>'+
    '<li><span name="TYPE">链接类型</span><i class="layui-icon">&#xe640;</i></li>'+
    '<li><span name="CREATETIME">发生时间</span><i class="layui-icon">&#xe640;</i></li>';

  $('ul#delete-box').html(initDeleteTitle);

  var initAddTitle ='';

  $('ul#add-box').html(initAddTitle);
};
// 遮罩层JS
//灰色图层遮盖
$('.hui').height(window.screen.availHeight);
//遮盖层显示body不可滚动
function huiShow(){
    $('.hui').css('display','block');
    $('body').css('overflow',"hidden");
}
//遮盖层隐藏body可滚动
function huiHide(){
    $('.hui').css('display','none');
    $('body').css('overflow',"auto");
}

//点击x号
$('.cancel').click(function(){
	huiHide();
	$(this).parent().parent().css('display','none');
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
					                '<td width="12%" name="AJBH">'+LJ[i].AJBH+'</td>'+
					                '<td width="10%" name="NAME">'+LJ[i].XM+'</td>'+
					                '<td width="24%" name="URL">'+LJ[i].SAWZ+'</td>'+
					                '<td width="16%" name="URLNAME">'+LJ[i].WZMC+'</td>'+
					                '<td width="12%" name="TYPE">'+LJ[i].LJLX+'</td>'+
					                '<td width="10%" name="CREATETIME">'+LJ[i].FSSJ+'</td>'+
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
 * 点击自定义表头 弹窗
 */
$('#changeTltle').click(function(){
	  //显示弹窗
    $('.changeTitle-wrap').css('display','block');
    //显示遮罩层
    huiShow();
    //自定义表头btn
    $('#delete-box').on('click','li',function () {
        $('#add-box').append($(this));
        $(this).children('i').html('&#xe608;');
    });

    $('#add-box').on('click','li',function () {
        $('#delete-box').append($(this));
        $(this).children('i').html('&#xe640;');
    });

    //选择完自定义表头 点击提交触发事件
    $('.changeTitle-wrap #submitBtn').click(function(){
      changeTitle();
    });

    function changeTitle(){
      // console.log($('ul#delete-box li'));
        var  liList = $('ul#add-box li'),
              arr = [],
              html = '';
        for(var i=0; i<liList.length; i++){
            // console.log($(liList[i]).find('span').attr('name'));
            arr[i] = $(liList[i]).find('span').attr('name');
        }
        console.log(arr);
        //遍历ljTable 下 thead中的th如果arr存在 则设置显示 否则显示隐藏
        var thList = $('#ljTable thead tr th');
        var tdList = $('#ljTable tbody tr td');
        console.log(tdList);
        for(var i=0; i<thList.length; i++){
            // console.log(thList[i]);
            for(var j=0; j<arr.length; j++){
              // console.log('启动')
              if($(thList[i]).attr('name') === arr[j]){
                // console.log('存在');
                $(thList[i]).css('display','none');
              }
            }
        }
        for(var i=0; i<tdList.length; i++){
            // console.log(tdList);
            for(var j=0; j<arr.length; j++){
                // console.log('启动')
                if($(tdList[i]).attr('name') === arr[j]){
                // console.log('存在');
                $(tdList[i]).css('display','none');
              }
            }
        }
        huiHide();
        $('.changeTitle-wrap').css('display','none');
    };
    //reset 点击取消按钮
    $('.changeTitle-wrap #cancelBtn').click(function(event){
      event.stopPropagation();
      initTitle();
    });
});
/**
 * 点击详情 弹窗 账户信息
 */
$('#ljTable tbody').on('click','.detailsClick',function(){
    //显示弹窗
    $('.accountDetails-wrap').css('display','block');
    //显示遮罩层
    huiShow();
    // 将该条信息的内容 在弹窗中展示
    var tdList = $(this).parent().parent().children(),
        arr = [],
        data = {};
    for(var i=0; i<tdList.length-1; i++){
      // console.log($(tdList[i]).text());
      arr.push($(tdList[i]).text());
    }
    // console.log(arr);
    // 将数组变成json对象
    data.ZJID = arr[0];
    data.AJBH = arr[1];
    data.NAME = arr[2];
    data.URL = arr[3];
    data.URLNAME = arr[4];
    data.TYPE = arr[5];
    data.CREATETIME = arr[6];
    // console.log(data);

    // console.log($('.accountDetails-wrap .layui-form input'));
    var inputList = $('.accountDetails-wrap .layui-form input');
    // console.log(inputList.length);
    for(var j=1; j<=inputList.length; j++){
        // console.log(inputList[j]);
        $(inputList[j-1]).val(arr[j]);
    }

    //ajax向后台发送请求 data
    // $.ajax({
    //   type:"POST",
    //   url:"",
    //   data:data.ZJID,
    //   success:function(){
    //
    //   }
    // });
    // 点击title切换内容
    $('#bottom-title span').click(function(){
        var _this = $(this);
        _this.addClass('active')
            .siblings()
            .removeClass('active');
        var className = (_this.attr('class')).slice(0,4);
        // console.log(className);
        $('#'+className).css('display','block')
            .siblings()
            .css('display','none');
    });
});

/**
 * 点击修改 弹窗 修改账户信息
 */
$('#ljTable tbody').on('click','.modifyClick',function(){
    //显示弹窗
    $('.modifyDetails-wrap').css('display','block');
    //显示遮罩层
    huiShow();
    // 将该条信息的内容 在弹窗中展示
    var tdList = $(this).parent().parent().children(),
      arr = [],
      arr1 = [],
      data = {};
    for(var i=0; i<tdList.length-1; i++){
      // console.log($(tdList[i]).text());
      arr.push($(tdList[i]).text());
    }
    // console.log(arr);
    // 将数组变成json对象
    // data.ZJID = arr[0];
    // data.AJBH = arr[1];
    // data.NAME = arr[2];
    // data.URL = arr[3];
    // data.URLNAME = arr[4];
    // data.TYPE = arr[5];
    // data.CREATETIME = arr[6];
    // console.log(data);

    var inputList = $('.modifyDetails-wrap .layui-form input');
    // console.log(inputList.length);
    for(var j=1; j<=inputList.length; j++){
      // console.log(inputList[j]);
      $(inputList[j-1]).val(arr[j]);
    }
    //修改完成后 点击提交 上传数据
    $('#modify-submit').click(function(){
        arr1 = [];
        for(var i=0; i<inputList.length; i++){
          // console.log($(inputList[i]).val());
          arr1.push($(inputList[i]).val());
        }
        // console.log(arr1);
        data.ZJID = arr[0];
        data.AJBH = arr1[0];
        data.NAME = arr1[1];
        data.URL = arr1[2];
        data.URLNAME = arr1[3];
        data.TYPE = arr1[4];
        data.CREATETIME = arr1[5];
        console.log(data);
        // ajax发送data数据给后台保存
        // $.ajax({
        //   type:"JSON",
        //   url:"",
        //   data:data,
        //   success:function(){
        //
        //   }
        // });
    });
});

/**
 * 点击标记 弹窗 标记
 */
$('#ljTable tbody').on('click','.signClick',function(){
    var ZJID = $(this).parent().parent().find('td:first-child').text();

	  //显示弹窗
	  $('.sign-wrap').css('display','block');
    //显示遮罩层
    huiShow();
    //表单提交
    layui.use('form', function(){
      var form = layui.form();
      //监听提交
      form.on('submit(signForm)', function(data){
        var dataString = JSON.stringify(data.field);
        var dataObj = data.field;
        //往对象中添加主键ID
        dataObj.ZJID = ZJID;
        console.log(dataObj);
        // console.log(ZJID);

        // ajax将数据发送给后台
        // $.ajax({
        //   type:'POST',
        //   url:'',
        //   data:dataObj,
        //   success:function(){
        //
        //   }
        // });
        if (dataObj.SIGN === '是') {
          console.log('你被拉黑名单了');
        }else{
          console.log('你没有被标记');
        }
        return false;
      });
    });
});
