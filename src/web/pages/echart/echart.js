import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';

import styles from './echart.m.scss';
import tmpls from './echart.t.html';

import Echarts from 'react-echarts-packet'

import { lineOptions, option } from './data/line'
import { barOptions } from './data/bar'
import { horizontalOptions } from './data/horizontalBar'
import { mixedOptions } from './data/mixed'
import { radarOptions } from './data/radar'
import { pieOptions } from './data/pie'
import { doughnutOptions } from './data/Doughnut'
import { scatterOptions } from './data/Scatter'
import { bubbleOptions } from './data/bubble'
import { riverOptions } from './data/river'

// 页面容器组件
@registerTmpl('Echart')
@inject('store')
@observer
export default class Echart extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { store: { echart } } = this.props;
    return (
      <div className="pageMod">
        <div className="row">
           <ul className={styles.list}>
             <li className="col-6">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                 </div>
                 <div className={styles.chartBox}>
                   <Echarts {...barOptions}/>
                 </div>
               </div>
            </li>
            <li className="col-6">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                 </div>
                 <div className={styles.chartBox}>
                   <Echarts {...horizontalOptions}/>
                 </div>
               </div>
            </li>
            <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                  </div>
                  <div className={styles.chartBox}>
                    <Echarts {...mixedOptions}/>
                  </div>
                </div>
             </li>
             <li className="col-4">
                 <div className="wrapMod">
                   <div className="titleMod">
                       <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                   </div>
                   <div className={styles.chartBox}>
                     <Echarts {...radarOptions}/>
                   </div>
                 </div>
              </li>
              <li className="col-4">
                  <div className="wrapMod">
                    <div className="titleMod">
                        <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                    </div>
                    <div className={styles.chartBox}>
                      <Echarts {...pieOptions}/>
                    </div>
                  </div>
               </li>
               <li className="col-4">
                   <div className="wrapMod">
                     <div className="titleMod">
                         <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                     </div>
                     <div className={styles.chartBox}>
                       <Echarts {...doughnutOptions}/>
                     </div>
                   </div>
                </li>
                <li className="col-4">
                    <div className="wrapMod">
                      <div className="titleMod">
                          <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                      </div>
                      <div className={styles.chartBox}>
                        <Echarts {...scatterOptions}/>
                      </div>
                    </div>
                 </li>
                 <li className="col-4">
                     <div className="wrapMod">
                       <div className="titleMod">
                           <h2><ant-Icon type="area-chart" /><span>Chart</span></h2>
                       </div>
                       <div className={styles.chartBox}>
                         <Echarts {...bubbleOptions}/>
                       </div>
                     </div>
                  </li>
           </ul>
        </div>
      </div>
    );
    // return tmpls.echart(this.state, this.props, this, {
    //   styles,
    //   echart
    // });
  }
}
