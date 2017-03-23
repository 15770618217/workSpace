<?php
header("Content-Type:application/json;charset=UTF-8");

$output = [];

$link = mysqli_connect('localhost','root','','upload');

$sql = "SET NAMES UTF8";
mysqli_query($link,$sql);

$sql = "SELECT * FROM pic";
$result = mysqli_query($link,$sql);

while (true) {
	$row = mysqli_fetch_assoc($result);
	// 获取一行数据 循环
	if (!$row) {
		break;
	}
	$output[] = $row;
}
echo json_encode($output);
