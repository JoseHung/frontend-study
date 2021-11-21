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

