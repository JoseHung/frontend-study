# VUE\_学习笔记_01



## 创建VUE实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue函数开始的。

```vue
var vm = new Vue({
  // 选项
})
```

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。



## 数据与方法

当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

只有当实例被创建时就已经存在于 `data` 中的 property 才是**响应式**的。

`Object.freeze()`，这会阻止修改现有的 property，也意味着响应系统无法再*追踪*变化。

```vue
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3


```



## 生命周期钩子

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

```Vue
new Vue({
  data: {
    a: 1
  },
// created 钩子可以用来在一个实例被创建之后执行代码
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

![lifecycle](.\image\lifecycle.png)

（随着学习的深入来逐渐理解生命周期图）



## 模板语法

### 插值语法

用于解析标签体内容

语法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。



### 指令语法

用于解析标签（包括：标签属性、标签体内容、绑定事件...）

举例：v-bind:href="xxx" （或简写为 :href="xxx"），xxx同样要写js表达式，且可以直接读取到data中的所有属性。



## 数据绑定

```html
<div id="root">
        单向数据绑定：<input type="text" v-bind:value="name"><br/>
        双向数据绑定：<input type="text" v-model:value="name">
</div>
```

vue中有两种数据绑定的方式：

1. 单向绑定（`v-bind`），数据只能从`data`流向页面；
2. 双向绑定（`v-model`），数据既可以从`data`流向页面，也可以从页面流向`data`。

双向绑定一般应用在表单类元素上，例如（`input`、`select`等）

`v-model:value` 可以简写为 `v-model`，因为`v-model`默认收集的就是`value`值。



## el和data的两种写法

```js
		// el的两种写法
         new Vue({
             el:'#root', // 第一种写法
             data:{
                 name:'Jose'
             }
         })
         v.$mount('#root'); // 第二种写法

        // data的两种写法
        new Vue({
            el:'#root', 
             data:{ // 第一种写法 对象式
                 name:'Jose'
             }
            data :function(){ // 第二种写法 函数式
            return{
                name:'Jose'
            }
        }
        });
```

### el写法

1. 创建 `Vue` 实例时配置 `el` 属性
2. 先创建 `Vue` 实例，随后通过 `vm.$mount('#root')` 指定 `el` 的值

### data写法

1. 对象式
2. 函数式

在使用组件时只能使用函数式写法

由 `Vue` 管理的函数不可以写箭头函数，箭头函数的 `this` 不会指向 `Vue` 实例



## Vue中的MVVM模型

- M，模型（`Model`）：`data` 中的数据
- V，视图（`View`）：模板代码
- VM，视图模型（`ViewModel`)：`Vue` 实例

`data` 中所有的属性最后都会出现在 `vm` 中

`vm` 中所有属性及 `Vue` 原型中的所有属性，在 `Vue` 模板中都可以直接使用



## 数据代理

通过一个对象代理对另一个对象中属性的操作（读、写等）

```javascript
let obj = {x:100}
let obj2 = {y:200}
// 通过obj2来操作obj中的 x 属性 
Object.defineProperty(obj2, 'x',{
    get(){
        return obj.x;
    }
    set(value){
    	o
	}
})
```

 
