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

### 插值

#### 文本

对数据绑定的最常见格式就是使用“Mustache”语法 (双大括号) 的文本插值：

```vue
<span>Message: {{ msg }}</span>
```

此处的 Mustache 标签将会被替代为对应数据对象上 `msg` property 的值。无论何时，绑定的数据对象上 `msg` property 发生了改变，插值处的内容都会更新。

通过使用 [v-once 指令](https://cn.vuejs.org/v2/api/#v-once)，也能执行一次性地插值，当 `msg` 数据改变时，插值处的内容不会更新。但这可能会影响到该节点上的其它数据绑定：

```vue
<span v-once>这个将不会改变: {{ msg }}</span>
```



#### 原始HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` 指令。

```vue
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
// 这个 span 的内容将会被替换成为 property 值 rawHtml，直接作为 HTML——会忽略解析 property 值中的数据绑定。
```

站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。所以只对可信内容使用 HTML 插值，绝不能对用户提供的内容使用插值。



#### 标签属性

Mustache 语法不能作用在 HTML 的标签属性上，遇到这种情况应该使用 `v-bind` ：

```vue
<div v-bind:id="dynamicId"></div>

<button v-bind:disabled="isButtonDisabled">Button</button>
<!--
	对于布尔类的属性而言 (它们只要存在就意味着值为 true)
	如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled attribute 不会被包含在渲染出来的 <button> 元素中。
-->
```



#### 使用JS表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```vue
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以对于声明语句等其它非表达式的语句而言不会生效。



### 指令

