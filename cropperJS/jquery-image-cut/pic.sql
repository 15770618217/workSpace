#设置后面的SQL语句所用的字符编码
SET NAMES UTF8;
#删除数据库
DROP DATABASE IF EXISTS upload;
#重新创建数据库
CREATE DATABASE upload CHARSET=UTF8;
#进入数据库
USE upload;

#创建用户表
CREATE TABLE pic(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  pic VARCHAR(99999),
  name VARCHAR(128)
);
#查询出所有记录
SELECT  *  FROM pic;


