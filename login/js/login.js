// 输入框
var input = $('.login-box>form>ul>li>input');
var login = {
	init:function(){
		this.inputEvent();
		this.submitEvent();
	},

	//1、输入框事件
	inputEvent:function(){
		//输入框获得焦点后 出现x号
		input.focus(function(){
			$(this).siblings('.cleanBtn').css('display','block');
		});
		$('.login-box>form .cleanBtn').click(function() {
			$(this).siblings('input').val('');
		});
		//输入框失去焦点后 x号隐藏 出现判断提示语
		//单击x号 清楚输入框中的内容
		input.blur(function(){
			var _this = $(this);
			setTimeout(function(){
				_this.siblings('.cleanBtn').css('display','none');
				if(_this.val()===''){
				// 提示文字
					_this.siblings('span:last').css('display','block');
				}
			},200);
		});
		// 撤销提示语
		input.on('input',function(){
			if ($(this).val()!='') {
				$(this).siblings('span:last').css('display','none');
			}
		});
	},
	// 2、提交按钮的事件
	submitEvent: function(){
		$('.login-box .btn').click(function(){
			// 遍历input
			for(var i=0; i<input.length; i++){
				if ($(input[i]).val() === '') {
					$(input[i]).siblings('span').css('display','block');
				}
			}
			// console.log($('#login_form').serialize());
			var formData = $('#login_form').serialize();
			console.log(formData);

			// 拿到数据 发起ajax请求
			$.ajax({
				type:'POST',
				url:'data/login.php',
				data:formData,
				success:function(data){
					if (data === 'cunzai') {
						alert('登录成功，等待跳转');
					} else {
						alert('您输入的帐号或者密码不正确，请重新输入。');
					}
				}
			});
		});
	}
};
login.init();

