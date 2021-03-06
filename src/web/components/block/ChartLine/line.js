import React, { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import tmpls from './line.t.html';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'flarej/lib/components/ECharts/lineChart';
import * as chart from '../chartConfig';

@registerTmpl('Line')
class Line extends Component {
  render() {
    const { refName, xAxis, legend, data, theme } = this.props;
    return tmpls.line(this.props, this, {
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
          trigger: 'axis',
          formatter: (params) => {
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
          data: xAxis,
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
            formatter: '{value}%'
          }
        }
      }
    });
  }
}

export default Line;
