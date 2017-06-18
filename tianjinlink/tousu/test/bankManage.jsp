<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>银行账号信息查询</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="static/chatSystem/lib/layui/css/layui.css">
    <link rel="stylesheet" href="static/billinfo/css/bankManage.css">
	<script type="text/javascript">
		var basePath = '<%=basePath%>';	
	</script>
  </head>
  
  <body>
<div class="hui"></div>
<section class="content">
    <span>银行账号信息查询</span>
    <form id="searchForm" class="layui-form layui-form-item">
        <div class="searchFormTop">
            <label class="layui-form-label" for="AJBH">案件编号</label>
            <div class="layui-input-inline">
                <input type="text" id="AJBH" name="AJBH" autocomplete="off" class="layui-input">
            </div>
            <label class="layui-form-label" for="SAZH">涉案账户</label>
            <div class="layui-input-inline">
                <input type="text" id="SAZH" name="SAZH" autocomplete="off" class="layui-input">
            </div>
            <label class="layui-form-label">汇款金额</label>
            <div class="layui-input-inline">
                <select id="HKJE" class="layui-input" name="HKJE" lay-filter="aihao">
                    <option value="0" selected>0-2000</option>
                    <option value="1">2000-10000</option>
                    <option value="2">10000以上</option>
                </select>
            </div>
        </div>
        <div class="searchFormMiddle">
            <label class="layui-form-label">发生时间</label>
            <div class="startTimeBox">
                <div class="layui-input-inline">
                    <input id="startTime" type="text" name="date" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})">
                    <label for="startTime" class="layui-edge"></label>
                </div>
                <div class="layui-form-mid">-</div>
                <div class="layui-input-inline">
                    <input id="endTime" type="text" name="date" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})">
                    <label for="endTime" class="layui-edge"></label>
                </div>
            </div>
            <label class="layui-form-label">转账方式</label>
            <div class="layui-input-inline ZZFS-box">
                <select id="ZZFS" class="layui-input" name="interest" lay-filter="aihao">
                    <option value="" selected></option>
                    <option value="0">ATM</option>
                    <option value="1">手机</option>
                </select>
            </div>
            <label class="layui-form-label">账号状态</label>
            <div class="layui-input-inline ZHZT-box">
                <select id="ZHZT" class="layui-input" name="interest" lay-filter="aihao">
                    <option value="" selected></option>
                    <option value="0">所有</option>
                    <option value="1">止付</option>
                    <option value="2">监控</option>
                    <option value="3">查询</option>
                </select>
            </div>
        </div>
        <input type="button" id="search" class="layui-btn" value="查询"/>
    </form>

    <!--案件列表-->
    <p id="zhiFuList">
        <span style="line-height:38px;">案件列表</span>
        <button id="zdybt" class="layui-btn right">自定义表头</button>
    </p>
    <div id="parent">
        <table id="table" class="layui-table">
            <thead>
            <tr>
                <th>序号</th><!--  style="min-width: 32px;" -->
                <th>案件编号</th>
                <th>账户姓名</th>
                <th>涉案账户</th>
                <th>所属机构</th><!-- style="min-width:65px" -->
                <th>所属地</th><!--  style="min-width:94px" -->
                <th>汇款金额</th><!--  style="min-width:75px" -->
                <th>汇款时间</th><!--  style="min-width: 112px;" -->
                <th>手续编号</th>
                <th>止付金额</th><!--  style="min-width:65px" -->
                <th>状态</th>
                <th>操作</th><!--  style="min-width: 183px;" -->
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
         <div id="pageParent">
                <div id="page1" style="text-align:center"></div>
                <div id="sort"></div>
 		</div>
    </div>
    
<!-- 打印详情 -->
<div class="stopPayBox box" style="display:none;">
    <div class="printTop boxTop">
        <span>打印详情</span>
        <i class="layui-icon cancel">&#x1006;</i>
    </div>
    <!-- <iframe scrolling="auto" allowtransparency="true" id="layui-layer-iframe2" id="stopPayIframe" name="layui-layer-iframe2" onload="this.className='';" class="" frameborder="0" src="http://localhost:8080/telsys/href/action?_NEXTPAGE=billinfo/stopPayPrint" style="height: 444px;"></iframe> -->
    <div class="prinFooter"></div>
</div>
  
 <!-- 自定义表头标签 -->
