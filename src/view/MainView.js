import React, { Component } from 'react';
import AxiosClient from '../lib/AxiosClient';
import { dateToTimeString, dateToDateString } from '../lib/DateUtil'

import lbx from '../picture/lbx.png'
import jt from '../picture/jt.png'
import map from '../picture/map.png'
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

const myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
class MainView extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      chTempChartOption: {
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
      chPowerChartOption: {
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
      leakCurrentChartOption: {
        title: {
          text: '',
          x: 'center',
          textStyle: {
            color: '#FFF'
          },
          left: '6%',
          top: '10%'
        },
        //图标位置
        grid: {
          top: '20%',
          left: '32%'
        },
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          data: ['1号机', '2号机', '3号机', '4号机', '5号机'],
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
                backgroundColor: '#339911',
                color: '#fff',
                borderRadius: 15,
                // padding: 5,
                align: 'center',
                width: 15,
                height: 15
              },
            }
          },
        },
        {
          show: true,
          inverse: true,
          data: [702, 406, 664, 793, 505],
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
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [70, 34, 60, 78, 69],
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: function (params) {
                let num = myColor.length;
                return myColor[params.dataIndex % num]
              },
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}%'
            }
          },
        },
        {
          name: '框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [100, 100, 100, 100, 100],
          barWidth: 15,
          itemStyle: {
            normal: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              barBorderRadius: 15,
            }
          }
        }]
      },
      alarmLogChartOption: {
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
      envTempHumChartOption: {
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
      uvLightLogChartOption: {
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
    clearInterval(this.timerID);
  }

  tickDatetime() {
    this.setState({
      datetime: new Date()
    });
  }

  tickData() {
    // Fetch data

    // Update chart
    this.setState({
      chTempChartOption: {
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
      chPowerChartOption: {
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
      leakCurrentChartOption: {
        title: {
          text: '',
          x: 'center',
          textStyle: {
            color: '#FFF'
          },
          left: '6%',
          top: '10%'
        },
        //图标位置
        grid: {
          top: '20%',
          left: '32%'
        },
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          data: ['1号机', '2号机', '3号机', '4号机', '5号机'],
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
                backgroundColor: '#339911',
                color: '#fff',
                borderRadius: 15,
                // padding: 5,
                align: 'center',
                width: 15,
                height: 15
              },
            }
          },
        },
        {
          show: true,
          inverse: true,
          data: [702, 406, 664, 793, 505],
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
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [70, 34, 60, 78, 69],
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: function (params) {
                let num = myColor.length;
                return myColor[params.dataIndex % num]
              },
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}%'
            }
          },
        },
        {
          name: '框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [100, 100, 100, 100, 100],
          barWidth: 15,
          itemStyle: {
            normal: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              barBorderRadius: 15,
            }
          }
        }]
      },
      alarmLogChartOption: {
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
      envTempHumChartOption: {
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
      uvLightLogChartOption: {
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
      }
    });
  }

  render() {
    const { datetime } = this.state;
    const timeStr = dateToTimeString(datetime);
    const dateStr = dateToDateString(datetime);

    return (
      <div className="mainbox">
        <ul className="clearfix">
          <li>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">线路温度</div>
              <ReactECharts
                option={this.state.chTempChartOption}
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
                option={this.state.chPowerChartOption}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">漏电流</div>
              <ReactECharts
                option={this.state.leakCurrentChartOption}
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
                  <li className="pulll_left counter">04</li>
                  <li className="pulll_left counter">大（一）班</li>
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
            <div className="boxall" style={{ height: "1.5rem" }}>
              <div className="alltitle">报警记录</div>
              {/* <ReactECharts
                option={chartOptions[1]}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              */}
              <div className="boxfoot"></div>
            </div>
          </li>
          <li>
            <div className="boxall" style={{ height: "3.2rem" }}>
              <div className="alltitle">环境温湿度</div>
              <ReactECharts
                option={this.state.envTempHumChartOption}
                notMerge={true}
                lazyUpdate={true}
                className="allnav"
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "2.2rem" }}>
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
            <div className="boxall" style={{ height: "4.2rem" }}>
              <div className="alltitle">紫外灯消毒记录</div>
              <ReactECharts
                option={this.state.uvLightLogChartOption}
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
