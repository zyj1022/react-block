import React from 'react';
import Bundle from './Bundle';
import { withRouter, Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { observer, Provider, inject } from 'mobx-react';
import loadFormExample from 'bundle-loader?lazy&name=[name]!./src/web/pages/formExample/formExample.js';
import loadAnalysis from 'bundle-loader?lazy&name=[name]!./src/web/pages/analysis/analysis.js';
import loadMonitor from 'bundle-loader?lazy&name=[name]!./src/web/pages/monitor/monitor.js';
//{importLoadPage}//
import Header from './src/web/components/header';
import Sider from './src/web/components/sider';

const HeaderWithRouter = withRouter(Header);
const SiderWithRouter = withRouter(Sider);
const loadBundles = {
  loadFormExample,
  loadAnalysis,
  loadMonitor
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

//{pageComponent}//

const PageWrap = inject('store')(
  observer(({ store, children }) =>
    nj`
    <div>
      <${SiderWithRouter}/>
      <${HeaderWithRouter}/>
      <div id='page-wrap' className=${store.sider.isOpen ? 'isMenuOpen' : ''}>
        ${children}
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
    <!--//{route}//-->
    <Redirect from='*' to='/'/>
  </router-Switch>
`();

export default routes;
