import React, { Component } from 'react';

import lbx from '../picture/lbx.png'
import jt from '../picture/jt.png'
import map from '../picture/map.png'

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/lib/echarts';

import mapInit from '../lib/MapUtil';

const dataStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    //shadowBlur: 40,
    //shadowColor: 'rgba(40, 40, 40, 1)',
  }
};

const placeHolderStyle = {
  normal: {
    color: 'rgba(255,255,255,.05)',
    label: { show: false, },
    labelLine: { show: false }
  },
  emphasis: {
    color: 'rgba(0,0,0,0)'
  }
};


class MainView extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      //Order: 1 -> 2 -> 5 -> 4 -> 6 -> 31 -> 32 -> 
      chartOptions: [
        {
          //  backgroundColor: '#00265f',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
              },
            },
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              }
            }
          }],
          series: [
            {
              type: 'bar',
              data: [200, 300, 300, 900, 1500, 1200, 600],
              barWidth: '35%',
              // barGap: 1, //柱子之间间距
              itemStyle: {
                normal: {
                  color: '#2f89cf',
                  opacity: 1,
                  barBorderRadius: 5,
                }
              }
            }

          ]
        },
        {
          //  backgroundColor: '#00265f',
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Area 6', 'Area 7'],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
              },
            },
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              }
            }
          }],
          series: [
            {
              type: 'bar',
              data: [1500, 1200, 600, 200, 300, 300, 900],
              barWidth: '35%',
              // barGap: 1,
              itemStyle: {
                normal: {
                  color: '#27d08a',
                  opacity: 1,
                  barBorderRadius: 5,
                }
              }
            }
          ]
        },
        {
          //  backgroundColor: '#00265f',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },

          grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Area 6', 'Area 7', 'Area 8'],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
              },
            },
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              }
            }
          }],
          series: [{
            type: 'bar',
            data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
            barWidth: '35%',
            // barGap: 1,
            itemStyle: {
              normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
              }
            }
          }
          ]
        },
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#dddc6b'
              }
            }
          },
          legend: {
            top: '0%',
            data: ['安卓', 'IOS'],
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: '12',
            }
          },
          grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }

            },

            data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

          }, {

            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
          }],
          yAxis: [{
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },

            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }],
          series: [
            {
              name: '空调',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  color: '#ef0425',
                  width: 2
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
              },
              itemStyle: {
                normal: {
                  color: '#0184d5',
                  borderColor: 'rgba(221, 220, 107, .1)',
                  borderWidth: 12
                }
              },
              data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
            },
            {
              name: 'Category B',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {

                normal: {
                  color: '#00d887',
                  width: 2
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                }
              },
              itemStyle: {
                normal: {
                  color: '#00d887',
                  borderColor: 'rgba(221, 220, 107, .1)',
                  borderWidth: 12
                }
              },
              data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

            },

          ]
        },
        {
          color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
          tooltip: {
            show: true,
            formatter: "{a} : {c} "
          },
          legend: {
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            bottom: '3%',

            data: ['City 1', 'City 2', 'City 3', 'City 4', 'City 5'],
            textStyle: {
              color: 'rgba(255,255,255,.6)',
            }
          },

          series: [
            {
              name: 'State A',
              type: 'pie',
              clockWise: false,
              center: ['50%', '42%'],
              radius: ['59%', '70%'],
              itemStyle: dataStyle,
              hoverAnimation: false,
              data: [{
                value: 80,
                name: '01'
              }, {
                value: 20,
                name: 'invisible',
                tooltip: { show: false },
                itemStyle: placeHolderStyle
              }]
            },
            {
              name: 'State B',
              type: 'pie',
              clockWise: false,
              center: ['50%', '42%'],
              radius: ['49%', '60%'],
              itemStyle: dataStyle,
              hoverAnimation: false,
              data: [{
                value: 70,
                name: '02'
              }, {
                value: 30,
                name: 'invisible',
                tooltip: { show: false },
                itemStyle: placeHolderStyle
              }]
            },
            {
              name: 'State C',
              type: 'pie',
              clockWise: false,
              hoverAnimation: false,
              center: ['50%', '42%'],
              radius: ['39%', '50%'],
              itemStyle: dataStyle,
              data: [{
                value: 65,
                name: '03'
              }, {
                value: 35,
                name: 'invisible',
                tooltip: { show: false },
                itemStyle: placeHolderStyle
              }]
            },
            {
              name: 'State D',
              type: 'pie',
              clockWise: false,
              hoverAnimation: false,
              center: ['50%', '42%'],
              radius: ['29%', '40%'],
              itemStyle: dataStyle,
              data: [{
                value: 60,
                name: '04'
              }, {
                value: 40,
                name: 'invisible',
                tooltip: { show: false },
                itemStyle: placeHolderStyle
              }]
            },
            {
              name: 'State E',
              type: 'pie',
              clockWise: false,
              hoverAnimation: false,
              center: ['50%', '42%'],
              radius: ['20%', '30%'],
              itemStyle: dataStyle,
              data: [{
                value: 50,
                name: '05'
              }, {
                value: 50,
                name: 'invisible',
                tooltip: { show: false },
                itemStyle: placeHolderStyle
              }]
            },]
        },
        {
          title: [{
            text: 'Distribution by XXXX',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }

          }],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: function (p) {
              return [p[0] + 10, p[1] - 10];
            }
          },
          legend: {

            top: '70%',
            itemWidth: 10,
            itemHeight: 10,
            data: ['0', '20-29', '30-39', '40-49', '50+'],
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: '12',
            }
          },
          series: [
            {
              name: 'Distribution by B',
              type: 'pie',
              center: ['50%', '42%'],
              radius: ['40%', '60%'],
              color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
              label: { show: false },
              labelLine: { show: false },
              data: [
                { value: 1, name: '<0' },
                { value: 4, name: '20-29' },
                { value: 2, name: '30-39' },
                { value: 2, name: '40-49' },
                { value: 1, name: '>50' },
              ]
            }
          ]
        },
        {
          title: [{
            text: 'Distribution by C',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }

          }],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: function (p) {
              return [p[0] + 10, p[1] - 10];
            }
          },
          legend: {

            top: '70%',
            itemWidth: 10,
            itemHeight: 10,
            data: ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Others'],
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: '12',
            }
          },
          series: [
            {
              name: 'Distribution by D',
              type: 'pie',
              center: ['50%', '42%'],
              radius: ['40%', '60%'],
              color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
              label: { show: false },
              labelLine: { show: false },
              data: [
                { value: 5, name: 'Area 1' },
                { value: 1, name: 'Area 2' },
                { value: 6, name: 'Area 3' },
                { value: 2, name: 'Area 4' },
                { value: 1, name: 'Area 5' },
                { value: 1, name: 'Area 6' },
              ]
            }
          ]
        },
        {
          title: [{
            text: 'Distribution by E',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }

          }],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: function (p) {
              return [p[0] + 10, p[1] - 10];
            }
          },
          legend: {
            top: '70%',
            itemWidth: 10,
            itemHeight: 10,
            data: ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Others'],
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: '12',
            }
          },
          series: [
            {
              name: 'Distribution by F',
              type: 'pie',
              center: ['50%', '42%'],
              radius: ['40%', '60%'],
              color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
              label: { show: false },
              labelLine: { show: false },
              data: [
                { value: 2, name: 'Area 1' },
                { value: 3, name: 'Area 2' },
                { value: 1, name: 'Area 3' },
                { value: 4, name: 'Area 4' },
                { value: 8, name: 'Area 5' },
                { value: 1, name: 'Others' },
              ]
            }
          ]
        }
      ],
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    //Charts, tables, api setup
    //today_registers
    //this_month_active_users
    //today_device_starts
    //functionality_usage
    //user_accumulated_usage_time
    //user_install_mean_errors
    //user_install_current_errors
    // axios.post('http://vdbxxxxxxxxxxxx').then(SetState());
  }

  componentWillUnmount() {
    //Clear the data, disconnect from server
  }

  render() {
    const { chartOptions } = this.state;

    return (
      <div className="mainbox">
        <ul className="clearfix">
          <li>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">线路温度</div>
              <ReactECharts
                option={chartOptions[3]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">实时用电量</div>
              <ReactECharts
                option={chartOptions[3]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">漏电</div>
              <ReactECharts
                option={chartOptions[1]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
          </li>
          <li>
            <div className="bar">
              <div className="barbox">
                <ul className="clearfix">
                  <li className="pulll_left counter">12581189</li>
                  <li className="pulll_left counter">3912410</li>
                </ul>
              </div>
              <div className="barbox2">
                <ul className="clearfix">
                  <li className="pulll_left">Total xxxx in 2018 </li>
                  <li className="pulll_left">Total yyyy in 2018</li>
                </ul>
              </div>
            </div>
            <div className="map">
              <div className="map1"><img src={lbx} alt="lbx" /></div>
              <div className="map2"><img src={jt} alt="jt" /></div>
              <div className="map3"><img src={map} alt="map" /></div>
              {/* <div className="map4" id="map_1"></div> */}
            </div>
          </li>
          <li>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">环境温湿度</div>
              <ReactECharts
                option={chartOptions[3]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">空气质量</div>
              <ReactECharts
                option={chartOptions[2]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">紫外灯消毒记录</div>
              <ReactECharts
                option={chartOptions[4]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}


export default MainView;
