# JavaScript_BOM_学习笔记

BOM是浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是window。

window对象是浏览器的顶级对象，它是JS访问浏览器窗口的一个接口；它也是一个全局对象，定义在全局作用域中的变量和函数都会变成window对象的属性和方法。



### Location

- location.href-- 返回或设置当前文档的URL
- location.search -- 返回URL中的查询字符串部分。例如 http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu 返回包括(?)后面的内容?id=5&name=dreamdu
- location.hash -- 返回URL#后面的内容，如果没有#，返回空
- location.host -- 返回URL中的域名部分，例如[www.dreamdu.com](http://www.dreamdu.com/)
- location.hostname -- 返回URL中的主域名部分，例如dreamdu.com
- location.pathname -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/
- location.port -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080
- location.protocol -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:
- location.assign -- 设置当前文档的URL
- location.replace() -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url)
- location.reload() -- 重载当前页面



### history对象

- history.go() -- 前进或后退指定的页面数 history.go(num)
- history.back() -- 后退一页
- history.forward() -- 前进一页



### Navigator对象

- navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
- navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie
