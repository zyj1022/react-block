import React, { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';

import tmpls from './radar.t.html';

import echarts from 'echarts/lib/echarts';

import 'flarej/lib/components/ECharts/radarChart';

import * as chart from '../chartConfig';

@registerTmpl('Radar')
class Radar extends Component {
  render() {
    const { refName, radar, legend, data } = this.props;
    return tmpls.radar(this.props, this, {
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
        radar: radar
      }
    });
  }
}

export default Radar;
