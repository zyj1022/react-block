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
    const { refName, radar, legend, data, theme } = this.props;
    return tmpls.radar(this.props, this, {
      optionConfig: {
        color: theme && theme==='dark' ? chart.darkColors : chart.colors,
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
          data: legend,
          textStyle: {
            color: theme && theme==='dark' ? chart.darkTextStyle : chart.whiteTextStyle
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        toolbox: { show: false },
        radar: {
          name: {
              textStyle: {
                color: theme && theme==='dark' ? chart.darkTextStyle : chart.whiteTextStyle,
             }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: theme && theme==='dark' ? chart.darkLineStyle : chart.whiteLineStyle
            }
          },
          axisLine: {
            lineStyle: {
              color: theme && theme==='dark' ? chart.darkLineStyle : chart.whiteLineStyle
            }
          },
          axisLabel: {
            textStyle: {
              color: theme && theme==='dark' ? chart.darkTextStyle : chart.whiteTextStyle
            }
          },
          splitArea: {
            show: false
          },
          indicator: radar
        }
      }
    });
  }
}

export default Radar;
