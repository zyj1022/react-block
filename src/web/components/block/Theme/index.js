import React, { Component } from 'react';
import nj from 'nornj';
import {registerComponent} from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import cookie from 'js-cookie';

import styles from './theme.m.scss';
import tmpls from './theme.t.html';

import * as skin from './defaultTheme'

// 页面容器组件
@inject('store')
@observer
@registerTmpl('Theme')
class Theme extends Component {

 @autobind
 changeTopBar(e) {
   const index = parseInt(e.target.getAttribute("data-index"))
   this.props.store.common.setTopBarColor(index)
   cookie.set('topBarColor', skin.colors[index])
 }

 @autobind
 changeSideBar(e) {
   const index = parseInt(e.target.getAttribute("data-index"))
   this.props.store.common.setSideColor(index);
   cookie.set('sideBarColor', index)
 }

 @autobind
 changePageTheme(e) {
   const index = parseInt(e.target.getAttribute("data-index"))
   this.props.store.common.setTheme(index===0 ? 'dark' : 'white');
   cookie.set('themeColor', index===0 ? 'dark' : 'white')
 }

 @autobind
 closeSetting() {
   this.props.store.common.setSettingPannel(false)
 }

 render() {
   const { store: { common } } = this.props;
   return tmpls.theme(this.state, this.props, this, {
     styles,
     common,
     skin: skin.colors,
     sideSkin: skin.sideSkin,
   });
 }
}
registerComponent({'wee-Theme': Theme});

export default Theme;
