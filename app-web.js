import 'whatwg-fetch';
import 'es6-weak-map/implement';
import arrayFrom from 'array-from';
if (!Array.from) Array.from = arrayFrom;
import 'console-polyfill';
import 'core-js/es6/map';
import 'core-js/es6/set';
!window.requestAnimationFrame && (window.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
});
import 'flarej/lib/styles/grid';
import 'flarej/lib/components/grid';
import React from 'react';
import ReactDOM from 'react-dom';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
React.createClass = createClass;
React.PropTypes = PropTypes;
import nj from 'nornj';
import 'nornj-react/mobx';
import 'nornj-react/router';
import './src/utils/nj.configs';
import { compileH, registerComponent } from 'nornj'
import { withRouter } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { observer, Provider, inject } from 'mobx-react';
import routes from './routes-web';
import './src/web/css/app.scss'
import RootStore from './src/stores/rootStore';
import { onSnapshot } from "mobx-state-tree";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
if (!Object.assign && babelHelpers) {
  Object.assign = babelHelpers.extends;
}
import Notification from 'flarej/lib/components/antd/notification';
import { createNotification } from './src/utils/notification';
createNotification(Notification);

const rootStore = RootStore.create({});
// onSnapshot(rootStore, (snapshot) => {
//   console.log(snapshot)
// })

const renderApp = appRoutes => {
  ReactDOM.render(nj `
    <mobx-Provider store=${rootStore}>
      <HashRouter>
        <div id="outer-container">
          ${appRoutes()}
        </div>
      </HashRouter>
    </mobx-Provider>` (),
    document.getElementById('app')
  );
};
renderApp(routes);

if (module.hot) {
  module.hot.accept('./routes-web', () => {
    const newRoutes = require('./routes-web').default;
    renderApp(newRoutes);
  });
}