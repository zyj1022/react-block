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

# 功能组件
- [styled-component](https://www.styled-components.com)

# 图表开源类库
- [Echart](http://echarts.baidu.com)
  - [react-echarts-packet](https://www.npmjs.com/package/react-echarts-packet)
- [Recharts(D3)](http://recharts.org)
- [ChartJS](https://www.npmjs.com/package/rechartjs)
  - [rechartjs](https://www.npmjs.com/package/rechartjs)


# 计划开发的组件
- [x] 皮肤切换功能
- [ ] 数据展示类型
  - [ ] 实时数据统计展示
  - [ ] 环形进度条展示
- [ ] 表单类型
  - [ ] 搜索筛选条件组合
  - [ ] 横向查询类型表单
  - [ ] 纵向表单
- [ ] 富文本编辑器
- [x] 常用图表部分
  - [x] 饼状图
  - [x] 柱状图
  - [x] 折线图
  - [x] 面积图
  - [x] 雷达图
  - [x] 环形图
- [x] [页脚版权信息]
- [ ] UI Elements组件（）
  - [x] Buttons
  - [ ] Layout
  - [ ] Grid
  - [ ] Icon
  - [ ] Breadcrumb
  - [ ] Dropdown
  - [ ] Checkbox
  - [ ] Radio
  - [ ] Input
  - [ ] Card
  - more……


……more

-----
