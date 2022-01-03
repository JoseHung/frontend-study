# JavaScript

## 闭包

一句话可以概括：闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。



## 类的创建和继承

### 创建

`new`一个`function`，在这个`function`的`prototype`里面增加属性和方法。

```js
// 定义一个动物类
function Animal (name) {
// 属性
	this.name = name || 'Animal';
	// 实例方法
	this.sleep = function(){
	console.log(this.name + '正在睡觉！');
	}
}
// 原型方法
Animal.prototype.eat = function(food) {
	console.log(this.name + '正在吃：' + food);
};
```



### 原型链继承

```js
function Cat(){ }
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';
//　Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat('fish'));
console.log(cat.sleep());
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true
```

在这里我们可以看到`new`了一个空对象,这个空对象指向`Animal`并且`Cat.prototype`指向了这个空对象，这种就是基于原型链的继承。

特点：基于原型链，既是父类的实例，也是子类的实例。

缺点：无法实现多继承。



### 构造继承

使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）。

```js
function Cat(name){
	Animal.call(this);
	this.name = name || 'Tom';
}
// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```

特点：可以实现多继承。

缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法。



### 实例继承和拷贝继承

实例继承：为父类实例添加新特性，作为子类实例返回。

拷贝继承：拷贝父类元素上的属性和方法。

实用性不强。



### 组合继承

相当于构造继承和原型链继承的组合体。通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。

```js
function Cat(name){
	Animal.call(this);
	this.name = name || 'Tom';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

特点：可以继承实例属性/方法，也可以继承原型属性/方法。

缺点：调用了两次父类构造函数，生成了两份实例。



### 寄生组合继承

待补充



## 如何解决异步回调地狱

#### `promise`

采用链式的 then，可以指定一组按照次序调用的回调函数。这时，前一个 then 里的一个回调函数，返回的可能还是一个 `Promise`对象（即有异步操作），这时后一个回调函数，就会等待该 `Promise`对象的状态发生变化，才会被调用。由此实现异步操作按照次序执行。

```js
var sayhello = function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(name);
      resolve();　　//在异步操作执行完后执行 resolve() 函数
    }, 1000);
  });
}
sayhello("first").then(function () {
  return sayhello("second");　　//仍然返回一个 Promise 对象
}).then(function () {
  return sayhello("third");
}).then(function () {
  console.log('end');
}).catch(function (err) {
  console.log(err);
})
//输出：first  second  third end
```

第一个 then 方法指定的回调函数，返回的是另一个`Promise`对象。这时，第二个`then`方法指定的回调函数，就会等待这个新的`Promise`对象状态发生变化。如果变为`resolved`，就继续执行第二个 then 里的回调函数。

#### `generator`

`generator`函数有一个最大的特点，可以在内部执行的过程中交出程序的控制权，`yield`相当于起到了一个暂停的作用；而当一定情况下，外部又将控制权再移交回来。

用`generator`来封装代码，在异步任务处使用`yield`关键词，此时`generator`会将程序执行权交给其他代码，而在异步任务完成后，调用`next`方法来恢复`yield`下方代码的执行。

```js
const co = reuqire('co');
// 我们的主任务——显示关键字
// 使用yield暂时中断下方代码执行
// yield后面为promise对象
const showKeyword = function* (filepath) {
    console.log('开始读取');
    let keyword = yield readFile(filepath);
    console.log(`关键字为${filepath}`);
}

// 使用co，省去对于generator流程控制的代码
co(showKeyword);
```



#### `async/await`

在`async`函数中可以使用`await`语句。`await`后一般是一个`Promise`对象。

当上面的函数执行到`await`时，可以简单理解为，函数挂起，等待`await`后的`Promise`返回，再执行下面的语句。这段异步操作的代码，看起来就像是“同步操作”。这就大大方便了异步代码的编写与阅读。

```js
const printData = async function (filepath) {
   let keyword = await readFile(filepath);
   let count = await queryDB(keyword);
   let data = await getData(res.length);
   console.log(data);
});

printData('./sample.txt');
```

