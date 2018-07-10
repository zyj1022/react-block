import React, { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';

import tmpls from './bar.t.html';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/calendar';
import 'flarej/lib/components/ECharts/barChart';
import graphic from 'echarts/lib/util/graphic.js';

import * as chart from '../chartConfig';

@registerTmpl('ec-Bar')
export default class Bar extends Component {

  render() {
    const { refName, xAxis, legend, data, theme} = this.props;

    return tmpls.bar(this.props, this, {
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
        xAxis: {
          type: 'category',
          boundaryGap: true,
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
            },
            rotate: 30,
            interval: 0
          },
          data: xAxis
        },
        yAxis: {
          type: 'value',
          scale: true,
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
            },
            formatter: `{value}%`
          }
        },
        series: [
          {
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
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0.5,
                    color: 'rgba(97, 109, 211, .3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, .2)'
                  }
                ])
              }
            }
          }
        ]
      }
    });
  }
}
