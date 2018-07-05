import React, { Component } from 'react';
import { observable, computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react';
import { autobind } from 'core-decorators';

import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  PieChart, Pie, Sector, Cell,
  ComposedChart,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

import cookie from 'js-cookie';

// import nj from 'nornj';
// import { registerTmpl } from 'nornj-react';
//
import styles from './recharts.m.scss';
// import tmpls from './recharts.t.html';

// 页面容器组件
// @registerTmpl('Recharts')
@inject('store')
@observer
export default class Recharts extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { store: { recharts, common } } = this.props;
    // theme
    const cookieColor = cookie.get('themeColor') ? cookie.get('themeColor') : 'white';
    const skinColor = this.props.store.common.theme;
    const theme = cookie.get('themeColor') ? cookie.get('themeColor') : 'white';
    // console.log('theme', theme);

    const data = [
      {name: 'A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'G', uv: 3490, pv: 4300, amt: 2100},
    ];


    // pie
    const pieData = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                      {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    //
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
     	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        	{`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    const radarData = [
        { subject: 'Math', A: 120, B: 110, fullMark: 150 },
        { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
        { subject: 'English', A: 86, B: 130, fullMark: 150 },
        { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
        { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
        { subject: 'History', A: 65, B: 85, fullMark: 150 },
    ];

    return (
      <div className="pageMod">
        <div className="row">
           <ul className={styles.list}>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>

                   <LineChart width={420} height={300} data={data}
                          margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                     <XAxis dataKey="name"/>
                     <YAxis/>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <Tooltip/>
                     <Legend />
                     <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>

                  <BarChart width={420} height={300} data={data}
                        margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                     <XAxis dataKey="name"/>
                     <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                     <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                     <Tooltip/>
                     <Legend />
                     <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                     <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
                  </BarChart>
                </div>
             </li>
             <li className="col-4">
                <div className="wrapMod">
                  <div className="titleMod">
                      <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                  </div>

                  <AreaChart width={430} height={300} data={data}
                        margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
                    <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                    <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
                  </AreaChart>
                </div>
             </li>
             <li className="col-4">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                 </div>
                 <PieChart width={430} height={300} onMouseEnter={this.onPieEnter}>
                   <Pie
                     data={pieData}
                     cx={220}
                     cy={120}
                     labelLine={false}
                     label={renderCustomizedLabel}
                     outerRadius={120}
                     fill="#8884d8"
                   >
                     {
                       pieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                     }
                   </Pie>
                 </PieChart>

               </div>
            </li>
            <li className="col-4">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                 </div>

                 <RadarChart cx={220} cy={130} outerRadius={110} width={430} height={300} data={radarData}>
                   <PolarGrid />
                   <PolarAngleAxis dataKey="subject" />
                   <PolarRadiusAxis angle={30} domain={[0, 150]}/>
                   <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                   <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
                   <Legend />
                 </RadarChart>

               </div>
            </li>
            <li className="col-4">
               <div className="wrapMod">
                 <div className="titleMod">
                     <h2><ant-Icon type="area-chart" /><span>图表展示</span></h2>
                 </div>
                 <ComposedChart width={430} height={300} data={data}
                     margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                   <CartesianGrid stroke='#f5f5f5'/>
                   <XAxis dataKey="name"/>
                   <YAxis />
                   <Tooltip />
                   <Legend />
                   <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
                   <Bar dataKey='pv' barSize={20} fill='#413ea0' />
                   <Line type='monotone' dataKey='uv' stroke='#ff7300' />
                </ComposedChart>

               </div>
            </li>
           </ul>
        </div>
      </div>
    );
    // return tmpls.recharts(this.state, this.props, this, {
    //   styles,
    //   recharts,
    //   data,
    // });
  }
}
