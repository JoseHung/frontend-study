# ES6_学习笔记

## let声明

let跟var的作用类似，但存在非常重要的区别。

1. let声明的范围是块作用域，var声明的范围是函数作用域；
2. let声明的变量在作用域中不会被提升。



## const声明

const与let基本相同，区别在于const声明变量时必须初始化变量，且对const声明的变量进行修改时会导致运行错误。

需要注意的是，const声明的限制只适用于它指向的变量的引用，也就是说如果const变量引用的是一个对象，那么对该对象内部属性的修改是不会违反const的限制的（数组也一样）。



## 解构赋值

解构赋值是对赋值运算符的扩展。

他是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。

在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。

### 数组解构

```js
var [a, b, c] = [1, 2, 3];
// 等同于var a = 1;
		var b = 2;
		var c = 3;
// 如果解构不成功，变量的值就等于undefined
```



### 对象解构

```js
// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```



## 模板字符串

es6中新引入的声明字符串的方法

1. 可以用来声明字符串

2. 可以使字符串内容中直接出现换行符

3. 变量拼接

   ```js
   let str = `<ul>
   				<li>1</li>
              </ul>`;
   
   let fav = 'Kobe';
   let out = `${fav} is my favorite player!`;
   ```



## 简化对象写法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
var birth = '2000/01/01';
var Person = {
  name: '张三',
  //等同于birth: birth
  birth,
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
```



## 箭头函数

1. 箭头函数中的this对象是静态的，this始终指向函数声明时所在作用域下的this的值；

2. 箭头函数不可以作为构造函数；

3. 箭头函数中不能使用arguments变量；

4. 可以进行简写

   ```js
   // 当只有一个形参的时候，可以省略小括号()
   // 当函数中只有一行代码时，可以省略花括号{}，此时return也必须省略，语句的执行结果就是函数的返回值
   let pow = n => n * n;
   ```



## 函数参数的默认值

1. ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。

2. 参数默认值可以与解构赋值的默认值，结合起来使用。

   ```js
   // 函数参数默认值举例
   function log(x, y = 'World') {
     console.log(x, y);
   }
   
   log('Hello') // Hello World
   log('Hello', 'China') // Hello China
   log('Hello', '') // Hello
   
   // 结合解构赋值
   function foo({x, y = 5}) {
     console.log(x, y);
   }
   
   foo({}) // undefined, 5
   foo({x: 1}) // 1, 5
   foo({x: 1, y: 2}) // 1, 2
   foo() // TypeError: Cannot read property 'x' of undefined
   ```



## rest参数

ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```js
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10

// 需要注意的是，当rest参数之后不能再有其他参数，否则会报错
```



## 扩展运算符

扩展运算符（spread）是三个点（`...`）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```



## Symbol

Symbol是es6引入的新的原始数据类型，用来表示独一无二的值，以解决传统字符串对变量名的命名冲突。

1. symbol的值唯一；
2. symbol的值不能与其他数据进行运算；
3. symbol定义的对象属性不能使用for...in...循环遍历，但是可以使用Reflect.ownKeys来获取对象的所有键名。



## Iterator

Iterator 的作用有三个：

1. 为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3.  ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。	



Iterator的遍历过程：

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中， value 属性是当前成员的值， done 属性是一个布尔值，表示遍历是否结束。



需要自定义遍历数据时应该想到使用迭代器。

```js
var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```



## Generator

Generator是ES6提供的一种异步编程解决方案。

```js
function* helloWorldGenerator() {
  yield 'hello';  
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
// 在定义生成器函数时，函数名与function之间需要加上一个 * 
// 函数体内部使用 yield 表达式，定义不同的内部状态
// 调用 Generator 函数后，该函数并不执行，必须调用遍历器对象的 next 方法，使得指针移向下一个状态
// next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
```



## Promise

