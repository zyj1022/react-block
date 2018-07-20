import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';


import styles from './buttons.m.scss';
import tmpls from './buttons.t.html';

// 页面容器组件
@registerTmpl('Buttons')
@inject('store')
@observer
export default class Buttons extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { store: { buttons } } = this.props;
    return tmpls.container(this.state, this.props, this, {
      styles,
      buttons
    });
  }
}
