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





