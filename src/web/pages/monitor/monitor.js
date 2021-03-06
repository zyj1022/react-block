import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import cookie from 'js-cookie';

import 'flarej/lib/components/antd/radio';
import 'flarej/lib/components/antd/button';
import 'flarej/lib/components/antd/cascader';
import 'flarej/lib/components/antd/datePicker';
import 'flarej/lib/components/antd/checkbox';
import 'flarej/lib/components/antd/pagination';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/calendar';
import 'flarej/lib/components/ECharts/barChart';
import 'flarej/lib/components/ECharts/lineChart';
import 'flarej/lib/components/ECharts/pieChart';

import Message from 'flarej/lib/components/antd/message';
import Notification from 'flarej/lib/components/antd/notification';
import graphic from 'echarts/lib/util/graphic.js'
import { autobind } from 'core-decorators';
import styles from './monitor.m.scss';
import tmpls from './monitor.t.html';

import * as chart from '../../components/block/chartConfig';

//页面容器组件
@inject('store')
@observer
@registerTmpl('Monitor')
export default class Monitor extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onSearch()
  }

  @autobind
  onSearch() {
    const closeLoading = Message.loading('正在获取数据...', 0)
    Promise.all([
      this.props.store.monitor.getSummaryData(),
      this.props.store.monitor.getGrowthData(),
      this.props.store.monitor.getSubCategoryData(),
      this.props.store.monitor.getBarSubCategoryData(),
      this.props.store.monitor.getTableSubCategoryData(),
      this.props.store.monitor.getBrandCompareList(),
      this.props.store.monitor.getBrandCompareItemForCategory()
    ]).then(() => {
      this.props.store.monitor.clearCompareDockData();
      closeLoading();
    });
  }

  render() {
    const { store: { analysis, monitor, common } } = this.props;
    const cookieColor = cookie.get('themeColor') ? cookie.get('themeColor') : 'white';
    const skinColor = this.props.store.common.theme;

    return tmpls.monitor(this.state, this.props, this, {
      styles,
      monitor,
      theme: cookie.get('themeColor') ? cookie.get('themeColor') : 'white',
    });
  }
}

@registerTmpl('evalSummaryMonitor')
@inject('store')
@observer
class EvalSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {}

  render() {
    const { store: { monitor } } = this.props;
    return tmpls.evalSummary(this.state, this.props, this, {
      styles,
      monitor
    });
  }
}


@registerTmpl('totalCompareMonitor')
@inject('store')
@observer
class TotalCompare extends Component {

  @observable switchIndex = 'a';

  @observable showMode = '';

  componentDidMount() {
    this.showMode = true;
  }

