# JavaScript基础语法学习笔记03



## 函数

### 声明和调用函数

```js
// 通过函数关键字自定义声明函数（命名函数）
function 函数名(形参1, 形参2, 形参3) {
    // 函数体代码
}
// 通过函数表达式方法来声明函数（匿名函数，变量名不是函数名）
var 变量名 = function(){};

// 调用函数
函数名(实参1, 实参2, 实参3);
```



### 形参与实参的匹配问题

1. 形参与实参的个数相等，正常输出结果

2. 形参个数少于实参，则实参按顺序传递给形参

3. 形参个数多余实参，则多余的实参被定义为undefined（形参可以被看成是一个不需要声明的变量，默认值为undefined）

   ```js
   function getSum(num1, num2) {
       console.log(num1 + num2);
   }
   
   getSum(1,2); // 3
   getSum(1,2,3); // 3
   getSum(1); // NaN (数字型加上一个undefined所得为NaN)
   ```



### return的注意事项

1. return只能返回一个值。如果return后接了多个值，则返回的结果为最后一个值。
2. return具有终止函数运行的作用。函数中return之后的代码都不会被执行。
3. 函数都有返回值。有return时返回return后的值；不含有return则返回undefined。



### arguments

JS中的arguments是当前函数的一个内置对象，其存储了传递的所有实参。

arguments的展示形式是一个伪数组，其具有length属性、能按索引方式储存数据，但不具有push、pop等数组方法。

```js
//arguments的使用
function fn() {
    console.log(arguments.length); // 3
    console.log(arguments[1]); // 2
}
fn(1, 2, 3);
```



## 作用域

作用域的使用能提高程序逻辑的局部性、增强程序可靠性并减少名字冲突。

JS中包含两种作用域类型（es6之前），作用域决定了变量的可访问性。

- 局部作用域与局部变量

​	函数内部声明的变量，会成为函数的局部变量，其作用域是局部的，只能从函数内部访问，从函数外部是不可访问的。

​	局部变量在代码块被执行时会被初始化，代码块运行结束后局部变量也会被销毁，更节省内存空间。

```js
// 此处代码不可使用 age 变量

function fn() {
    var age = 18;
    // 此处代码可以使用 age 变量
}
```

- 全局作用域与全局变量

​	函数之外声明的变量，会成为全局变量，其作用域为全局的，网页中的所有脚本和函数都可以访问。

​	全局变量在声明后直到浏览器关闭时才会被销毁，期间一直占据着内存资源。

```js
var age = 18;
// 此处代码可以使用 age 变量

function fn() {
    // 此处代码也可使用 age 变量
}
```



## 预解析

JS代码是由浏览器中的JS解析器来执行的，分为两步：预解析和代码执行。

预解析又分为

- 变量预解析

​	把所有的变量声明提升到当前作用域的最前面，不提升赋值操作

- 函数预解析

​	把所有函数声明提升到当前作用域的最前面，不调用函数

```js
// 例1 
var num = 10;
fun();
function fun() {
    console.log(num);
    var num = 20;
}

//程序相当于执行了以下代码
var num;
function fun() {
    var num;
    console.log(num); // 结果为undefined
    num = 20;
}
num = 10;
fun();
```

```js
// 例2
f1();
console.log(c);
console.log(b);
console.log(a);
function f1() {
    var a = b = c = 9; // 相当于var a = 9; b = 9; c = 9; b 和 c是直接赋值，没有声明变量，所以可以看作是全局变量。
    console.log(a);
    console.log(b);
    console.log(c);
}

// 等同于以下代码
function f1() {
    var a;
    a = b = c = 9;
    console.log(a); // 9
    console.log(b); // 9
    console.log(c); // 9
}
f1();
console.log(c); // 9
console.log(b); // 9
console.log(a); // 报错，a为局部变量，未被声明
```



## 对象

JS中的对象是一组无序的相关属性和方法的集合



