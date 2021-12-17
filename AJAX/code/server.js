// 引入express
const { request, response } = require('express');
const express = require('express');

// 创建应用对象
const app = express();

// 创建路由规则
app.get('/server', (request, response) => {  // request是对请求报文的封装 response是对响应报文的封装
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    response.send('Hello, AJAX');
});

// 创建post响应
app.post('/server', (request, response) => {  // request是对请求报文的封装 response是对响应报文的封装
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    response.send('Hello, AJAX POST');
});

// 可以接受任意类型的请求
app.all('/json-server', (request, response) => {  // request是对请求报文的封装 response是对响应报文的封装
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    // 响应一个数据
    const data = {
        name: 'Kobe'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置响应
    response.send(str);
});

// 创建延时规则
app.get('/delay', (request, response) => {  // request是对请求报文的封装 response是对响应报文的封装
    // 设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    setTimeout(() => {
        response.send('延时响应');
    }, 3000);
    
});

// 监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启用，8000 端口监听中...");
});