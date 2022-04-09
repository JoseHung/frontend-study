# JavaScript DOM 学习笔记 01

DOM（Document Object Model）是W3C推荐的用于处理 HTML / XML 的标准编程接口。通过已经定义好的一系列 DOM 接口，可以实现对网页内容、样式和结构的改变。



## HTML DOM 树

![](image/ct_htmltree.gif)

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



## 修改元素

### 修改元素内容

- element.innerText

  修改从起始位置到终止位置的内容，不识别标签、空格和换行，可读写

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

- element.innerHTML( W3C 推荐使用)

  同样可以修改内容，可以识别标签、空格和换行，可读写



### 修改元素属性

和对元素内容修改类似，可以根据事件执行的过程顺序对元素的相关属性进行修改，包括src、href、id、alt、title等

#### 获取元素属性值

1. element.属性;

   用于获取内置的属性值，即元素本身自带的属性

2. element.getAttribute('属性');

   用于获取自定义的属性

#### 设置元素属性值

1. element.属性 = '值';

   用于设置内置属性

2. element.setAttribute('属性', '值');

   主要用于设置自定义属性

#### 移除元素属性值

element.removeAttribute('属性');



### 修改表单元素属性

利用DOM可以对表单元素的属性进行修改，如type、value、checked、selected、disabled等

```js
<button>按钮</button>
<input type="text" value="输入内容">
<script>
    // 获取元素
	var btn = document.querySelector('button');
	var input = document.querySelector('input');
	btn.onclick = function() {
        // 通过 innerText 和 innerHTML 无法修改表单里面的值
        input.value = '被点击了';
        // 点击按钮后就禁用该按钮
        btn.disabled = true;
    }
</script>
```



### 修改样式属性

可以通过JS修改元素的大小、颜色、位置等样式

- element.style  行内样式操作

  ```js
  <div></div>
  <script>
      var div = document.querySelector('div');
  	div.onclick = function() {
          this.style.backgroundColor = 'black';
          this.style.width = 180px;
      }
  </script>
  
  // JS 修改 style 样式后，产生的是行内样式，在 CSS 中的优先级较高
  // 样式少 功能简单时使用
  
  ```

- element.className  类名样式操作

  对于修改的样式较大或者功能较复杂时，修改元素的className可以将元素直接修改为写好的样式。className会覆盖原先的类名，如果要保留原先的类名，则在使用className修改时加上原先的类名。



### 排他思想

如果有同一组元素，想让其中一个元素实现样式的更改，则需要用到循环的排他思想：

1. 将这一组所有元素的样式清除
2. 给需要更改的当前元素设置样式
3. 顺序不能更改



### H5自定义属性

H5规定自定义属性名称以data-开头

```html
<div data-index="1"></div>
```

```js
element.setAttribute('data-index','1');
```



#### 获取H5自定义属性

1. 兼容性获取  

   ```js
   element.getAttribute('data-index');
   ```

2. H5新增方法

   ```js
   element.dataset.index; // 不需要再加上data-
   element.dataset['index']; 
   ```



## 节点

利用DOM提供的方法获取元素的操作逻辑性不强，较为繁琐；可以利用父子兄节点层级关系获取元素，这种方法具有较强的逻辑性但兼容性较差。

网页中的所有内容都是节点（标签、属性、文本、注释等），一般来说，节点具有三个基本属性。

- nodeType  
  - 元素节点为1
  - 属性节点为2
  - 文本节点为3
- nodeName
- nodeValue

实际开发中节点操作主要是针对的是元素节点



#### 父节点

node.parentNode 可以返回某节点的最近父节点，如果没有父节点则返回null



#### 子节点

- parentNode.childNodes 

  会得到某个节点的所有子节点，包括元素节点、属性节点和文本节点，一般不提倡使用

- parentNode.children

  可以返回所有的子元素节点，虽然是非标准，但是得到了各个浏览器的支持，可以使用

- parentNode.firstChild 

  返回第一个子节点，包括所有类型

- parentNode.lastChild

  返回最后一个子节点，包括所有类型

- parentNode.firstElementChild

  返回第一个子元素节点（兼容性问题，IE9以上支持）

- parentNode.lastElementChild

  返回最后一个子元素节点（兼容性问题，IE9以上支持）

- parentNode.children[i]

  实际开发中的写法，没有兼容性的问题



#### 兄弟节点

- node.nextSibling

  返回下一个兄弟节点，包括所有类型

- node.previousSibling

  返回上一个兄弟节点，包括所有类型

- node.nextElementSibling

  返回下一个兄弟元素节点（兼容性问题，IE9以上支持）

- node.previousElementSibling

  返回上一个兄弟元素节点（兼容性问题，IE9以上支持）

- 通过封装一个判断元素类型的函数可以解决兼容性问题



#### 创建和添加节点

创建节点

document.creatElement('tagName')  

该方法动态地创建由tagName指定的HTML元素节点



