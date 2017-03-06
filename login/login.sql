#设置后面的SQL语句所用的字符编码
SET NAMES UTF8;
#删除数据库
DROP DATABASE IF EXISTS login;
#重新创建数据库
CREATE DATABASE login CHARSET=UTF8;
#进入数据库
USE login;

#创建用户表
CREATE TABLE loginer(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(32),
	password VARCHAR(32)
);
#插入三行记录
INSERT INTO loginer VALUES(NULL,'tom','123');
INSERT INTO loginer VALUES(NULL,'mary','456');
INSERT INTO loginer VALUES(NULL,'king','789');
INSERT INTO loginer VALUES(NULL,'allen30','30');
