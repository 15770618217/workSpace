// layui.use('form', function(){
	//   var form = layui.form();
	  
	//   //监听提交
	//   form.on('submit(formTs)', function(data){
	//   	var upData = JSON.stringify(data.field);
	//     console.log(upData);
	//     return false;
	//   });
	// });

	/**
	*用途：检查输入的手机号是否正确
	*输入：
	*str: 字符串
	*返回：如果通过验证返回true,否则返回false
	 */
	function checkMobile(str){
		var reg = /^[1][3][0-9]{9}$/;
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
		}
	});

	// 涉案账号验证
	$('#tsSAZH').blur(function(){
		var _this = $(this);
		var sazhStr = _this.val();
		if (sazhStr === '') {
			_this.parent().next().css('display','block');
		} 
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
		var data = '"name":"'+name+'","card":"'+card+'","phone":"'+phone+'","zhlx":"'+zhlx+'","PHONENUM":"'+PHONENUM+'","BANKNUM":"'+BANKNUM+'","cardLocation":"'+cardLocation+'","cardName":"'+cardName+'","subPolice":"'+subPolice+'","comContext":"'+comContext+'"';
		console.log(data);
		// $.ajax({
		//     type: 'POST',
		//     url: '',
		//     data: data,
		//     success:function(data){

		//     }
		// });
	});
		
	