import { Component, PropTypes } from 'react';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import cookie from 'js-cookie';
import styles from './header.scss';
import template from './header.t.html';
import * as skin from '../block/theme/defaultTheme';

@inject('store')
@observer
export default class Header extends Component {
  logoutUrl = `${__HOST}/common/logout`;

  componentDidMount() {

  }

  @autobind
  navChanged(index) {
    return e => {
      this.props.store.header.setCurrent(index);
      this.props.history.push('/' + this.props.store.sider.menuData[index].children[0].children[0].index);
    }
  }

  @autobind
  showSetting() {
    this.props.store.common.setSettingPannel(true);
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
    this.getBgColor();
    const bgColor = cookie.get('topBarColor') ? cookie.get('topBarColor') : skin.colors[this.props.store.common.topBarColorIndex];
    return template(this.state, this.props, this, {
      styles,
      bgColor,
      headerPic: require('../../images/pic-header.png'),
    });
  }
}
