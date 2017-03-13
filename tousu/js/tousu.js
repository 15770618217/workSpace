/**
 * title:"保存投诉内容部分的JS"
 * Author:allenzjw
 * Time:3/11
 */
layui.use(['form','jquery'], function(){
	  	var form = layui.form();
	  	// 对下拉框绑定监听事件 如果下拉内容改变触发事件 对涉案账号进行验证
		form.on('select(leixing)',function(data){
		 	// 投诉类型
		    var lxVal = data.value;
		    var _this = $('#tsSAZH');
			var sazhStr =_this.val();
			// 投诉类型内容
			if (sazhStr === '') {
				_this.parent().next().css('display','block');
			}else if (lxVal === '0') {
				// 手机号验证
				if (checkMobile(sazhStr) === true) {
					console.log('tel is true!');
				}else{
					_this.parent().next().css('display','block');
				}
			}else if(lxVal === '1'){
				// 身份证验证
				if (checkCard(sazhStr) === true) {
					console.log('card is true!');
				}else{
					_this.parent().next().css('display','block');
				}
			} 
		});
	});

	/**
	*用途：检查输入的手机号是否正确
	*输入：
	*str: 字符串
	*返回：如果通过验证返回true,否则返回false
	 */
	function checkMobile(str){
		var reg = /^[1][3,5,8,9][0-9]{9}$/;
		var re = new RegExp(reg);
		if (re.test(str)) {
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 用途：检查身份证号是否正确
	 * 输入：
	 * str：字符串
	 * 返回：如果通过验证返回true,否则返回false
	 */
	function checkCard(str){
		// 15位数身份证号码正则表达式
		var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
		// 18位数身份证正则表达式
		var reg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

		if (str.match(reg1) === null && str.match(reg2) === null) {
			return false;
		}else{
			return true;
		}
	}

	// 验证投诉人
	$('#name').blur(function(){
		var _this = $(this);
		var nameStr = _this.val();
		if (nameStr === '') {
			_this.parent().next().css('display','block');
			$('#lay-submit').attr('disabled','disabled');
		} 
	});
	$('#name').on('input',function(){
 		var _this = $(this);
		var nameStr = _this.val();
		if (nameStr !== '') {
			_this.parent().next().css('display','none');
		} 
	});

	// 调用手机验证
	$('#phone').blur(function(){
		var _this = $(this);
		var telStr = _this.val();
		// alert(checkMobile(telStr));
		if (checkMobile(telStr) === true) {
			console.log('tel is true!');
		}else{
			_this.parent().next().css('display','block');
			$('#lay-submit').attr('disabled','disabled');
		}
	});
	$('#phone').on('input',function(){
		var _this = $(this);
		var telStr = _this.val();
		// alert(checkMobile(telStr));
		if(telStr !== ''){
			_this.parent().next().css('display','none');
		}
	});

	// 调用身份证验证
	$('#card').blur(function(){
		var _this = $(this);
		var cardStr = _this.val();
		// alert(checkCard(cardStr));
		if (checkCard(cardStr) === true) {
			console.log('card is true!');
		}else{
			_this.parent().next().css('display','block');
			$('#lay-submit').attr('disabled','disabled');
		}
	});
	$('#card').on('input',function(){
		var _this = $(this);
		var cardStr = _this.val();
		// alert(checkMobile(telStr));
		if(cardStr !== ''){
			_this.parent().next().css('display','none');
		}
	});

	// 投诉类型判断 ——> 选择涉案账号的正则判断
	$('#tsSAZH').blur(function(){
		var _this = $(this);
		var lxVal = $('#zhlx').val();
		var accountStr = _this.val();

		if (lxVal === '0') {
			_this.parent().next().css('display','none');
		}else if(lxVal === '1'){
			_this.parent().next().css('display','none');
		}else{
			_this.parent().next().css('display','block');
			$('#lay-submit').attr('disabled','disabled');
		}
	});

	// 涉案账号验证
	// 失去焦点触发事件
	$('#tsSAZH').blur(function(){
		var _this = $(this);
		var sazhStr = _this.val();
		// 投诉类型内容
		var lxVal = $('#zhlx').val();
		if (sazhStr === '') {
			_this.parent().next().css('display','block');
		}else if (lxVal === '0') {
			// 手机号验证
			if (checkMobile(sazhStr) === true) {
				console.log('tel is true!');
			}else{
				_this.parent().next().css('display','block');
			}
		}else if(lxVal === '1'){
			// 身份证验证
			if (checkCard(sazhStr) === true) {
				console.log('card is true!');
			}else{
				_this.parent().next().css('display','block');
			}
		} 

		// 涉案账号失去焦点 发起ajax请求 传递涉案账号给后台
		$.ajax({
			type:'POST',
			url:"",
			data:{"lxVal":lxVal,"sazhStr":sazhStr},
			success:function(data){

			}
		});
	});

	$('#tsSAZH').on('input',function(){
 		var _this = $(this);
		var sazhStr = _this.val();
		if (sazhStr !== '') {
			_this.parent().next().css('display','none');
		} 
	});

	// 账户卡主验证
	$('#cardName').blur(function(){
		var _this = $(this);
		var cardNameStr = _this.val();
		if (cardNameStr === '') {
			_this.parent().next().css('display','block');
		} 
	});
	$('#cardName').on('input',function(){
 		var _this = $(this);
		var cardNameStr = _this.val();
		if (cardNameStr !== '') {
			_this.parent().next().css('display','none');
		} 
	});

	// 案件分局验证
	$('#subPolice').blur(function(){
		var _this = $(this);
		var subPoliceStr = _this.val();
		if (subPoliceStr === '') {
			_this.parent().next().css('display','block');
		} 
	});
	$('#subPolice').on('input',function(){
 		var _this = $(this);
		var subPoliceStr = _this.val();
		if (subPoliceStr !== '') {
			_this.parent().next().css('display','none');
		} 
	});

	// 投诉内容验证
	$('#comContext').blur(function(){
		var _this = $(this);
		var comContextStr = _this.val();
		if (comContextStr === '') {
			_this.parent().next().css('display','block');
		} 
	});
	$('#comContext').on('input',function(){
 		var _this = $(this);
		var comContextStr = _this.val();
		if (comContextStr !== '') {
			_this.parent().next().css('display','none');
		} 
	});

	// ajax请求上传
	$('#lay-submit').click(function(){
		var name = $('#name').val();
		var card = $('#card').val();
		var phone = $('#phone').val();
		var zhlx = $('#zhlx').val();
		var PHONENUM = $('#tscardName').val();
		var BANKNUM = $('#tsSAZH').val();
		var cardLocation = $('#cardLocation').val();
		var cardName = $('#cardName').val();
		var subPolice = $('#subPolice').val();
		var comContext = $('#comContext').val();
		// 如果表单内容 存在空 则禁止提交
		var data = '"name":"'+name+'","card":"'+card+'","phone":"'+phone+'","zhlx":"'+zhlx+'","PHONENUM":"'+PHONENUM+'","BANKNUM":"'+BANKNUM+'","cardLocation":"'+cardLocation+'","cardName":"'+cardName+'","subPolice":"'+subPolice+'","comContext":"'+comContext+'"';
			// console.log(data);
			$.ajax({
				type: 'POST',
				url: '',
				data: data,
				success:function(data){
				    // 提交成功后 清空表单
				    $('#cancelBtn').click();
				}
			});
	});

		
	