import React, { Component } from 'react';

// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/component/visualMap';
// import 'echarts/lib/component/calendar';
// import 'flarej/lib/components/ECharts/barChart';
// import 'flarej/lib/components/ECharts/lineChart';
// import 'flarej/lib/components/ECharts/pieChart';
// import graphic from 'echarts/lib/util/graphic.js'

class Bar extends Component {

  componentDidMount() {}

  render() {
    const { ref, data, options, title } = this.props;

    return (
      <div>
         <h1>title == {title}</h1>
         <p>data = {data}<p>
      </div>
    );
  }
}

export default Bar;