### 创建对象

- 利用字面量创建对象 {}

  ```js
  var obj = {}; // 创建了一个空对象
  var obj = {
      name: 'Kobe',
      age: 17,
      sex: 'male',
      practice: function() {
          console.log('practicing');
      }
  }
  // 对象中的属性和方法采用键值对的形式 属性名（键）: 属性值（值）
  // 调用属性的两种方法：1、对象名.属性名；2、对象名['属性名']
  // 调用方法的方法： 对象名.方法名()
  ```

- 利用 new Object 创建对象

  ```js
  var obj = new Object(); // 创建了一个空对象
  obj.name = 'Kobe';
  obj.age = 17;
  obj.sex = 'male';
  obj.practice = function() {
  	console.log('practicing');
  }
  ```

- 利用构造函数创建对象

  ```js
  // 构造函数的语法
  function 构造函数名() {
      this.属性 = 值；
      this.方法 = function() {}
  }
  new 构造函数名();
  
  // 举例
  function Player(name, age, sex) { // 构造函数名首字母要大写
      this.name = name;
      this.age = age;
      this.sex = sex;
      this.practice = function() {
          console.log('practicing');
      }
  }
  new Player('Kobe', 17, 'male');
  ```

  new关键字的执行过程

  1. new 构造函数在内存中创建了一个空的对象
  2. this 会指向创建的空对象
  3. 执行构造函数中的代码，给空对象添加属性和方法
  4. 返回这个对象



### 遍历对象

for...in 语句用于对数组或者对象的属性进行循环操作

```js
var obj = {
    name: 'Kobe',
    age: 17,
    sex: 'male'
}

for (var k in obj) {
    console.log(k); // 得到各属性名
    console.log(obj[k]); // 得到对象的各属性值（需要注意写法）
}
```



## 内置对象

JS自带的一些对象，提供了一些基本且常用的功能给开发者使用。



### Math对象

Math 对象可以用来执行数学任务。 Math 不是构造函数。 Math 的所有属性/方法都可以通过使用 Math 作为对象来调用，而无需创建它：

```js
var x = Math.PI;            // 返回 PI
var y = Math.sqrt(16);      // 返回 16 的平方更
Math.floor(); // 向下取整
Math.ceil(); // 向上取整
Math.round(); // 四舍五入
Math.random(); // 返回一个随机小数
Math.floor(Math.random() * (max - min + 1)) + min; // 得到一个大于等于 min 且小于等于 max 的数 
```



### Date对象

Date对象用于处理日期和时间，通过 new Date() 来创建。

```js
var d = new Date(); // 创建了一个Date对象，无参数时是获取当前的系统时间
var d1 = new Date('2021/11/23'); // 带参数的实例化

// 获取时间戳(总毫秒数)
new Date().getTime(); // 方法1
new Date().valueOf(); // 方法2
+new Date(); // 方法3

// 利用时间戳来创建倒计时效果
function countDown(time) {
    var nowTime = +new Date(); // 当前时间的总毫秒数
    var inputTime = +new Date(time); //输入时间的总毫秒数
    var times = (inputTime - nowTime) / 1000; // 剩余时间的总秒数
    var d = parseInt(times / 60 / 60 / 24); // 天
    d = d < 10 ? '0' + d : d;
    var h = parseInt(times / 60 / 60 % 24); // 时
    h = h < 10 ? '0' + h : h;
    var m = parseInt(times / 60 % 60); // 分
    m = m < 10 ? '0' + m : m;
    var s = parseInt(times % 60); //秒
    s = s < 10 ? '0' + s : s;
    return d + '天' + h + '时' + m + '分' + s + '秒';
}
```



### 数组对象



```js
// 使用new Array()来创建数组
var arr1 = new Array(); // 创建了一个空数组
var arr2 = new Array(2); // 创建了一个长度为2的空数组
var arr3 = new Array(2, 3); // 等价于var arr3 = [2, 3]; 创建方式与使用字面量创建相同
```



