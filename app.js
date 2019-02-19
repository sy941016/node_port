const express = require('express');
const mysql = require('mysql');
const app = express();

app.all('*', function (req, res, next) {             //设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//创建一个connection
const connection = mysql.createConnection({
    host: 'localhost', //数据库地址
    user: 'root', //账号
    password: 'sy941016.', //密码
    database: 'guoying', //库名
    multipleStatements: true //允许执行多条语句
});

connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});
//执行SQL语句
//查
connection.query('SELECT id,title FROM v9_article WHERE id BETWEEN 20 AND 60', function(err, rows, fields) {
    if (err) {
        console.log('[query] - :'+err);
        return;
    }
    console.log('调取的数据: ', rows);
    app.get('/api', function (req, res) {//配置接口api
        res.status(200);
        res.json(rows)
    })
});
//增
var  addSql = 'INSERT INTO v9_article(id,title,typeid,description,username) VALUES(2,"周杰伦",0,"周杰伦演唱会最后一站","editor111")';
connection.query(addSql,function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }
    console.log('成功插入数据');
});
//删
var delSql = 'DELETE FROM v9_article where id=2';
connection.query(delSql,function (err, result) {
    if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
    }
    console.log('删除成功');
});
//关闭connection
connection.end(function(err){
    if(err){
        return;
    }
    console.log('[connection end] succeed!');
});

//配置服务端口
var server = app.listen(3002,'localhost',function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listen at http://:%s', host, port)
});