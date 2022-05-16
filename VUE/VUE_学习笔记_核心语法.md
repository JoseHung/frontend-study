# Vue\_学习笔记_核心语法



## 创建 `Vue` 实例

每个  `Vue` 应用都是通过用 `Vue` 函数创建一个新的 `Vue` 函数开始的。

```vue
var vm = new Vue({
  // 选项
})
```

一个 `Vue` 应用由一个通过 `new Vue` 创建的**根 `Vue` 实例**，以及可选的嵌套的、可复用的组件树组成。



## 数据与方法

当一个 `Vue` 实例被创建时，它将 `data` 对象中的所有的 `property` 加入到 `Vue` 的**响应式系统**中。当这些 `property` 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

只有当实例被创建时就已经存在于 `data` 中的 `property` 才是**响应式**的。

`Object.freeze()`，这会阻止修改现有的 `property`，也意味着响应系统无法再*追踪*变化。

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

每个 `Vue` 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

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

语法：`{{xxx}}`，`xxx` 是 `js` 表达式，且可以直接读取到 `data` 中的所有属性。



### 指令语法

用于解析标签（包括：标签属性、标签体内容、绑定事件...）

举例：`v-bind:href="xxx"`（或简写为 `:href="xxx"` ），`xxx` 同样要写 `js` 表达式，且可以直接读取到 `data` 中的所有属性。



## 数据绑定

```html
<div id="root">
        单向数据绑定：<input type="text" v-bind:value="name"><br/>
        双向数据绑定：<input type="text" v-model:value="name">
</div>
```

 `Vue`中有两种数据绑定的方式：

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

 

### Vue中的数据代理

通过 `vm` 对象来代理对 `data` 对象中属性的读写操作，使操作更方便。

原理：

1. 通过 `Object.defineProperty()` 方法把 `data` 中的所有属性添加到 `vm` 上
2. 为所有被添加到 `vm` 中的属性指定一个 `getter` 和 `setter`
3. 在 `getter` 和 `setter` 内部去操作 `data` 中对应的属性



## 事件处理

### 事件的基本使用

```html
<div class="root">
    <h1>
        welcome, {{name}}！
    </h1>
    <button @click="showInfo1">
        点我提示信息1（不传参）
    </button>
    <button @click="showInfo2(66,$event)">
        点我提示信息2（传参）
    </button>
</div>

<script type="text/javascript">
	const vm = new Vue({
        el:'#root',
        data:{
            name:'Jose',
        },
        methods:{
            showInfo1(event) {
                alert('hello!');
            }
            showInfo2(number, event) {
        		console.log(number, event);
    			alert('hello!!');
    		}
        }
    })
</script>
```

- 使用 `v-on:xxx` 或 `@xxx` 来绑定事件， `xxx` 是事件名；
- 事件的回调需要配置在 `methods` 中；
- `methods` 中配置的函数不要使用箭头函数，不然 `this` 的指向就不是 `vm` 了；
- `@click="demo"` 和 `@click="demo($event)"` 效果一致，但后者可以传参。



### 事件修饰符

1.  `prevent` 阻止默认事件（常用）
2.  `stop` 阻止事件冒泡（常用）
3.  `once` 事件只触发一次（常用）
4.  `capture` 使用事件的捕获模式
5.  `self` 只有 `event.target` 是当前操作的元素时才触发事件
6.  `passive` 令事件的默认行为立即执行，而无需等待事件回调执行完毕

事件修饰符可以连续写



### 键盘事件

- `Vue` 中常用的按键别名：

  - enter

  - delete（删除和退格键）

  - esc

  - space

  - tab（需配合 `keydown` 使用）

  - up

  - down

  - left

  - right

- `vue` 中未提供别名的按键，也可以使用按键原始的 `key` 值去绑定，但需要注意转换成短横线命名。
- 系统修饰键：`ctrl` `alt` `shift` `meta`
  - 配合 `keyup` 使用时，在按下修饰键的同时，还需要再按下其他任意键，再释放其他键，随后才可触发事件；
  - 配合 `keydown` 使用时，可以正常触发事件。
- 可以使用 `keyCode` 去指定具体的按键（不推荐）。
- 通过 `Vue.config.keyCodes.自定义键名 = 键码` 方式可以定制按键别名。



