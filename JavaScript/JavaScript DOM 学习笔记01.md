# JavaScript DOM 学习笔记01

DOM（Document Object Model）是W3C推荐的用于处理 HTML / XML 的标准编程接口。通过已经定义好的一系列 DOM 接口，可以实现对网页内容、样式和结构的改变。



## HTML DOM 树

![ct_htmltree](F:\前端学习笔记\ct_htmltree.gif)

- 文档：一个页面就是一个文档，DOM 中使用 document 表示
- 元素：页面中所有标签都是元素，DOM 中使用 element 表示
- 节点：网页中的所有内容都是节点（标签、属性、文本、注释等），DOM 中用 node 表示

在 DOM 中，可以把上述内容都看作是对象。



## 获取对象

- 根据 ID 获取

  ```js
  // 语法
  var element = document.getElementById('id');
  // 返回一个匹配到 ID 的 DOM Element 对象；若在当前 Document 中没找到，则返回 null
  ```

- 根据标签名获取

  ```js
  // 语法
  var element = document.getElementByTagName('name');
  // 返回带有指定标签名的对象的集合。返回元素的顺序是它们在文档中的顺序。
  // 如果把特殊字符串 "*" 传递给 getElementsByTagName() 方法，它将返回文档中所有元素的列表。
  
  // 也可以获取某个父元素内部所有指定标签名的子元素
  var ol = document.getElementByTagName('ol');
  var li = ol[0].getElementByTagName('li'); // 父元素必须为指定的单个元素
  ```

- 通过 HTML5 新增的方法获取

  ```js
  // H5之前对类元素的选择方法
  var element = document.getElementByClassName('name'); 
  // 根据类名返回元素对象集合
  
  // H5新增的方法
  // 根据选择器返回第一个元素对象
  var element = document.querySelector('选择器');
  
  // 返回指定选择器的所有元素对象集合
  var element = document.querySelectorAll('选择器');
  ```

- 特殊元素获取

  ```js
  // 获取body元素
  var bodyEle = document.body;
  
  // 获取html元素
  var htmlEle = document.documentElement;
  ```

  

## 事件要素

- 事件源--事件被触发的对象
- 事件类型--如何触发事件
- 事件处理程序--通过函数赋值来完成

```js
// 以点击按钮弹出对话框为例
var btn = document.getElementById('btn');
btn.onclick = function() {
    alert('事件处理完成');
}
```



## 事件执行过程

1. 获取事件源
2. 注册事件
3. 添加事件处理程序



## 操作元素

### 修改元素内容

- element.innerText

  修改从起始位置到终止位置的内容，去除了HTML标签、空格和换行

  ```js
  // 修改时间的例子
  <button>显示当前时间</button>
  <div>时间</div>
  <p>时间</p>
  <script>
      var btn = document.querySelector('button');
  	var div = document.querySelector('div');
  	btn.onclick = function() {           // 通过点击按钮实现修改
          div.innerText = '2021.11.25';
      }
  	
  	var p = document.querySelector('p');
  	p.innerText = '2021.11.25';          // 不需要点击按钮，刷新后即可修改
  </script>
  ```

- element.innerHTML

  
