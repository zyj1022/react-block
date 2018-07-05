import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';

import styles from './chartjs.m.scss';
import tmpls from './chartjs.t.html';

import { Line, Bar, Radar, Doughnut, Pie, PolarArea, Bubble, Scatter, HorizontalBar  } from 'rechartjs'

import {lineData, lineOptions} from './data/line'
import {barData, barOptions} from './data/bar'
import {horizontalData, horizontalOptions} from './data/HorizontalBar'
import {mixedData, mixedOptions} from './data/mixed'
import {radarData, radarOptions} from './data/radar'
import {pieData, pieOptions} from './data/pie'
import {doughnutData, doughnutOptions} from './data/Doughnut'
import {polarAreaData, polarAreaOptions} from './data/PolarArea'
import {scatterData, scatterOptions} from './data/Scatter'
import {bubbleData, bubbleOptions} from './data/bubble'

// 页面容器组件
@registerTmpl('Chartjs')
@inject('store')
@observer
export default class Chartjs extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { store: { chartjs } } = this.props;
    return (
      <div className="pageMod">
        <div className="row">
           <ul className={styles.list}>
             <li className="col-6">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                 </div>
                 <div className={styles.chartBox}>
                   <Bubble data={bubbleData} options={bubbleOptions}/>
                 </div>
               </div>
            </li>
            <li className="col-6">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                 </div>
                 <div className={styles.chartBox}>
                   <Scatter data={scatterData} options={scatterOptions}/>
                 </div>
               </div>
            </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <Bar data={barData} options={barOptions} />
                  </div>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <Line data={lineData}  options={lineOptions} />
                  </div>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <Doughnut data={doughnutData} options={doughnutOptions}/>
                  </div>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <Radar data={radarData} options={radarOptions} />
                  </div>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <Pie data={pieData} options={pieOptions}/>
                  </div>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <PolarArea data={polarAreaData} options={polarAreaOptions} />
                  </div>
                </div>
             </li>
           </ul>
        </div>
      </div>
    );
    // return tmpls.container(this.state, this.props, this, {
    //   styles,
    //   chartjs,
    //   bar: Bar,
    //   line: Line,
    //   barData,
    //   barOptions,
    // });
  }
}