  @computed get salesOptions() {
    return {
      color:chart.colors,
      grid: {
        left: '0',
        right: '4%',
        top: '15%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        data: this.showMode === null ? ['属性1'] : ['属性1', '属性2']
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params) => {
          if (this.showMode === 'viewDataRoleLine') {
            params = params.slice(0, 1);
          }
          var result = `<div>${params[0].name}</div>`;
          params.forEach(function(item) {
            result += `<div>
                           <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                           <span>${item.seriesName}:</span>
                           <span>${item.data || '--'}</span>
                       </div>`;
          });
          return result
        }
      },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          }
        },
        data: toJS(this.props.store.monitor.salesData && this.props.store.monitor.salesData[2])
      },
      yAxis: {
        show: false,
        type: 'value',
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          }
        }
      }
    };
  }

  @computed get salesData() {
    const lineData = toJS(this.props.store.monitor.salesData && this.props.store.monitor.salesData[1].map(item => (item / 10000).toFixed(2)))
    return [{
        name: '属性1',
        type: 'bar',
        barWidth: '30px',
        data: toJS(this.props.store.monitor.salesData && this.props.store.monitor.salesData[0].map(item => (item / 10000).toFixed(2)))
      },
      {
        name: '属性2',
        type: 'line',
        data: this.showMode === null ? [] : lineData
      }
    ];
  };

  @computed get salesRatesOptions() {
    console.log('salesRatesOptions', toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[2]))
    return {
      color:chart.colors,
      grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        data: this.showMode === null ? ['属性1'] : ['属性1', '属性2']
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params) => {
          if (this.showMode === 'viewDataRoleLine') {
            params = params.slice(0, 1);
          }
          var result = `<div>${params[0].name}</div>`;
          params.forEach(function(item) {
            result += `<div>
                           <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                           <span>${item.seriesName}:</span>
                           <span>${item.data || '--'}%</span>
                       </div>`;
          });
          return result
        }
      },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          }
        },
        data: toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[2])
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          },
          formatter: '{value}%'
        }
      }
    };
  };

  @computed get salesRatesData() {
    const lineData = toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[0].map(item => (item * 100).toFixed(2)));
    console.log('salesRatesData', lineData);
    return [{
        name: '属性1',
        type: 'line',
        data: toJS(this.props.store.monitor.salesRatesData && this.props.store.monitor.salesRatesData[0].map(item => (item * 100).toFixed(2)))
      },
      {
        name: '属性2',
        type: 'line',
        data: this.showMode === null ? [] : lineData
      }
    ];
  };

  @computed get growthOptions() {
    let dataX = [],
      unit = '';
    switch (this.switchIndex) {
      case 'a':
        dataX = toJS(this.props.store.monitor.growthDataUV && this.props.store.monitor.growthDataUV[2]);
        unit = '%';
        break;
      case 'b':
        dataX = toJS(this.props.store.monitor.growthDataUVConvert && this.props.store.monitor.growthDataUVConvert[2]);
        unit = '%'
        break;
      case 'c':
        dataX = toJS(this.props.store.monitor.growthDataUser && this.props.store.monitor.growthDataUser[2]);
        unit = '%';
        break;
      case 'd':
        dataX = toJS(this.props.store.monitor.growthDataPrice && this.props.store.monitor.growthDataPrice[2]);
        unit = '';
        break;
    }
    return {
      color:chart.colors,
      grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        data: this.showMode === null ? ['属性1'] : ['属性1', '属性2']
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params) => {
          if (this.showMode === 'viewDataRoleLine') {
            params = params.slice(0, 1);
          }
          var result = `<div>${params[0].name}</div>`;
          params.forEach(function(item) {
            result += `<div>
                            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                            <span>${item.seriesName}:</span>
                            <span>${item.data || '--'}${unit}</span>
                        </div>`;
          });
          return result
        }
      },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          }
        },
        data: dataX
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          },
          formatter: `{value}${unit}`
        }
      }
    };
  };

  @computed get growthData() {
    let data1 = [],
      data2 = [];
    switch (this.switchIndex) {
      case 'a':
        data1 = toJS(this.props.store.monitor.growthDataUV && this.props.store.monitor.growthDataUV[0].map(item => (item * 100).toFixed(2)));
        data2 = toJS(this.props.store.monitor.growthDataUV && this.props.store.monitor.growthDataUV[1].map(item => (item * 100).toFixed(2)));
        break;
      case 'b':
        data1 = toJS(this.props.store.monitor.growthDataUVConvert && this.props.store.monitor.growthDataUVConvert[0].map(item => (item * 100).toFixed(2)));
        data2 = toJS(this.props.store.monitor.growthDataUVConvert && this.props.store.monitor.growthDataUVConvert[1].map(item => (item * 100).toFixed(2)));
        break;
      case 'c':
        data1 = toJS(this.props.store.monitor.growthDataUser && this.props.store.monitor.growthDataUser[0].map(item => (item * 100).toFixed(2)));
        data2 = toJS(this.props.store.monitor.growthDataUser && this.props.store.monitor.growthDataUser[1].map(item => (item * 100).toFixed(2)));
        break;
      case 'd':
        data1 = toJS(this.props.store.monitor.growthDataPrice && this.props.store.monitor.growthDataPrice[0].map(item => (item).toFixed(2)));
        data2 = toJS(this.props.store.monitor.growthDataPrice && this.props.store.monitor.growthDataPrice[1].map(item => (item).toFixed(2)));
        break;
    }
    return [{
        name: '属性1',
        type: 'line',
        data: data1
      },
      {
        name: '属性2',
        type: 'line',
        data: this.showMode === null ? [] : data2
      }
    ];
  };

  constructor(props) {
    super(props);
  }

  @autobind
  onGrowthTypeChange(e) {
    this.switchIndex = e.target.value
  }

  render() {
    const { store: { monitor } } = this.props;
    return tmpls.totalCompare(this.state, this.props, this, {
      styles,
      monitor
    });
  }
}

