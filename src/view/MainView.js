import React, { Component } from 'react';
import AxiosClient from '../lib/AxiosClient';
import { dateToTimeString, dateToDateString } from '../lib/DateUtil'

import lbx from '../picture/lbx.png'
import jt from '../picture/jt.png'
import map from '../images/layout-hgk-kindergarten.png'//'../picture/map.png'
import weatherImg from '../images/weather_img01.png';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/lib/echarts';

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

const myColor = ['#33cc33', '#ff0000'];//['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
class MainView extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      chTempChartData: [[], [], []], //[[], [], []] 3-channel temp data
      chPowerChartData: [[], [], [], [], []], //[[], [], [], [], []] 5-channel power (current * 220V) data
      leakCurrent: 0,
      alarmLogChartData: {
        leakCurrentCounts: 0,
        overCurrentCounts: 0,
        overTempCounts: 0
      },
      envTempHumChartData: [[], []], //[[], []] temp and humidity
      uvLightLogChartData: [], //[{datetime, duration}]
      datetime: new Date()
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.timerIDData = setInterval(
      () => this.tickDatetime(),
      1000
    );
    this.timerIDDatetime = setInterval(
      () => this.tickData(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerIDData);
    clearInterval(this.timerIDDatetime);
  }

  tickDatetime() {
    this.setState({
      datetime: new Date()
    });
  }

  tickData() {
    this.setState({
      chTempChartData: [
        [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4],
        [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4],
        [7, 1, 2, 4, 9, 5, 11, 8, 2, 9, 6, 4, 5, 3, 13, 6, 3, 4, 3, 6, 2, 6, 2, 6]
      ],
      chPowerChartData: [
        [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4],
        [3, 4, 7, 1, 3, 9, 10, 6, 5, 4, 8, 4, 2, 4, 3, 4, 9, 7, 5, 6, 3, 1, 10, 6],
        [2, 5, 3, 4, 7, 4, 8, 11, 2, 3, 2, 4, 9, 4, 4, 4, 3, 8, 3, 2, 1, 7, 5, 2],
        [1, 5, 3, 3, 3, 7, 3, 6, 2, 12, 2, 4, 9, 4, 3, 4, 6, 4, 3, 9, 2, 5, 2, 6],
        [5, 3, 10, 4, 6, 4, 12, 6, 2, 7, 2, 4, 8, 4, 3, 5, 3, 4, 9, 6, 3, 4, 1, 8]
      ],
      leakCurrent: 5,
      alarmLogChartData: {
        leakCurrentCounts: 1,
        overCurrentCounts: 2,
        overTempCounts: 2
      },
      envTempHumChartData: [
        [1, 4, 7, 2, 5, 4, 9, 12, 2, 4, 8, 4, 3, 5, 3, 4, 1, 4, 3, 5, 2, 9, 2, 4],
        [3, 4, 3, 4, 3, 4, 3, 13, 2, 4, 1, 4, 3, 8, 3, 6, 3, 4, 3, 9, 2, 4, 7, 11]
      ],
      uvLightLogChartData: [
        {id: 0,  time: '2022-01-23 21:00:00', duration: 62 },
        {id: 1,  time: '2022-01-23 21:00:00', duration: 63 },
        {id: 2,  time: '2022-01-23 21:00:00', duration: 61 },
        {id: 3,  time: '2022-01-23 21:00:00', duration: 61 },
        {id: 4,  time: '2022-01-23 21:00:00', duration: 64 },
        {id: 5,  time: '2022-01-23 21:00:00', duration: 63 },
        {id: 6,  time: '2022-01-23 21:00:00', duration: 62 },
      ]
    });
  }

  render() {
    const { datetime } = this.state;
    const timeStr = dateToTimeString(datetime);
    const dateStr = dateToDateString(datetime);

    const chTempChartOption = {
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
        data: ['总线路', '空调', '插座'],
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
          name: '总线路',
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
          data: this.state.chTempChartData[0]
        },
        {
          name: '空调',
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
          data: this.state.chTempChartData[1]
        },
        {
          name: '插座',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: '#ffa31a',
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
              color: '#ffa31a',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: this.state.chTempChartData[2]
        },
      ]
    };
    const chPowerChartOption = {
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
        data: ['总电流', '总电量'],
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
          name: '总电流',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: '#33cc33',
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
              color: '#33cc33',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: this.state.chPowerChartData[0]
        },
        {
          name: '总电量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: '#ffa31a',
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
              color: '#ffa31a',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: this.state.chPowerChartData[1]
        },
      ]
    };
    const leakCurrentChartOption = {
      title: {
        text: '',
        x: 'center',
        textStyle: {
          color: '#FFF'
        },
        left: '6%',
        top: '10%'
      },
      grid: {
        top: '20%',
        left: '32%'
      },
      xAxis: {
        show: false
      },
      yAxis: [
      {
        show: true,
        data: ['大一班'], //['大一班', '大二班', '大三班', '大四班']
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          formatter: (value, index) => {
            return [
              `{lg|${index + 1}}  ` + '{title|' + value + '} '
            ].join('\n')
          },
          rich: {
            lg: {
              backgroundColor: '#ff00ff',
              color: '#fff',
              borderRadius: 15,
              // padding: 5,
              align: 'center',
              width: 18,
              height: 18
            },
          }
        },
      },
      {
        show: true,
        inverse: true,
        data: [30], // [702, 406, 664, 793], per
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: '#fff',
          },
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },

      }],
      series: [
        {
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [((this.state.leakCurrent/30) * 100).toFixed(2)], //[70, 34, 60, 78] for each classroom, leak
          barWidth: 20,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: function (params) {
                return myColor[0]; //this.state.leakCurrent < 15 && this.state.leakCurrent > 0 ? myColor[0] : myColor[1]
              },
            }
          },
          label: {
            normal: {
              show: true,
              color: 'rgb(255, 255, 255, .8)',
              position: 'top',
              formatter: '{c}%'
            }
          },
        },
        {
          name: '框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [100],
          barWidth: 25,
          itemStyle: {
            normal: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              barBorderRadius: 15,
            }
          }
        }
    ]
    };
    const alarmLogChartOption = {
      color: ['#1affff', '#ffcc99', '#cc0066'],
      tooltip: {
        show: true,
        formatter: "{a} : {c} "   //TODO: show the correct value (real = value / 2)
      },
      legend: {
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12,
        // bottom: '3%',
        data: ['漏电流', '过流', '高温'],
        textStyle: {
          color: 'rgba(255,255,255,.6)',
        }
      },
      series: [
        {
          name: '漏电流',
          type: 'pie',
          clockWise: false,
          center: ['50%', '42%'],
          radius: ['21%', '30%'],
          itemStyle: dataStyle,
          hoverAnimation: true,
          data: [{
            value: this.state.alarmLogChartData.leakCurrentCounts * 2, //Show with scaled twice, this assuming the count not >= (100/2=50)
            name: '01'
          }, {
            value: 100 - this.state.alarmLogChartData.leakCurrentCounts * 2,
            name: 'invisible',
            tooltip: { show: false },
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: '过流',
          type: 'pie',
          clockWise: false,
          center: ['50%', '42%'],
          radius: ['31%', '40%'],
          itemStyle: dataStyle,
          hoverAnimation: true,
          data: [{
            value: this.state.alarmLogChartData.overCurrentCounts * 2,
            name: '02'
          }, {
            value: 100 - this.state.alarmLogChartData.overCurrentCounts * 2,
            name: 'invisible',
            tooltip: { show: false },
            itemStyle: placeHolderStyle
          }]
        },
        {
          name: '高温',
          type: 'pie',
          clockWise: false,
          hoverAnimation: true,
          center: ['50%', '42%'],
          radius: ['41%', '50%'],
          itemStyle: dataStyle,
          data: [{
            value: this.state.alarmLogChartData.overTempCounts * 2,
            name: '03'
          }, {
            value: 100 - this.state.alarmLogChartData.overTempCounts * 2,
            name: 'invisible',
            tooltip: { show: false },
            itemStyle: placeHolderStyle
          }]
        }
        ]
    };
    const envTempHumChartOption = {
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
        data: ['温度', '湿度'],
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
      },
      {
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
          name: '温度',
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
          data: this.state.envTempHumChartData[0]
        },
        {
          name: '湿度',
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
          data: this.state.envTempHumChartData[1]
        },
      ]
    };

    return (
      <div className="mainbox">
        <ul className="clearfix">
          <li>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">线路温度</div>
              <ReactECharts
                option={chTempChartOption}
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
                option={chPowerChartOption}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "1.7rem" }}>
              <div className="alltitle">漏电流</div>
              <ReactECharts
                option={leakCurrentChartOption}
                notMerge={true}
                lazyUpdate={true}
                style={{height: '100%'}}
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
          </li>
          <li>
            <div className="bar">
              <div className="barbox">
                <ul className="clearfix">
                  <li className="pulll_left counter" style={{color: '#ffeb7b'}}>04</li>
                  <li className="pulll_left counter" style={{color: '#ffeb7b'}}>大（一）班</li>
                </ul>
              </div>
              <div className="barbox2">
                <ul className="clearfix">
                  <li className="pulll_left">教室总数</li>
                  <li className="pulll_left">当前教室</li>
                </ul>
              </div>
            </div>
            <div className="map">
              <div className="map1"><img src={lbx} alt="lbx" /></div>
              <div className="map2"><img src={jt} alt="jt" /></div>
              <div className="map3"><img src={map} alt="map" /></div>
              {/* <div className="map4" id="map_1"></div> */}
            </div>
            <div className="boxall" style={{ height: "2.65rem" }}>
              <div className="alltitle">报警记录</div>
              <ReactECharts
                option={alarmLogChartOption}
                notMerge={true}
                lazyUpdate={true}
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
          </li>
          <li>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">环境温湿度</div>
              <ReactECharts
                option={envTempHumChartOption}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "1.55rem" }}>
              <div className="alltitle">空气质量</div>
              <div className='allnav' style={{paddingTop: '0.2rem'}}>
                <div style={{ marginVertical: '4rem', height: '2.5rem'}}>
                  <div style={{
                    color: 'white', backgroundColor: 'green', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    float: 'left', fontSize: '0.2rem',
                    height: '0.35rem', width: '0.35rem', borderRadius: '50%' }}>{'优'}</div>
                  <div className="data">
                    <p className="time">{timeStr}</p>
                    <p>{dateStr}</p>
                  </div>
                  <div className="weather">
                    <img id="weatherImg" src={weatherImg} alt="" />
                    <div id="weather">
                      <p className="active">多云</p>
                      <p>16-22℃</p>
                      <p>深圳市龙岗区</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.36rem" }}>
              <div className="alltitle">紫外灯消毒记录</div>
              <div class="main_table t_btn3">
                <table>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>时间</th>
                      <th>持续时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.uvLightLogChartData.map((log, index) => {
                        return (
                          <tr key={`uvLog-${log.id}`} className={ (index%2 === 1) ? 'table_odd_row' : ''  }>
                            <td>{index+1}</td>
                            <td>{log.time}</td>
                            <td>{log.duration}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="boxfoot"></div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}


export default MainView;
