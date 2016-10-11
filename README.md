# Boluome Web app

#### 开发目录

src/apps/huafei

src/apps/dianying

具体目录结构参考 src/apps/eg

本地测试服务器：

```bash
$ npm run dev
```

访问：`localhost:8081`


打包：

```bash
$ npm run build
```

打包结果在 `/dist`

部署：

```bash
$ npm start
```

访问：`localhost:8082`


#### 关于 Flow：

* http://zhenyong.site/flowtype/
* 文件头部加一行 `/* @flow */`， Flow 才会去检测
* 在跨模块使用的时候，Flow 需要明确注解；其他地方的类型注解不是必须的，Flow 会自己去推断类型，寻找错误
* any 是一个特殊的类型注解，代表任何动态类型。意味着 “别检查我，我知道我在干嘛”

语法示例：

```
// 这是一个 flow 测试
const str: number = 123
console.log(typeof str, str)

function add(num1: number, num2: number|void = 0): number {
  return num1 + num2;
}
var x = add(3);
console.log(typeof x, x)
// 测试结束
```

#### 手动 Flow 检查：npm run flow

基于 Babel 的扩展，保留了 JS 的灵活。 (选用)

#### Prop 验证：propTypes

当向 props 传入无效数据时，JavaScript 控制台会抛出警告（只在开发环境），推荐使用。

#### 调试：Chrome + React Developer Tools

#### 样式：PostCSS 平台的 cssnext(CSS4语法) + precss(sass语法)

推荐书写简单清晰的 cssnext.
