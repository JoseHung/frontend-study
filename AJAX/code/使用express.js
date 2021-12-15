// 引入express
const { request, response } = require('express');
const express = require('express');

// 创建应用对象
const app = express();

// 创建路由规则
app.get('/', (request, response) => {  // request是对请求报文的封装 response是对响应报文的封装
    // 设置响应
    response.send('Hello, Express');
});

// 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启用，8000 端口监听中...");
});