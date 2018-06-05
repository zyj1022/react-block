# React-block

初衷，归纳众多的UI零碎组件形成规范统一通用的react组件化模块，方便快速搭建后台程序界面。
UI主要基于 [Ant Design](http://ant.design/index-cn) 基础设计风格。

# 使用方法

## 采用 [NornJ-cli](https://github.com/joe-sky/nornj-cli) 快速搭建的脚手架中使用

在js文件中引入相关组件

```
import { Bar, Pie, Footer } from '../../block';
```
在 xxx.t.html 中使用

```
<wee-Footer />
```

## 采用官方create-react-app 搭建的环境中使用

在jsx文件中引入相关组件

```
import { Bar, Pie, Footer } from '../../block';

 // code

 render() {
   return (
     <div className={styles.page}>
        <Footer/>
     </div>
    );
 }
```

# 计划开发的组件
- [ ] 表单类型
  - [ ] 横向查询类型表单
  - [ ] 纵向表单
- [ ] 富文本编辑器
- [ ] 常用图表部分
  - [ ] 饼状图
  - [ ] 柱状图
  - [ ] 折线图
  - [ ] 面积图
  - [ ] 雷达图
  - [ ] 环形图
- [x] [页脚版权信息]

……more

-----