## 计算属性

```html
<div class="root">
    姓：<input type="text" v-model="lastName">
    名：<input type="text" v-model="firstName">
    全名：<span>{{fullName}}</span>
</div>

<script type="text/javascript">
	const vm = new Vue({
        el:'#root',
        data:{
            firstName:'Jose',
            lastName:'Hung'
        },
        computed:{
            fullName:{
                get(){
                    return this.firstName + '-' + this.lastName
                }
                set(value){
            		const arr = value.split('-')
        			this.firstName = arr[0]
                    this.lastName = arr[1]
        		}
            }
        }
    })
</script>
```



### 定义

需要的属性不存在，要通过已有的属性计算而得。



### 原理

底层实现借助了 `Object.defineProperty` 方法所提供的 `getter` 和 `setter`。



### `get` 函数什么时候执行

1. 初次读取时执行一次；
2. 当依赖的数据发生变化时会被再次执行调用。



### 优势

与  `methods` 实现相比，内部有缓存机制（可复用），效率更高，调试更方便。



### 备注

- 计算属性最终会出现在 `vm` 上，可以直接读取调用；
- 如果需要修改计算属性，则需要写 `set` 函数去响应修改，且 `set` 中要引起计算时依赖的数据发生变化。





## 监视属性

```html
<div class="root">
    <h2>
        今天天气很{{info}}
    </h2>
    <button @click="changeWeather">
        切换天气
    </button>
</div>

<script type="text/javascript">
	const vm = new Vue({
        el:'#root',
        data:{
            isHot:true,
        },
        computed:{
            info:{
                return this.isHot ? '炎热' : '凉爽'
            }
        }
        methods:{
			changeWeather:{
        		this.isHot = !this.isHot
    		}                  
		}
        watch:{
			isHot:{
            	immediate:true, // 初始化时让handler调用
                handler(newValue, oldValue){
        			console.log('isHot被修改了', newValue, oldValue)
    			}
            }
        }
    })
</script>
```



1. 当被监视的属性变化时，回调函数自动调用，进行相关操作；
2. 只有当被监视的属性存在时才能够正常执行监视功能；
3. 监视的两种写法
   1. `new Vue` 时传入 `wathch` 配置；
   2. 通过 `vm.$watch` 监视。



### 深度监视

1.  `Vue` 中的 `watch` 默认不监测对象内部值的改变（一层）；
2. 在 `watch` 中配置 `deep:true` 可以实现对对象内部值的监测（多层）；
3. 实际使用时，根据数据的具体结构来决定是否采用深度监视。



### `Computed` 和 `watch` 的区别

1. `Computed` 能实现的功能， `watch` 都可以实现；
2.  `watch` 能实现的功能，`Computed` 不一定能实现，如异步操作；



### 何时使用箭头函数

使用箭头函数的重要原则：

1. 被 `Vue` 管理的函数，最好写成普通函数，这样 `this` 的指向才是 `vm` 或组件实例对象；
2. 所有不被 `Vue` 管理的函数（定时器的回调函数、 `ajax` 的回调函数、 `Promise` 的回调函数等），最好写成箭头函数，使`this` 的指向为 `vm` 或组件实例对象。



## 绑定样式

### 绑定 `class` 样式

语法 `:class="xxx" ` 其中 `xxx` 可以是字符串、对象、数组。

1. 字符串写法，适用于绑定样式的类名不确定，需要动态指定；
2. 数组写法，适用于绑定的样式个数及类名不确定；
3. 对象写法，适用于绑定样式的个数、名字都确定，但要动态决定用不用。



### 绑定 `style` 样式

1.  `:style="{fontSize:xxx}"` 其中 `xxx` 是动态值；
2. `:style="[a,b]"` 其中 `a` 、 `b` 是样式对象。



## 条件渲染

-  `v-if` 

  语法：

  1.  `v-if="表达式"` 
  2.  `v-else-if="表达式"` 
  3.  `v-else="表达式"` 

  适用于切换频率较低的场景；

  对于不需要展示的元素直接移除；

  三种写法可以配合使用，要求结构不被打断。

-  `v-show`

  语法： `v-show="表达式"` 

  适用于切换频率较高的场景；

  对于不需要展示的 `DOM` 元素，通过 `display` 将其隐藏，而不是直接移除。

