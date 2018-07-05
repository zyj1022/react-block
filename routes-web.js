import React from 'react';
import Bundle from './Bundle';
import { withRouter, Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { observer, Provider, inject } from 'mobx-react';
import loadFormExample from 'bundle-loader?lazy&name=[name]!./src/web/pages/formExample/formExample.js';
import loadAnalysis from 'bundle-loader?lazy&name=[name]!./src/web/pages/analysis/analysis.js';
import loadMonitor from 'bundle-loader?lazy&name=[name]!./src/web/pages/monitor/monitor.js';
import loadRecharts from 'bundle-loader?lazy&name=[name]!./src/web/pages/recharts/recharts.js';
import loadEcharts from 'bundle-loader?lazy&name=[name]!./src/web/pages/echarts/echarts.js';
import loadChartjs from 'bundle-loader?lazy&name=[name]!./src/web/pages/chartjs/chartjs.js';
//{importLoadPage}//
import Header from './src/web/components/header';
import Sider from './src/web/components/sider';
import Theme from './src/web/components/block';

const HeaderWithRouter = withRouter(Header);
const SiderWithRouter = withRouter(Sider);
const loadBundles = {
  loadFormExample,
  loadAnalysis,
  loadMonitor,
  loadRecharts,
  loadEcharts,
  loadChartjs,
  //{loadPage}//
};

/**
 * 页面formExample
 */
const FormExample = inject('store')(
  observer(({ store }) =>
    nj`
    <${PageWrap}>
      <${Bundle} load=${loadFormExample} store=${store} isPc loadBundles=${loadBundles}>
        ${_FormExample => {
          const FormExample = withRouter(_FormExample);
          return nj`<${FormExample}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `()
  )
);

/**
 * 页面analysis
 */
const Analysis = inject('store')(
  observer(({ store }) =>
    nj`
    <${PageWrap}>
      <${Bundle} load=${loadAnalysis} store=${store} isPc loadBundles=${loadBundles}>
        ${_Analysis => {
          const Analysis = withRouter(_Analysis);
          return nj`<${Analysis}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `()
  )
);

/**
 * 页面monitor
 */
const Monitor = inject('store')(
  observer(({ store }) =>
    nj`
    <${PageWrap}>
      <${Bundle} load=${loadMonitor} store=${store} isPc loadBundles=${loadBundles}>
        ${_Monitor => {
          const Monitor = withRouter(_Monitor);
          return nj`<${Monitor}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `()
  )
);

/**
 * 页面recharts
 */
const Recharts = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadRecharts} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Recharts) => {
          const Recharts = withRouter(_Recharts)
          return nj`<${Recharts}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

/**
 * 页面echarts
 */
const Echarts = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadEcharts} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Echarts) => {
          const Echarts = withRouter(_Echarts)
          return nj`<${Echarts}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

/**
 * 页面chartjs
 */
const Chartjs = inject("store")(
  observer(({ store }) => nj`
    <${PageWrap}>
      <${Bundle} load=${loadChartjs} store=${store} isPc loadBundles=${loadBundles}>
        ${(_Chartjs) => {
          const Chartjs = withRouter(_Chartjs)
          return nj`<${Chartjs}/>`();
        }}
      </${Bundle}>
    </${PageWrap}>
  `())
);

//{pageComponent}//

const PageWrap = inject('store')(
  observer(({ store, children }) =>
    nj`
    <div>
      <${SiderWithRouter}/>
      <${HeaderWithRouter}/>
      <div id='page-wrap' className="${store.sider.isOpen ? 'isMenuOpen' : ''}">
        ${children}
        <Theme store="${store}"/>
      </div>
    </div>
  `()
  )
);

const routes = () =>
  nj`
  <router-Switch>
    <Route exact path='/' component=${Analysis}/>
    <Route exact path='/FormExample' component=${FormExample} />
    <Route exact path='/Analysis' component=${Analysis} />
    <Route exact path='/Monitor' component=${Monitor} />
    <Route exact path='/Recharts' component=${Recharts} />
    <Route exact path='/Echarts' component=${Echarts} />
    
    <Route exact path='/Chartjs' component=${Chartjs} />
    <!--//{route}//-->
    <Redirect from='*' to='/'/>
  </router-Switch>
`();

export default routes;