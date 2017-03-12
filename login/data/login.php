<?php
// 接收客户端输入的用户名和密码，验证是否正确，向客户端输出cunzai或者bucunzai
header("Content-Type:text/plain;charset=UTF-8");
// 接收数据 userName和password
$userName = $_REQUEST['userName'];
$password = $_REQUEST['password'];

// 连接数据库
$link = mysqli_connect('localhost','root','','login');

// 设置字符集
$sql = "SET NAMES UTF-8";
mysqli_query($link,$sql);

// 验证数据库中的信息
$sql = "SELECT * FROM loginer WHERE userName='$userName' AND password='$password'";
$result = mysqli_query($link,$sql);

if ($result === false) {
	echo 'SQLerr';
}

$row = mysqli_fetch_assoc($result);

if($row){
	echo 'cunzai';
}else{
	echo 'bucunzai';
}
