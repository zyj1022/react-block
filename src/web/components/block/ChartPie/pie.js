import React, { Component } from 'react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import tmpls from './pie.t.html';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/calendar';
import 'flarej/lib/components/ECharts/pieChart';
import * as chart from '../chartConfig';

@registerTmpl('Pie')
class Pie extends Component {
  render() {
    const { refName, title, legend, data } = this.props;
    return tmpls.pie(this.props, this, {
      optionConfig: {
        color: chart.colors,
        grid: {
          left: '3%',
          right: '3%',
          top: 0,
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)',
          formatter: function(params) {
            var result = `<div>${params.name}</div>`;
            result += `<div>
                         <span>${params.seriesName}:</span>
                         <span>${params.seriesName == '属性2' ? '' : '(' + params.data.value + ')'} ${params.percent}%</span>
                     </div>`;
            return result;
          }
        },
        toolbox: { show: false },
        legend: {
          left: 'center',
          data: legend
        }
      }
    });
  }
}

export default Pie;
