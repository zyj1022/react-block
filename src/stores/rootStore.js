import { types } from "mobx-state-tree";
import { CommonStore } from "./commonStore";
import HeaderStore from "./headerStore";
import SiderStore from "./siderStore";
import FormExampleStore from "./pages/formExampleStore";
import AnalysisStore from "./pages/analysisStore";
import MonitorStore from "./pages/monitorStore";
import RechartsStore from "./pages/rechartsStore";
import ChartjsStore from "./pages/chartjsStore";
import EchartStore from "./pages/echartStore";
import ButtonsStore from "./pages/buttonsStore";
import CardsStore from "./pages/cardsStore";
import GridStore from "./pages/gridStore";
//{importStore}//

const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {}),

  header: types.optional(HeaderStore, {
    current: 0
  }),

  sider: types.optional(SiderStore, {
    isOpen: true,
    current: 'page1',
    menuData: [{
      type: 'group',
      index: 'Menu1_1',
      name: 'Dashboard',
      expanded: false,
      children: [{
        type: 'group',
        index: 'Menu2_1',
        name: 'Dashboard',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Analysis', index: 'Analysis', name: '分析页' },
          { type: 'item', level: 3, link: '/Monitor', index: 'Monitor', name: '监控页' },
          { type: 'item', level: 3, link: '/FormExample', index: 'FormExample', name: '表单页' },
        ]
      }, {
        type: 'group',
        index: 'Menu2_2',
        name: 'Charts',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Recharts', index: 'Recharts', name: 'Recharts' },
          { type: 'item', level: 3, link: '/Echart', index: 'Echart', name: 'Echart' },
          { type: 'item', level: 3, link: '/Chartjs', index: 'Chartjs', name: 'Chartjs' },
        ]
      }, {
        type: 'group',
        index: 'Menu2_3',
        name: 'UI Elements',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Buttons', index: 'Buttons', name: 'Buttons' },
          { type: 'item', level: 3, link: '/Cards', index: 'Cards', name: 'Cards' },
          { type: 'item', level: 3, link: '/Grid', index: 'Grid', name: 'Grid' },
        ]
      }]
    }, {
      type: 'group',
      index: 'Menu1_2',
      name: 'Charts',
      expanded: false,
      children: [{
        type: 'group',
        index: 'Menu2_3',
        name: '二级菜单3',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Page5', index: 'Page5', name: '页面5' },
          { type: 'item', level: 3, link: '/Page6', index: 'Page6', name: '页面6' },
        ]
      }, {
        type: 'group',
        index: 'Menu2_4',
        name: '二级菜单4',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/Page7', index: 'Page7', name: '页面7' },
          { type: 'item', level: 3, link: '/Page8', index: 'Page8', name: '页面8' },
        ]
      }]
    }]
  }),

  formExample: types.optional(FormExampleStore, {}),
  analysis: types.optional(AnalysisStore, {}),
  monitor: types.optional(MonitorStore, {}),
  recharts: types.optional(RechartsStore, {}),
  chartjs: types.optional(ChartjsStore, {}),
  echart: types.optional(EchartStore, {}),
  buttons: types.optional(ButtonsStore, {}),
  cards: types.optional(CardsStore, {}),
  grid: types.optional(GridStore, {}),
  //{pageStore}//
});

export default RootStore;
