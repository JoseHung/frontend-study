# JavaScript基础语法学习笔记01



### JS的书写位置

与CSS类似，可以写在多个位置

1. 行内式，也就是直接写在元素的内部（不建议使用）
2. 内嵌式，写在<head>元素中（学习时常用）
3. 外部式，即将代码写在外部的.js文件中（JS代码量大时使用）



### JS的注释

和c、c++相同

1. // 单行注释，快捷键ctrl + /
2. /**/ 多行注释，快捷键shift + alt + a



### JS常用输入输出语句

- prompt(info)，浏览器弹出的输入框
- alert(msg)，浏览器弹出的警示框，可输出信息
- console.log(msg)，用于控制台打印信息



## 变量



### 变量的本质

变量是程序在内存中申请的一块用于存放数据的空间 



### 变量的使用

1. 声明变量

   ```js
   var name;
   ```

2. 给变量赋值

   ```js
   name = 'Kobe';
   ```

3. 声明变量时初始化

   ```js
   var name = 'Kobe';
   ```

4. 同时声明多个变量

   ```js
   var age = 17,
   	name = 'Kobe';
   ```



### 变量命名规范

- 变量名必须有意义
- 由字母、数字、下划线和$组成
- 不能以数字开头
- 不能是关键字或保留字
- 遵循驼峰命名法



## JS数据类型

JS是动态语言，不需要提前声明变量的类型，这意味着同一个变量可以用作不同的类型

JS的数据类型分为两类

- 简单数据类型（Number、String、Boolean、Undefined、Null）
- 复杂数据类型（Object）



### Number

数字型，包含整型和浮点型，默认值为0

#### 特殊值

- Infinity，无穷大
- -Infinity，无穷小
- NaN，Not a Number，表示一个非数值

#### 相关方法

- isNaN()，用来判断非数字，返回值为Boolean类型



### String

字符串，默认为一个空的字符串

单引号和双引号在语法上都成立，不过由于HTML标签中的属性使用的是双引号，所以推荐对JS使用单引号

#### 转义符

- \n，换行
- \\\，表示单个\
- \\'，' 单引号
- \\"，" 双引号
- \t，tab缩进
- \b，blank空格

#### 字符串长度

通过字符串的length属性来获取字符串的长度

```javascript
var message = 'Hello, world!';
alert(message.length);//显示13
```

#### 字符串拼接

通过 + 进行拼接

字符串 + 任意类型数据 = 新字符串，拼接前会把其他类型转换成字符串类型，然后进行拼接

字符串常与变量进行拼接



### Boolean

布尔类型，true(1) & false(0)，默认值为false

布尔类型和数字型相加时，实际参与的true的值为1，false的值为0

```js
var flag = true;
console.log(flag + 1);//结果为2
```



### Undefined

当声明了一个变量但是没有对其赋值时，变量值为Undefined

```js
var str;
console.log(str);//结果为undefined
```

undefined类型与数字型相加时，结果为NaN

```js
var variable = undefined;
console.log(variable + 1);//NaN
console.log(variable + true);//NaN
```



### Null

空类型与数字型相加时，结果等于数字型的值

```js
var variable = null;
console.log(variable + 1);//1
console.log(variable + true);//1
```



### 获取变量数据类型

利用typeof来获取数据所属类型

```js
var num = 10;
console.log(typeof(num));//结果为number
var tim = null;
console.log(typeof(tim));//结果为object
```



### 数据类型转换

#### 转换成字符串类型

toString()

```js
var num = 1;
alert(num.toString());
```

String()强制转换

```js
var num = 1;
alert(String(num));
```

隐式转换，通过加号拼接得到字符串

```js
var num = 1;
alert(num + 'string');
```



#### 转换成数字型

parseInt(string)函数，将字符串转换成整数类型

```js
console.log(parseInt('3.14')); //取整，结果为3
console.log(parseInt('120px')); //去除px，结果为120
console.log(parseInt('rem120px')); //NaN
```

parseFloat(string)函数，将字符串转换成浮点数类型

```js
//与parseInt()类似，只不过转换浮点数时不会取整
console.log(parseFloat('3.14')); //结果为3.14
console.log(parseFloat('120px')); //去除px，结果为120
console.log(parseFloat('rem120px')); //NaN
```

Number()强制转换

```js
var str = '123';
console.log(Number(str)); //数字类型的123
```

隐式转换，利用算术运算 - * /实现

```js
console.log('12' - 1); //11
console.log('123' - '1'); //122
console.log('123' * 1); //123
```



#### 转换成布尔型

Boolean()函数，将其他类型转换成布尔类型

```js
//代表空、否定的值会被转换成false，其余的值转换成true
console.log(Boolean('name')); //true
console.log(Boolean(12)); //true

console.log(Boolean('')); //false
console.log(Boolean(0)); //false
console.log(Boolean(NaN)); //false
console.log(Boolean(null)); //false
console.log(Boolean(undefined)); //false
```