两种渲染方式的不同特性，导致在使用 `v-if` 时有可能无法获取到元素，而使用 `v-show` 时一定可以获取到。



## 列表渲染

`v-for` 指令，用于展示列表数据。

语法： `v-for="(item, index) in xxx" :key="yyy"`

可以遍历数组、对象、字符串（使用较少）、指定次数（使用较少）。

在没有指定 `key` 值时， `key` 默认为 `index` 值。



#### `key` 的原理

1. 虚拟 `DOM` 中 `key` 的作用

   `key` 是虚拟 `DOM` 对象的标识，当数据发生变化时， `Vue` 会根据新的数据来生成新的虚拟 `DOM`，随后将新旧虚拟 `DOM` 进行差异比较，比较规则如下。

2. 对比规则

   1. 旧虚拟 `DOM` 中找到了与新虚拟 `DOM` 相同的 `key`  

      1. 若虚拟 `DOM` 中内容没变，则直接使用之前的真实 `DOM`;
      2. 若虚拟 `DOM` 中内容有变化，则生成新的真实 `DOM`，并替换页面中先前的真实 `DOM` 。

   2. 旧虚拟 `DOM` 中未找到与新虚拟 `DOM` 相同的 `key`

      ​	创建新的真实 `DOM`，随后渲染到页面中。

3. 用 `index` 作为 `key` 可能会引发的问题

   1. 若对数据进行逆序添加、逆序删除等破坏顺序操作，会导致产生没必要的真实 `DOM` 更新，可以正常生成页面效果但降低了效率；
   2. 如果结构中还包括输入类的 `DOM` ，则会产生错误的 `DOM` 更新，导致页面出现问题。

4. 开发时如何选择 `key`

   1. 使用数据的唯一标识作为 `key` ，如 `id` 、手机号、身份证号等；
   2. 若不存在对数据的逆序添加、逆序删除等打乱顺序的操作，仅用于渲染列表进行展示，则可以使用 `index` 作为 `key` 。



## `Vue` 监视数据的原理

1.  `Vue` 会监视 `data` 中所有层次的数据；

2. 对对象中的数据检测通过 `setter` 实现，且在 `new Vue` 时就要传入需要检测的数据；

   1. 对象中后追加的属性， `Vue` 默认不做响应式处理；

   2. 如需要给后添加的属性做相应式处理，则需要使用如下 `API` ：

      ```vue
      Vue.set(target, propertyName/index, value)
      或
      vm.$set(target, propertyName/index, value)
      ```

3. 对数组中的数据检测通过包裹数组更新元素的方法实现，本质就是做了两件事：

   1. 调用原生对应的方法对数组进行更新；
   2. 重新解析模板，然后更新页面。

4. 在 `Vue` 修改数组中的某个元素一定要用如下方法：

   1. 使用这7个 `API` ：`push()` `pop()` `shift()` `unshift()` `splice()` `sort()` `reverse()`；
   2.  `Vue.set()` 或 `vm.$set()`



需要注意的是，`Vue.set()` 和 `vm.$set()` 不能够给 `vm` 或 `vm` 的根数据对象添加属性。



## 内置指令

- `v-bind` 单向绑定解析表达式，可简写为 `:xxx`。
- `v-model` 双向数据绑定。
- `v-for` 遍历数组/对象/字符串。
- `v-on` 绑定事件监听，可简写为 `@`。
- `v-if` 条件渲染（动态控制节点是否存在）。
- `v-else` 条件渲染（动态控制节点是否存在）。
- `v-show` 条件渲染（动态控制节点是否展示）。
- `v-text` 向所在节点中渲染文本内容，但不会识别 `html` 结构。
- `v-html` 向所在节点中渲染文本内容，且可以识别 `html` 结构。该指令有安全性问题，容易导致 `xss` 攻击，不能使用在用户提交的内容上。
- `v-cloak` 本质是一个特殊属性，没有值，当 `Vue` 实例创建完毕并接管容器后会删掉该属性。
- `v-once` 所在节点在初次动态渲染后就视为静态内容，之后数据的改变不会引起该节点的更新，可以用于优化性能。
- `v-pre` 跳过其所在节点的编译过程，可以在没有使用指令语法和插值语法的节点中使用，从而提高编译速度。
