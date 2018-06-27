import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import cookie from 'js-cookie';

import 'flarej/lib/components/antd/input';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/checkbox';
import 'flarej/lib/components/antd/datepicker';
import 'flarej/lib/components/antd/cascader';

import Message from 'flarej/lib/components/antd/message';
import Notification from 'flarej/lib/components/antd/notification';

// import styles from './analysis.m.scss';
import tmpls from './analysis.t.html';

import { Bar, Pie, Line, Footer, BaseArea,
  ChartCard, Radar, Theme } from '../../components/block';

// 页面容器组件
@registerTmpl('Analysis')
@inject('store')
@observer
export default class Analysis extends Component {

  componentDidMount() {
    const { store: { analysis, monitor } } = this.props;
    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      this.props.store.monitor.getBarSubCategoryData(),
      this.props.store.monitor.getSubCategoryData(),
      this.props.store.monitor.getSummaryData(),
      this.props.store.monitor.getGrowthData(),
      this.props.store.monitor.getTableSubCategoryData(),
      this.props.store.monitor.getBrandCompareList(),
      this.props.store.monitor.getBrandCompareItemForCategory()
    ]).then(() => {
      closeLoading();
    });
  }

  @autobind
  onSearch() { }

  @computed
  get barData() {
    const {
      store: { monitor }
    } = this.props;
    return [
      {
        name: '属性1',
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: 20,
          }
        },
        data: toJS(
          monitor.barSubCategoryData &&
          monitor.barSubCategoryData[0].map(item => (item * 100).toFixed(2))
        )
      },
      {
        name: '属性2',
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: 20,
          }
        },
        data: toJS(
          monitor.barSubCategoryData &&
          monitor.barSubCategoryData[1].map(item => (item * 100).toFixed(2))
        )
      }
    ];
  }

  @computed
  get pieData() {
    const {
      store: { monitor }
    } = this.props;
    let _data1 = [],
      _data2 = [];
    if (this.props.store.monitor.pieSubCategoryData) {
      this.props.store.monitor.pieSubCategoryData[0].forEach((item, i) => {
        _data1.push({
          value: (item / 10000).toFixed(2),
          name: this.props.store.monitor.pieSubCategoryData[2][i]
        });
      });
      this.props.store.monitor.pieSubCategoryData[1].forEach((item, i) => {
        _data2.push({
          value: (item / 10000).toFixed(2),
          name: this.props.store.monitor.pieSubCategoryData[2][i]
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

  @computed get lineData() {
    return [{
        name: '属性1',
        type: 'line',
        data: toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[0].map(item => (item * 100).toFixed(2)))
      },
      {
        name: '属性2',
        type: 'line',
        data: toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[1].map(item => (item * 100).toFixed(2)))
      }
    ];
  };

  @computed get pieCircleData() {
    return [
      {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
  }

  @computed get baseAreaData() {
    return [
      {
          name: '属性1',
          data: toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[0].map(item => (item * 100).toFixed(2))),
          type: 'line',
          smooth: true,
          areaStyle: {}
      },
      {
          name: '属性2',
          data: toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[1].map(item => (item * 100).toFixed(2))),
          type: 'line',
          smooth: true,
          areaStyle: {}
      }
    ]
  }

  @computed get radarData() {
    return [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '属性1'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '属性2'
            }
        ]
    }]
  }

  @computed get radar() {
    return {
        // shape: 'circle',
        name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#7ac6ff',
              borderRadius: 3,
              padding: [3, 5]
           }
        },
        indicator: [
           { name: '销售', max: 6500},
           { name: '管理', max: 16000},
           { name: '信息技术', max: 30000},
           { name: '客服', max: 38000},
           { name: '研发', max: 52000},
           { name: '市场', max: 25000}
        ]
    }
  }

  render() {
    const { store: { analysis, monitor, common } } = this.props;
    const cookieColor = cookie.get('themeColor') ? cookie.get('themeColor') : 'white';
    const skinColor = this.props.store.common.theme;

    return tmpls.container(this.props, this, {
      analysis,
      theme: cookie.get('themeColor') ? cookie.get('themeColor') : 'white',
      barXAxis: toJS(monitor.barSubCategoryData && monitor.barSubCategoryData[2]),
      barLegend: ['属性1', '属性2'],
      pieLegend: toJS(monitor.pieSubCategoryData && monitor.pieSubCategoryData[2]),
      lineLegend: ['属性1', '属性2'],
      lineXAxis: toJS(monitor.salesRatesData && monitor.salesRatesData[2]),
      pieCircleLegend: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
      ChartCard,
      baseAreaLegend: ['属性1', '属性2'],
      baseAreaXAxis: toJS(monitor.barSubCategoryData && monitor.barSubCategoryData[2]),
      radarLegend: ['属性1', '属性2']
    });
  }
}