#### 检测是否为数组

- instanceof 运算符

  ```js
  var arr = [];
  var obj = {};
  console.log(arr instanceof Array); // true
  console.log(obj instanceof Array); // false
  ```

- Array.isArray() 方法

  ```js
  var arr = [];
  var obj = {};
  console.log(Array.isArray(arr)); // true
  console.log(Array.isArray(obj)); // false
  ```



#### 增删数组元素

- push(参数...)，在数组末尾增加一个或多个元素，返回值为新数组的长度
- pop()，删除数组最后的一个元素，并将该元素作为返回值
- unshift(参数...)，在数组开头增加一个或多个元素，返回值为新数组的长度
- shift()，删除数组的第一个元素，并将该元素作为返回值

```js
var arr = [1, 2, 3];
arr.push(4);    // [1, 2, 3, 4]
arr.unshift(0); // [0, 1, 2, 3, 4]
arr.pop();      // [0, 1, 2, 3]
arr.unshift();  // [1, 2, 3]
```



#### 数组排序

- reverse()，颠倒数组中的元素顺序

- sort()，对数组元素进行排序（冒泡排序）

  ```js
  var arr = [13, 4, 77, 1, 7];
  arr.sort();
  console.log(arr); // [1, 13, 4, 7, 77]这样写时，元素按照转换为的字符串的各个字符的Unicode位点进行排序
  arr.sort(function(a, b) { // function用来指定按某种顺序进行排列
      return a - b; // 升序排列，b - a 则改为降序排列
  }) // [1, 4, 7, 13, 77]
  ```



#### 查找数组索引

- indexOf()，查找给定元素在数组中的第一个索引并返回索引值，否则返回-1
- lastIndexOf()，查找给定元素在数组中的最后一个索引并返回索引值，否则返回-1



#### 数组转换成字符串

- toString()

- join('分隔符')

```js
var arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3

console.log(arr.join()); // 1,2,3 默认分隔符是 ,
console.log(arr.join('-')); // 1-2-3
```



### 字符串对象

#### 根据字符返回位置

- indexOf('要查找的字符', 开始的位置)，从指定位置开始（未指定则从头开始）返回指定字符在字符串中的位置，不存在该字符则返回 -1
- lastIndexOf()，与上述类似，只是从后往前查找



#### 根据位置返回字符

- charAt(index)，返回指定位置的字符
- charCodeAt(index)，返回指定位置字符的ASCII码
- str[index]，获取指定位置处的字符



#### 截取拼接字符串

- concat(str1, str2, str3...)，用于连接字符串，等同于 + 
- substr(start, length)，从start位置开始截取长度为length的字符串
- slice(start, end)，从start开始截取到end位置的字符串，不包括end
- substring(start, end)，与slice基本相同，但不接受负值



#### 替换字符

replace('被替换的字符', '替换成的字符')   只会替换遇到的第一个字符



#### 字符串转换为数组

split('分隔符')

```js
var str = '1, 2, 3';
console.log(str.split(',')); // [1,2,3]
```



## 简单数据类型和复杂数据类型



### 简单数据类型

在存储变量时存储的是值本事，所以又可以叫做值类型或基本数据类型。

string, number, boolean, undefined, null(返回一个空对象)。

当简单数据类型变量作为参数传递给函数的形参时，实际上是把变量在栈空间里的值复制了一份给形参，于是在函数内对形参做任何修改都不会影响到外部的变量。



### 复杂数据类型

在存储变量时存储的是地址（引用），又可以叫做引用类型。

包括通过 new 关键字创建的对象（自定义对象、内置对象），如Object、Array、Date等。

复杂数据类型变量传参时，实际上是把变量在栈空间里保存的堆地址复制给了形参，形参和实参保存的是同一个堆地址，所以操作的是同一个对象。