<div class="autoList box" style="display:none;width: 500px;height: 400px;background: #fff;">
    <div class="boxTop">
        <span>自定义表头标签</span>
        <i class="layui-icon cancel">&#x1006;</i>
    </div>
    <ul id="delEl" class="addListHeader" style="">
         <li><span name='AJBH'>案件编号</span><i class="layui-icon">&#xe640;</i></li>
         <li><span name='ZHXM'>账户姓名</span><i class="layui-icon">&#xe640;</i></li>
         <li><span name='SAZH'>涉案账户</span><i class="layui-icon">&#xe640;</i></li>
         <li><span name='SSJG'>所属机构</span><i class="layui-icon">&#xe640;</i></li>
         <li><span name='SSD'>所属地</span><i class="layui-icon">&#xe640;</i></li>
         <li><span name='HKJE'>汇款金额</span><i class="layui-icon">&#xe640;</i></li>
     </ul>
     <hr/>
     <ul id="addEl" class="addListHeader" style="overflow:hidden;">
         <li><span name='HKSJ'>汇款时间</span><i class="layui-icon">&#xe608;</i></li>
         <li><span name='SXBH'>手续编号</span><i class="layui-icon">&#xe608;</i></li>
         <li><span name='ZFJE'>止付金额</span><i class="layui-icon">&#xe608;</i></li>
         <li><span name='STATE'>账号状态</span><i class="layui-icon">&#xe608;</i></li>
     </ul>
     <div style="width:180px;margin:0 auto;">
     	<button id="autoListConfirm"  class="layui-btn left">提交</button>
     	<button class="layui-btn no right">取消</button>
     </div>
</div>  

<!-- 查看与添加下级账户 -->
<div class="lookAndAdd box" style="display:none;width:70%;left:15%;">
    <div class="boxTop">
        <span>添加下级账户</span>
        <i class="layui-icon cancel">&#x1006;</i>
    </div>
    <div class="boxContent">
    	<table id="table1" class="layui-table">
            <thead>
            <tr>
                <th>所属分类</th>
                <th>账号</th>
                <th>所属机构</th>
                <th>账号姓名</th>
                <th>转账金额</th>
                <th>转账时间</th>
                <th>转账方式</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    
</div>

<!-- 修改按钮跳转 -->
<div id="change" class="box" style="display: none;min-width:665px;"> 
	    <div class="changeTop boxTop">
	        <span>修改案件</span>
	        <i class="layui-icon cancel">&#x1006;</i>
	    </div>
        <form id="changeForm" class="layui-form layui-form-item">
        	<div>
	        	<label class="layui-form-label">账户姓名</label>
	            <div class="layui-input-inline">
	                <input type="text" name="ZHXM" autocomplete="off" class="layui-input" disabled="true">
	            </div>
        	</div>	
        	<div>
	        	<label class="layui-form-label">案件编号</label>
	            <div class="layui-input-inline">
	                <input type="text" name="AJBH" autocomplete="off" class="layui-input" disabled="true">
	            </div>
        	</div>	
        	<div>
	        	<label class="layui-form-label">涉案账户</label>
	            <div class="layui-input-inline">
	                <input type="text" name="SAZH" autocomplete="off" class="layui-input" disabled="true">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">所属机构</label>
	            <div class="layui-input-inline">
	                <input type="text" name="SSJG" autocomplete="off" class="layui-input" disabled="true">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">所&nbsp;&nbsp;属&nbsp;&nbsp;地</label>
	            <div class="layui-input-inline">
	                <input type="text" name="SSD" autocomplete="off" class="layui-input" disabled="true">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">汇款金额</label>
	            <div class="layui-input-inline">
	                <input type="text" name="HKJE" autocomplete="off" class="layui-input">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">汇款时间</label>
	            <div class="layui-input-inline">
	                <input type="text" name="HKSJ" autocomplete="off" class="layui-input">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">手续编号</label>
	            <div class="layui-input-inline">
	                <input type="text" name="SXBH" autocomplete="off" class="layui-input" disabled="true">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">止付金额</label>
	            <div class="layui-input-inline">
	                <input type="text" name="ZFJE" autocomplete="off" class="layui-input">
	            </div>
        	</div>
            <div>
	        	<label class="layui-form-label">账号状态</label>
	            <div class="layui-input-inline">
	                <input type="text" name="STATE_MC" data-name="STATE" autocomplete="off" data-num="" class="layui-input">
	            </div>
        	</div>
            
        </form>
        <div style="width:25%;margin:0 auto;">
        	<button id="confirm" class="layui-btn left">提交</button>
        	<button class="layui-btn no right">取消</button>
        </div>
    </div>
</section>
<script src="static/chatSystem/lib/jquery-2.1.0.js"></script>
<script src="static/chatSystem/lib/layui/lay/dest/layui.all.js"></script>
<script src="static/billinfo/js/bankManage.js"></script>
<script src="static/js/laypage-v1.2/laypage/laypage.js"></script>
<script type="text/javascript">
	 
</script>
</body>
</html>
