import * as React from 'react'
import { Component, PropTypes } from 'react';
import { toJS, transaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import cookie from 'js-cookie';
import './sider.scss';
import tmpls from './sider.t.html';
import { slide as Menu } from 'react-burger-menu';
import 'flarej/lib/components/antd/icon';
import * as skin from '../block/theme/defaultTheme';

@inject('store')
@observer
export default class Sider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.store.sider.setMenu(true);
  }

  @autobind
  selectMenu(index) {
    return e => {
      this.props.store.sider.setCurrent(index);
    }
  }

  @autobind
  toggleMenu(item) {
    return e => {
      this.props.store.sider.setMenuDataByIndex(!item.expanded, item.index)
    };
  }

  @autobind
  isMenuOpen(state) {
    this.props.store.sider.setMenu(state.isOpen)
  }

  getBgColorIndex() {
    const cookieIndex = cookie.get('sideBarColor') ? cookie.get('sideBarColor') : 0;
    const skinIndex = this.props.store.common.sideColorIndex;
    if(cookieIndex === skinIndex) {
      return cookieIndex;
    } else {
      return skinIndex;
    }
  }

  getBgColor() {
    const cookieColor = cookie.get('topBarColor') ? cookie.get('topBarColor') : skin.colors[0];
    const skinColor = skin.colors[this.props.store.common.topBarColorIndex];
    if(cookieColor === skinColor) {
      return cookieColor;
    } else {
      return skinColor;
    }
  }

  render() {

    const { store: { common } } = this.props;
    this.getBgColorIndex();
    this.getBgColor();
    const bgColor = cookie.get('topBarColor') ? cookie.get('topBarColor') : skin.colors[this.props.store.common.topBarColorIndex];
    const cookieIndex = cookie.get('sideBarColor') ? cookie.get('sideBarColor') : 0;
    const sideType = cookieIndex > 0 ? 'white-theme' : 'dark-theme'
    const logoBg = cookieIndex > 0 ? 'site-theme' : ''
    console.log('bgColor', bgColor);

    const generateMenu = items => {
      return items.map(item => {
        return tmpls.menuCnt(this.props, this, { item, generateMenu, bgColor });
      });
    }

    const menuCnt = generateMenu(this.props.store.sider.currentMenuData);

    return tmpls.menu({
      menuCnt,
      common,
      sideType,
      logoBg,
      components: { 'burger-Menu': Menu }
    }, this.props, this);
  }
}
