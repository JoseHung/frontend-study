# VUE_学习笔记\_02

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
-  `methods` 中配置的函数不要使用箭头函数，不然 `this` 的指向就不是 `vm` 了；
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

