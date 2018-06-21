import { types } from "mobx-state-tree";
import { CommonStore } from "./commonStore";
import HeaderStore from "./headerStore";
import SiderStore from "./siderStore";
import FormExampleStore from "./pages/formExampleStore";
import AnalysisStore from "./pages/analysisStore";
import MonitorStore from "./pages/monitorStore";
//{importStore}//

const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {}),

  header: types.optional(HeaderStore, {
    current: 0
  }),

  sider: types.optional(SiderStore, {
    isOpen: false,
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
        ]
      }, {
        type: 'group',
        index: 'Menu2_2',
        name: '列表',
        expanded: false,
        children: [
          { type: 'item', level: 3, link: '/FormExample', index: 'FormExample', name: '页面3' },
          { type: 'item', level: 3, link: '/Page4', index: 'Page4', name: '页面4' },
        ]
      }]
    }, {
      type: 'group',
      index: 'Menu1_2',
      name: '一级菜单2',
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
  //{pageStore}//
});

export default RootStore;
