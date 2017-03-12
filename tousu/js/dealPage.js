var html = '';
	// 添加附件
	$('#addFJ').click(function(){
		html = '<span class="otherSpan dealSpan"><i class="layui-icon">&#xe64c;</i> 添加的附件 <i class="layui-icon deleteBtn">&#xe640;</i></span>';
		$(this).parent().append(html);
	}); 

	// 添加文书
	$('#addWS').click(function(){
		html = '<span id="addWS" class="otherSpan dealSpan"><i class="layui-icon">&#xe60a;</i> 添加的文书 <i class="layui-icon deleteBtn">&#xe640;</i></span>';
		$(this).parent().append(html);
	});
	// 添加笔录
	$('#addBL').click(function(){
		html = '<span id="addWS" class="otherSpan dealSpan"><i class="layui-icon">&#xe60a;</i> 添加的笔录 <i class="layui-icon deleteBtn">&#xe640;</i></span>';
		$(this).parent().append(html);
	});
	// 删除
	$('.layui-input-block').on('click','.otherSpan .deleteBtn',function(){
		$(this).parent().css('display','none');
	});