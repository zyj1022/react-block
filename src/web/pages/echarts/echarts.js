import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';


import Message from 'flarej/lib/components/antd/message';
import Notification from 'flarej/lib/components/antd/notification';

import styles from './echarts.m.scss';
import tmpls from './echarts.t.html';

import { Bar, Pie, Line, Footer, BaseArea,
  ChartCard, Radar} from '../../components/block';

// 页面容器组件
@registerTmpl('Echarts')
@inject('store')
@observer
export default class Echarts extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { store: { echarts } } = this.props;
    return tmpls.echarts(this.state, this.props, this, {
      styles,
      echarts
    });
  }
}