@registerTmpl('categoryCompareMonitor')
@inject('store')
@observer
class CategoryCompare extends Component {

  @observable currentView = 1; // 1:'chart' | 2:'table'

  @computed get pieCategoryOptions() {
    return {
      color:chart.colors,
      grid: {
        left: '3%',
        right: '3%',
        top: 0,
        bottom: 0,
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b} : {c} ({d}%)",
        formatter: function(params) {
          var result = `<div>${params.name}</div>`;
          result += `<div>
                              <span>${params.seriesName}:</span>
                              <span>${params.seriesName == '属性2'? '' : '('+params.data.value+')'} ${params.percent}%</span>
                          </div>`;
          return result
        }
      },
      toolbox: { show: false },
      legend: {
        left: 'center',
        data: toJS(this.props.store.monitor.pieSubCategoryData && this.props.store.monitor.pieSubCategoryData[2])
      }
    };
  };

  @computed get pieCategoryData() {
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

    return [{
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
  };

  @computed get barCategoryOptions() {
    return {
      color:chart.colors,
      grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        data: ['属性1', '属性2']
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          },
          rotate: 30,
          interval: 0
        },
        data: toJS(this.props.store.monitor.barSubCategoryData && this.props.store.monitor.barSubCategoryData[2])
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          },
          formatter: `{value}%`
        }
      },
      series: [{
        name: '属性1',
        type: 'bar',
        smooth: true,
        itemStyle: {
          normal: {
            color: '#616dd3'
          }
        },
        lineStyle: {
          normal: {
            color: '#616dd3'
          }
        },
        areaStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [{
              offset: .5,
              color: 'rgba(97, 109, 211, .3)'
            }, {
              offset: 1,
              color: 'rgba(255, 255, 255, .2)'
            }])
          }
        }
      }]
    };
  };

  @computed get barCategoryData() {
    return [{
        name: '属性1',
        type: 'bar',
        data: toJS(this.props.store.monitor.barSubCategoryData && this.props.store.monitor.barSubCategoryData[0].map(item => (item * 100).toFixed(2)))
      },
      {
        name: '属性2',
        type: 'bar',
        data: toJS(this.props.store.monitor.barSubCategoryData && this.props.store.monitor.barSubCategoryData[1].map(item => (item * 100).toFixed(2)))
      }
    ];
  };

  @autobind
  switchView(index) {
    return (e) => {
      this.currentView = index;
    };
  }

  render() {
    const { store: { monitor } } = this.props;

    return tmpls.categoryCompare(this.state, this.props, this, {
      styles,
      monitor
    });
  }
}

@registerTmpl('brandCompareMonitor')
@inject('store')
@observer
class BrandCompare extends Component {