添加节点

- node.appendChild(child)

  该方法将一个节点添加到node父节点的子节点列表末尾

- node.insertBefore(child, 指定元素)

  该方法将一个节点添加到node父节点的指定子节点之前



#### 删除节点

node.removeChild(child)

删除node父元素的child子节点，并返回删除的子节点



#### 复制节点

node.cloneNode()

该方法能返回node节点的一个副本节点

- 参数为空或者false，则是浅拷贝，只复制节点本身，不复制其子节点
- 参数为true，则是深拷贝，复制节点本身及其子节点



#### 三种动态创建元素方法的区别

- document.write()

  该方法直接将内容写入页面的内容流，当文档流执行完毕时，会导致页面全部重绘，不建议使用

- element.innerHTML

  该方法是将内容写入DOM节点中，在创建多个元素时采取拼接字符串的形式会导致效率很低，可以通过数组形式的拼接来提高效率，结构会略显复杂

- document.createElement()

  在创建多个元素时的效率要低于innerHTML数组形式拼接的方法，但是结构更清晰



## 事件（高级）

### 注册事件

传统注册事件的方式（利用on开头的事件如onclick）具有唯一性，对于同一元素同一事件只可以设置一个处理函数，最后一个注册的处理函数会覆盖前面注册的所有冲突函数。

利用方法监听注册事件是w3c的标准，推荐使用。对于同一事件同一元素可以注册多个监听器。

```js
// addEventListener() 方法的语法规范
eventTarget.addEventListener(type, listener, useCapture);
// type是事件类型字符串，如click、mouseover等
// listener是事件处理函数
// useCapture是一个布尔类型的可选参数。当该值为true时，表示在事件捕获阶段调用事件处理程序；如果是false（默认值），则表示在事件冒泡阶段调用事件处理程序。

btn[1].addEventListener('click', function() {
    alert(111111);
});

// 对于IE9之前版本的浏览器，应该使用attachEvent()方法
```



### 删除事件

1. 传统注册方式

   ```js
   // 可以在事件函数的末尾加入如下代码
   eventTarget.onclick = null;
   ```

2. 方法监听注册方式

   ```js
   // 通过removeEventListener()方法来实现
   eventTarget.removeEventListener(type, listener, useCapture);
   ```

   

### DOM事件流

事件流描述的是从页面中接收事件的顺序。事件发生时会在元素节点之间按照特定的顺序传播，这个过程就是DOM事件流。

DOM事件流的3个阶段：

1. 捕获阶段：事件首先被document元素捕获，然后沿DOM树依次向下传播，直至到达实际的目标元素。
2. 当前目标阶段
3. 冒泡阶段：事件在目标元素中最先被触发，然后沿着DOM树一路向上，在经过的每个节点上依次触发，直至到达document对象。

实际开发中更关注事件的冒泡阶段。有些事件不具有冒泡阶段，如onblue、onfocus、onmouseenter、onmouseleave等



### 事件对象

在DOM中发生事件时，所有相关信息都会被收集并存储在一个名为event的对象中。这个对象包含了一些基本信息，如导致事件的元素、发生的事件类型以及可能与特定事件相关的任何其他数据。

```js
let btn = document.getElementById('myBtn');
btn.onclick = function (event) {
    console.log(event.type);
}
btn.addEventListener('click', (event) => {
    console.log(event.type);
}, false);

// 该event就是事件对象，是一个形参，当我们注册事件时，event对象就会被系统自动创建，并依次传递给事件监听器
```



#### 事件对象常见的属性和方法

1. target和currentTarget

   在事件处理程序内部，this对象始终等于currentTarget的值，指的是当前事件处理程序所在的元素；而target指的是事件的实际目标元素。

2. 返回事件类型

   event.type属性在一个处理程序处理多个事件时很有用

   ```js
   let btn = document.getElementById('myBtn');
   let handler = function(event) {
       switch(event.type) {
           case 'click':
               console.log('Clicked');
               break;
           case 'mouseover':
               event.target.style.backgroundColor = 'red';
               break;
           case 'mouseout':
               event.target.style.backgroundColor = '';
               break;
       }
   };
   btn.onclick = handler;
   btn.onmouseover = handler;
   btn.onmouseout = handler;
   ```

3. 取消默认行为

   preventDefault()方法用于组织特定事件的默认动作。对于任何可以通过该方法取消默认行为的事件，其事件对象的cancelable属性都会设置为true。

   ```js
   // 取消点击链接后默认跳转的行为
   let link = document.getElementById('myLink');
   link.onclick = function(event) {
       event.preventDefault();
   };
   ```

4. 阻止事件冒泡

   stopPropagation()方法可以立即阻止事件流在DOM结构中传播，取消后续的事件捕获或冒泡。

   

### 事件委托

通过对父节点设置事件监听器，然后利用冒泡原理实现对每个子节点的设置。通过该方法可以提高程序的效率。
