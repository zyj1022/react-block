import React, { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';

import tmpls from './baseArea.t.html';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'flarej/lib/components/ECharts/lineChart';

import * as chart from '../chartConfig';

@registerTmpl('BaseArea')
class BaseArea extends Component {
  render() {
    const { refName, xAxis, legend, data } = this.props;
    return tmpls.baseArea(this.props, this, {
      optionConfig: {
        color: chart.colors,
        grid: {
          left: '3%',
          right: '4%',
          top: '15%',
          bottom: '5%',
          containLabel: true
        },
        legend: {
          show: true,
          left: 'center',
          top: 0,
          data: legend
        },
        tooltip: {
          show: true,
          trigger: 'axis'
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
            },
            rotate: 30,
            interval: 0
          },
          data: xAxis
        },
        yAxis: {
          type: 'value',
        }
      }
    });
  }
}

export default BaseArea;
