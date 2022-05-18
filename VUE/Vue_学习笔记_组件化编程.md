# Vue\_学习笔记_组件化编程

## 组件

- 定义：用来实现局部（特定）功能效果的代码集合（HTML、CSS、JS...）。
- 作用：复用编码，简化项目编码，提高运行效率。



## 如何使用组件

1. 定义（创建）组件

   使用 `Vue.extent(options)` 创建，其中 `options` 和 `new Vue(options)` 时传入的内容几乎一样，但仍有一些差别：

   - 不需要写 `el` 配置项，因为所有的组件都由一个 `vm` 来管理，由 `vm` 中的 `el` 来决定服务于哪个容器即可；
   - `data` 配置项必须写成函数的形式，这是避免组件在复用时，其中的数据还存在依赖关系。
   - 使用 `template` 来配置组件结构。

2. 注册组件

   1. 局部注册：`new Vue()` 时传入 `components` 选项；
   2. 全局注册：`Vue.component('组件名',组件)` 。

3. 使用组件（写组件标签）

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```javascript
new Vue({ el: '#components-demo' })
```

