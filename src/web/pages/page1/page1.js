import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';

import 'flarej/lib/components/antd/input';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/checkbox';
import 'flarej/lib/components/antd/datepicker';
import 'flarej/lib/components/antd/cascader';

import Message from 'flarej/lib/components/antd/message';
import Notification from '../../../utils/notification';

import styles from './page1.m.scss';
import tmpls from './page1.t.html';

import graphic from 'echarts/lib/util/graphic.js';

import { Bar, Pie, Footer } from '../../components/block';

//页面容器组件
@registerTmpl('Page1')
@inject('store')
@observer
export default class Page1 extends Component {
  componentDidMount() {
    const {
      store: { page1, page2 }
    } = this.props;
    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      this.props.store.page2.getBarSubCategoryData(),
      this.props.store.page2.getSubCategoryData()
    ]).then(() => {
      closeLoading();
    });
  }

  @autobind
  onSearch() {}

  @computed
  get barData() {
    const {
      store: { page2 }
    } = this.props;
    return [
      {
        name: '属性1',
        type: 'bar',
        data: toJS(
          page2.barSubCategoryData &&
            page2.barSubCategoryData[0].map(item => (item * 100).toFixed(2))
        )
      },
      {
        name: '属性2',
        type: 'bar',
        data: toJS(
          page2.barSubCategoryData &&
            page2.barSubCategoryData[1].map(item => (item * 100).toFixed(2))
        )
      }
    ];
  }

  @computed
  get pieData() {
    const {
      store: { page2 }
    } = this.props;
    let _data1 = [],
      _data2 = [];
    if (this.props.store.page2.pieSubCategoryData) {
      this.props.store.page2.pieSubCategoryData[0].forEach((item, i) => {
        _data1.push({
          value: (item / 10000).toFixed(2),
          name: this.props.store.page2.pieSubCategoryData[2][i]
        });
      });
      this.props.store.page2.pieSubCategoryData[1].forEach((item, i) => {
        _data2.push({
          value: (item / 10000).toFixed(2),
          name: this.props.store.page2.pieSubCategoryData[2][i]
        });
      });
    }

    return [
      {
        name: '属性2',
        radius: '40%',
        center: ['25%', '50%'],
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data: _data1,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '属性1',
        type: 'pie',
        radius: '40%',
        center: ['75%', '50%'],
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data: _data2,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ];
  }

  render() {
    const {
      store: { page1, page2 }
    } = this.props;
    return tmpls.container(this.props, this, {
      styles,
      page1,
      barXAxis: toJS(page2.barSubCategoryData && page2.barSubCategoryData[2]),
      barLegend: ['属性1', '属性2'],
      pieLegend: toJS(page2.pieSubCategoryData && page2.pieSubCategoryData[2])
    });
  }
}
