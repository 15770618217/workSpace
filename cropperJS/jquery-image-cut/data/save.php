<?php
header("Content-Type:text/plain;charset=UTF-8");
$base64 = $_REQUEST['Base64'];
$picName = $_REQUEST['picName'];

// 连接数据库
$link = mysqli_connect('localhost','root','','upload');

$sql = "SET NAMES UTF-8";
mysqli_query($link,$sql);

//SQL1
$sql = "INSERT INTO pic VALUES(NULL,'$base64','$picName')";
$result = mysqli_query($link,$sql);

if ($result) {
 	echo "上传成功";
 } else {
 	echo "上传失败";
 }
?>