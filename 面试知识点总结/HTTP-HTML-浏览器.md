# HTTP/HTML/浏览器



## 1. 说一下http和https

1. http和https的基本概念

   http: 超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

   https: 是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，因此加密的详细内容就需要SSL。https协议的主要作用是建立一个信息安全通道，来确保数组的传输，确保网站的真实性。

2. http和https的区别

   http协议传输的数据内容是未加密的，https协议是由http和ssl协议构建的可进行加密传输和身份认证的网络协议，https协议要比http协议的安全性更高。

   主要有如下的区别：

   - https协议需要ca证书，费用高。
   - http是超文本传输协议，信息是明文传输；https则是具有安全性的ssl加密传输协议。
   - 连接方式不同，http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议。
   - 端口不同，一般而言，http协议的端口为80，https的端口为443。

3. 关于https

   - https工作原理
     1. 客户使用https url访问服务器，则要求web服务器建立ssl链接。
     2. web服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回或者说传输给客户端。
     3. 客户端和web服务器端开始协商SSL链接的安全等级，也就是加密等级。
     4. 客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。
     5. web服务器通过自己的私钥解密出会话密钥。
     6. web服务器通过会话密钥加密与客户端之间的通信。
   - https优点
     1. 使用HTTPS协议可认证用户和服务器，确保数据发送到正确的客户机和服务器。
     2. HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全，可防止数据在传输过程中不被窃取、改变，确保数据的完整性。
     3. HTTPS是现行架构下最安全的解决方案，虽然不是绝对安全，但它大幅增加了中间人攻击的成本。
     4. 谷歌曾在2014年8月份调整搜索引擎算法，并称“比起同等HTTP网站，采用HTTPS加密的网站在搜索结果中的排名将会更高”。
   - https缺点
     1. https握手阶段比较费时，会使页面加载时间延长50%，增加10%~20%的耗电。
     2. https缓存不如http高效，会增加数据开销。
     3. SSL证书也需要钱，功能越强大的证书费用越高。
     4. SSL证书需要绑定IP，不能再同一个ip上绑定多个域名，ipv4资源支持不了这种消耗。



## 2. tcp三次握手

简单来说就是客户端和服务端都需要确认各自可收发，因此需要三次握手。

![](image/tcp三次握手.png)



## 3. tcp和udp

1. tcp是面向连接的，udp是无连接的。
2. tcp提供可靠的服务，udp无法保证可靠的数据传输服务。
3. tcp面向字节流，udp面向报文。
4. tcp只能是一对一，udp支持一对一、一对多。
5. tcp的首部为20字节，udp为8字节。



## 4. WebSocket

WebSocket是HTML5中的协议，支持持久连接。

HTTP的生命周期通过Request来界定，也就是Request一个Response，那么在Http1.0协议中，这次Http请求就结束了。在Http1.1中进行了改进，增加了connection：Keep-alive，也就是说，在一个Http连接中，可以发送多个Request，接收多个Response。但是无论如何，在Http中一个Request只能对应有一个Response，而且这个Response是被动的，不能主动发起。

WebSocket是基于Http协议的，或者说借用了Http协议来完成一部分握手，在握手阶段与Http是相同的。WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。



## 5. HTTP请求的方式，HEAD方式

HEAD方法与GET方法一样，都是向服务器发出指定资源的请求。但是，服务器在响应HEAD请求时不会回传资源的内容部分，即：响应主体。这样，我们可以不传输全部内容的情况下，就可以获取服务器的响应头信息。HEAD方法常被用于客户端查看服务器的性能。

OPTIONS请求与HEAD类似，一般也是用于客户端查看服务器的性能。 这个方法会请求服务器返回该资源所支持的所有HTTP请求方法，该方法会用'*'来代替资源名称，向服务器发送OPTIONS请求，可以测试服务器功能是否正常。



## 6. web Quality（无障碍）

使用alt属性：

```html
<img src="person.jpg"  alt="this is a person"/>
```

有时候浏览器会无法显示图像。如果使用了alt 属性，那么浏览器至少可以显示或读出有关图像的描述。



## 7. 几个很实用的BOM属性对象方法

1. location对象
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
2. history对象
   - history.go() -- 前进或后退指定的页面数 history.go(num)
   - history.back() -- 后退一页
   - history.forward() -- 前进一页
3. Navigator对象
   - navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
   - navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie



## 8. 说一下HTML5 drag api

- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放元素在某元素内移动时触发。
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。