  @observable trendsChartVisible = false;
  @observable trendsChartDataX = [];
  @computed get trendsChartOptions() {
    return {
      color:chart.colors,
      grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        data: [this.showMode != null ? '属性2增长率' : null, '属性1增长率', '指标1']
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: (params) => {
          if (this.showMode === 'viewDataRoleLine') {
            params = params.slice(1);
          }
          var result = `<div>${params[0].name}</div>`;
          params.forEach((item) => {
            result += `<div>
                           <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${item.color}"></span>
                           <span>${item.seriesName}:</span>
                           <span>${item.data || '--'}${item.seriesName=='指标1'?'':'%'}</span>
                       </div>`;
          });
          return result
        }
      },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#333'
          }
        },
        data: toJS(this.trendsChartDataX)
      },
      yAxis: [{
          type: 'value',
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          }
        },
        {
          type: 'value',
          scale: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          }
        }
      ],
      series: [{
          name: '属性2增长率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          lineStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: .5,
                color: 'rgba(97, 109, 211, .3)'
              }, {
                offset: 1,
                color: 'rgba(255, 255, 255, .2)'
              }])
            }
          }
        },
        {
          name: '品牌增长率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          lineStyle: {
            normal: {
              color: '#616dd3'
            }
          },
          areaStyle: {
            normal: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [{
                offset: .5,
                color: 'rgba(97, 109, 211, .3)'
              }, {
                offset: 1,
                color: 'rgba(255, 255, 255, .2)'
              }])
            }
          }
        },
        {
          name: '指标1',
          type: 'bar',
          barWidth: '60%'
        }
      ]
    };
  };

  @observable trendsChartData = [{
      name: '属性2增长率',
      type: 'line',
      data: [],
      yAxisIndex: 1
    },
    {
      name: '属性1增长率',
      type: 'line',
      data: [],
      yAxisIndex: 1
    },
    {
      name: '指标1',
      type: 'bar',
      barWidth: '50px',
      data: []
    }
  ];

  @observable trendsChartTop = 1;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.showMode = true;
  }

  @autobind
  onBrandChecked(item) {
    return (e) => {
      if (e.target.checked) {
        this.props.store.monitor.setCompareDockVisible(true);
        if (this.props.store.monitor.compareDockData) {
          if (this.props.store.monitor.compareDockData.length + 1 < 5) {
            this.props.store.monitor.setChecked(item, true);
            this.props.store.monitor.setCompareDockData(item);
          } else {
            e.target.checked = false;
            Notification.error({ description: '最多可以对比三个品牌', duration: 2 });
          }
        } else {
          this.props.store.monitor.setChecked(item, true);
          this.props.store.monitor.setCompareDockData(item);
        }
      } else {
        this.props.store.monitor.setChecked(item, false);
        this.props.store.monitor.removeCompareDockData(item);
      }
    }
  }

  @autobind
  viewTrends(item, index) {
    return (e) => {
      this.trendsChartTop = index * 135 + index + 1 + (15 * index)
      setTimeout(() => {
        this.trendsChartVisible = true;
        this.trendsChartData[0].data = this.showMode === null ? [] : toJS(item.trendsData[0].map(item => parseFloat((item * 100).toFixed(2))));
        this.trendsChartData[1].data = toJS(item.trendsData[1].map(item => parseFloat((item * 100).toFixed(2))));
        this.trendsChartData[2].data = toJS(item.trendsData[2].map(item => parseFloat((item / 10000).toFixed(2))));
        this.trendsChartDataX = toJS(item.trendsData[3]);
      }, 300)
    }
  }

  @autobind
  closeTrendsChart() {
    this.trendsChartVisible = false
  }

  @autobind
  closeCompareTable() {
    this.props.store.monitor.setShowCompareTable(false);
    this.props.store.monitor.clearCompareDockData();
  }

  @autobind
  onPaging(page, pageSize) {
    const closeLoading = Message.loading('正在获取数据...', 0)
    Promise.all([
      this.props.store.monitor.getBrandCompareList()
    ]).then(() => {
      closeLoading();
    });
  }

  render() {
    const { store: { monitor } } = this.props;

    return tmpls.brandCompare(this.state, this.props, this, {
      styles,
      monitor
    });
  }
}

@registerTmpl('compareDockMonitor')
@inject('store')
@observer
class CompareDock extends Component {
  @autobind
  deleteCompareItem(item) {
    return (e) => {
      this.props.store.monitor.removeCompareDockData(item);
      this.props.store.monitor.setChecked(item, false);
    }
  }

  @autobind
  closeCompareDock() {
    this.props.store.monitor.setCompareDockVisible(false);
  }

  @autobind
  compareIt() {
    this.props.store.monitor.setShowCompareTable(true);
    this.props.store.monitor.setCompareDockVisible(false);
  }

  render() {
    const { store: { monitor } } = this.props;

    return tmpls.compareDock(this.state, this.props, this, {
      styles,
      monitor
    });
  }
}
