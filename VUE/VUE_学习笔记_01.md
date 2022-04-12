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



## 计算属性和侦听器

#### 计算属性

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```vue
// 计算属性的一个基础例子
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

可以像绑定普通 property 一样在模板中绑定计算属性。Vue 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。



#### 计算属性与方法的对比

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```vue
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

对于上述例子而言，我们可以通过在表达式中调用方法来达到同样的效果。从结果上来说，两种方式的效果是一样的。

不同点在于，**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。



#### 计算属性与侦听属性的对比

1. 功能上：computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
2.  是否调用缓存：computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。
3. 是否调用return：computed中的函数必须要用return返回，watch中的函数不是必须要用return。
4. watch擅长处理的场景：一个数据影响多个数据 -------搜索框。
5. computed擅长处理的场景：一个数据受多个数据影响 -- 使用场景：当一个值受多个属性影响的时候--------购物车商品结算。



#### 计算属性的setter

计算属性默认只有 getter，不过在需要时也可以提供一个 setter：

```vue
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。



#### 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

