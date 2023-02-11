import React, { Component } from 'react';
import AxiosClient from '../lib/AxiosClient';
import { dateToTimeString, dateToDateString, numToPaddedText } from '../lib/DateUtil'
import axios from "axios";

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

// TODO: configure this in a JSON file, using seaperate MESH
/**
 * [
 *    {
 *      organization: '龙城高级中学',
 *      id: '234535de24235da678252ff',
 *      scenes: [
 *        {id: '63dcbd467578b047b751ce3a'},
 *        ...
 *      ]
 *    },
 *    {
 *      organization: '深圳大学计算机系',
 *      id: '234535de24fe5da678256c2ff',
 *      scenes: [
 *        {id: '63dcbd467578b047b751ce3a'},
 *        ...
 *      ]
 *    }
 * ]
 */
const classRooms = [
  { id: '63dcbd467578b047b751ce3a', pm: 237, refrg: 186, rm: [227, 229] }, //大一班
  { id: '63dcbd8c7578b047b751ef40', pm: 236, refrg: 187, rm: [223, 228] }, //大二班
  { id: '63dce0407578b047b7639f9b', pm: 234, refrg: 188, rm: [222, 224] }, //大三班
  { id: '63dcf0057578b047b76beb0e', pm: 235, refrg: 189, rm: [225, 226] }, //大四班
];

const getSingleDataName = dataInfoStr => {
  if (dataInfoStr.indexOf(':') < 0) {
    return '';
  }
  const arDataInfo = dataInfoStr.split(':');
  if (arDataInfo.length !== 2) {
    return '';
  }
  return arDataInfo[0];
};

const getSingleDataValueString = dataInfoStr => {
  if (dataInfoStr.indexOf(':') < 0) {
    return dataInfoStr;
  }
  const arDataInfo = dataInfoStr.split(':');
  if (arDataInfo.length !== 2) {
    return "";
  }
  return arDataInfo[1];
};

const getSingleDataValueInt = dataInfoStr => {
  if (dataInfoStr.indexOf(':') < 0) {
    return parseInt(dataInfoStr);
  }
  const arDataInfo = dataInfoStr.split(':');
  if (arDataInfo.length !== 2) {
    return 0;
  }
  return parseInt(arDataInfo[1]);
};

const getSingleDataValueFloat = dataInfoStr => {
  if (dataInfoStr.indexOf(':') < 0) {
    return parseFloat(dataInfoStr).toFixed(2);
  }
  const arDataInfo = dataInfoStr.split(':');
  if (arDataInfo.length !== 2) {
    return 0;
  }
  return parseFloat(arDataInfo[1]);
};

const getMultDataValueString = dataInfoStr => {
  let outDataVals = [];

  if (dataInfoStr.indexOf(',') < 0) {
    return getSingleDataValueString(dataInfoStr);
  }

  let arDataEntries = dataInfoStr.split(',');
  outDataVals = arDataEntries.map((entry, index) => {
    return {
      name: getSingleDataName(entry),
      value: getSingleDataValueString(entry)
    };
  });
  return outDataVals;
}

const getMultDataValueFloat = dataInfoStr => {
  let outDataVals = [];

  if (dataInfoStr.indexOf(',') < 0) {
    return getSingleDataValueFloat(dataInfoStr);
  }

  let arDataEntries = dataInfoStr.split(',');
  outDataVals = arDataEntries.map((entry, index) => {
    return {
      name: getSingleDataName(entry),
      value: getSingleDataValueFloat(entry)
    };
  });
  return outDataVals;
}

const getMultDataValueInt = dataInfoStr => {
  let outDataVals = [];

  if (dataInfoStr.indexOf(',') < 0) {
    return getSingleDataValueFloat(dataInfoStr);
  }

  let arDataEntries = dataInfoStr.split(',');
  outDataVals = arDataEntries.map((entry, index) => {
    return {
      name: getSingleDataName(entry),
      value: getSingleDataValueInt(entry)
    };
  });
  return outDataVals;
}

const getChIndex = text => {
  let n = parseInt(text);

  if (!isNaN(n)) {
    return (n-1);
  }

  text = text.toLowerCase();
  if (text === 'a') {
    n = 0;
  }
  if (text === 'b') {
    n = 1;
  }
  if (text === 'c') {
    n = 2;
  }
  if (text === 'd') {
    n = 3;
  }
  if (text === 'e') {
    n = 4;
  }
  return n;
};

class MainView extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      // Time series data
      chTempChartData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ], //[[], [], []] 3-channel temp data
      chPowerChartData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ], //[[], [], [], [], []] 5-channel power (current * 220V) data
      envTempHumChartData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ], //[[], []] temp and humidity

      uvLightLogChartData: [], //[{datetime, duration}]
      chError: [], // [{ch: 0, err: false, type: null}, {ch: 1, err: true, type: 'over_current'}], type = 'over_current|over_temp|leak_current'
      leakCurrent: 0,
      alarmLogChartData: {
        leakCurrentCounts: 0,
        overCurrentCounts: 0,
        overTempCounts: 0
      },
      datetime: new Date(),
      currentClassRoomIndex: 0,
      currentClassRoomName: '',
      
      //Report from host heartbeat
      sceneInfo: null//{ address: '深圳市，龙岗区，建新路，建新幼儿园', loc: [321.2221, 156.354], tel: '86-755-8432124' }
    };
    this.state = this.initialState;
    this.tickDatetime = this.tickDatetime.bind(this);
    this.tickData = this.tickData.bind(this);
    this.refreshChart = this.refreshChart.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
    this.tickDataCount = 0;
    this.tickRoomCount = 0;
    this.historyChartsData = {
      '63dcbd467578b047b751ce3a': {
        chTempChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], []] 3-channel temp data
        chPowerChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], [], [], []] 5-channel power (current * 220V) data
        envTempHumChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], []] temp and humidity
      },
      '63dcbd8c7578b047b751ef40': {
        chTempChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], []] 3-channel temp data
        chPowerChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], [], [], []] 5-channel power (current * 220V) data
        envTempHumChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], []] temp and humidity
      },
      '63dce0407578b047b7639f9b': {
        chTempChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], []] 3-channel temp data
        chPowerChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], [], [], []] 5-channel power (current * 220V) data
        envTempHumChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], []] temp and humidity
      },
      '63dcf0057578b047b76beb0e': {
        chTempChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], []] 3-channel temp data
        chPowerChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], [], [], [], []] 5-channel power (current * 220V) data
        envTempHumChartData: [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ], //[[], []] temp and humidity
      }
    };
  }

  componentDidMount() {
    this.timerIDData = setInterval(
      () => this.tickDatetime(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerIDData);
    clearInterval(this.timerIDDatetime);
  }

  // Using this room data to update the charts
  refreshChart(roomData) {
    const devices = roomData.devices;

    let leakCurrent = 0;
    let totalCurrent = 0;
    let status = 0;
    let pm25 = 0;
    let powerData = this.state.chPowerChartData;
    let tempData = this.state.chTempChartData;
    let envTempHumData = this.state.envTempHumChartData;

    devices.forEach(device => {
      if (device.devType === 'pm_sensor') {
        pm25 = getSingleDataValueFloat(device.dataInfo);
      }
      if (device.devType === 'modbus_temp') {
        let chTempValue = getSingleDataValueFloat(device.dataInfo);
        if (chTempValue < -30) { // TODO: Modbus reason
          chTempValue = 0;
        }

        const chTempName = getSingleDataName(device.dataInfo);
        const pos = chTempName.lastIndexOf('_');
        const chIndex = getChIndex(chTempName.substring(pos + 1));

        if (chIndex > 0 && chIndex < tempData.length) {
          const newTempData = [...tempData[chIndex]]; //Must use object copy instead assignment
          newTempData.push(chTempValue);
          if (newTempData.length > 24) {
            newTempData.shift();
          }
          tempData[chIndex] = newTempData;
        }
      }
      if (device.devType === 'refrg_temp_hum_sensor' && device.devId === `RTH.${classRooms[this.state.currentClassRoomIndex].refrg}`) {
        let envTemp = 0;
        let envHum = 0;
        const arTempHumValPairs = getMultDataValueFloat(device.dataInfo);
        for (const pair of arTempHumValPairs) {
          if (pair.name.indexOf('TEMP') > 0 && pair.value !== 0) {
            envTemp = pair.value;
          }
          if (pair.name.indexOf('HUMI') > 0 && pair.value !== 0) {
            envHum = pair.value;
          }
        }

        console.log('New temp and hum value: ', envTemp, ', ', envHum);

        const envTempData = [...envTempHumData[0]];
        const envHumData = [...envTempHumData[1]];
        envTempData.push(envTemp);
        if (envTempData.length > 24) {
          envTempData.shift();
        }
        envHumData.push(envHum);
        if (envHumData.length > 24) {
          envHumData.shift();
        }
        envTempHumData[0] = envTempData;
        envTempHumData[1] = envHumData;
      }
      if (device.devType === 'modbus_relay') {

      }
      if (device.devType === 'modbus_current') {
        totalCurrent += getSingleDataValueFloat(device.dataInfo);
      }
      if (device.devType === 'modbus_error_ch') { //TODO: Record all errors for all channels
        if (getSingleDataValueInt(device.dataInfo)) {
          status = 1;
        }
      }
      if (device.devType === 'modbus_leak_current') {
        leakCurrent = getSingleDataValueFloat(device.dataInfo);
      }
    });

    let newCurrentData = [...powerData[0]];
    let newPowerData = [...powerData[1]];
    newCurrentData.push(totalCurrent);
    if (newCurrentData.length > 24) {
      newCurrentData.shift();
    }
    newPowerData.push(totalCurrent * 220);
    if (newPowerData.length > 24) {
      newPowerData.shift();
    }
    powerData[0] = newCurrentData;
    powerData[1] = newPowerData;

    this.setState({
      currentClassRoomName: roomData.name,
      leakCurrent: leakCurrent,
      chTempChartData: tempData,
      chPowerChartData: powerData,
      envTempHumChartData: envTempHumData
    });
  }

  // Update the data behind the current view, no need to deep-copy, just save data
  refreshHistory(roomData) {
    const devices = roomData.devices;

    let totalCurrent = 0;
    let tempData = this.historyChartsData[roomData._id].chTempChartData;
    let powerData = this.historyChartsData[roomData._id].chPowerChartData;
    let envTempHumData = this.historyChartsData[roomData._id].envTempHumChartData;

    devices.forEach(device => {
      if (device.devType === 'modbus_temp') {
        let chTempValue = getSingleDataValueFloat(device.dataInfo);
        if (chTempValue < -30) { // TODO: Modbus reason
          chTempValue = 0;
        }

        const chTempName = getSingleDataName(device.dataInfo);
        const pos = chTempName.lastIndexOf('_');
        const chIndex = getChIndex(chTempName.substring(pos + 1));

        if (chIndex >= 0 && chIndex < tempData.length) {
          let newTempData = tempData[chIndex];
          newTempData.push(chTempValue);
          if (newTempData.length > 24) {
            newTempData.shift();
          }
        }
      }
      if (device.devType === 'refrg_temp_hum_sensor') {
        let envTemp = 0;
        let envHum = 0;
        const arTempHumValPairs = getMultDataValueFloat(device.dataInfo);
        for (const pair of arTempHumValPairs) {
          if (pair.name.indexOf('TEMP') > 0 && pair.value !== 0) {
            envTemp = pair.value;
          }
          if (pair.name.indexOf('HUMI') > 0 && pair.value !== 0) {
            envHum = pair.value;
          }
        }

        const envTempData = envTempHumData[0];
        const envHumData = envTempHumData[1];
        envTempData.push(envTemp);
        if (envTempData.length > 24) {
          envTempData.shift();
        }
        envHumData.push(envHum);
        if (envHumData.length > 24) {
          envHumData.shift();
        }
      }
      if (device.devType === 'modbus_current') {
        totalCurrent += getSingleDataValueFloat(device.dataInfo);
      }
    });

    let newCurrentData = powerData[0];
    let newPowerData = powerData[1];
    newCurrentData.push(totalCurrent);
    if (newCurrentData.length > 24) {
      newCurrentData.shift();
    }
    newPowerData.push(totalCurrent * 220);
    if (newPowerData.length > 24) {
      newPowerData.shift();
    }
  }

  tickDatetime() {
    this.setState({
      datetime: new Date()
    });
    this.tickDataCount++;
    this.tickRoomCount++;

    if (this.tickRoomCount === 30) { //30 seconds
      console.log('Time to switch to the next classroom...');
      let newIndex = this.state.currentClassRoomIndex + 1;
      if (newIndex === classRooms.length) {
        newIndex = 0;
      }

      //Weather
      const weatherApiOptions = {
        method: 'GET',
        url: 'https://api.seniverse.com/v3/weather/now.json',
        params: {
          key: 'SYQCesWE45OfyUwJH',
          location: '22.736447:114.226381',
          language: 'zh-Hans',
          unit: 'c'
        }
      };
      axios.request(weatherApiOptions).then(function (response) {
        console.log('Weather data: ', response.data);
      }).catch(function (error) {
        console.error('Error while getting weather data: ', error);
      });

      this.setState({
        currentClassRoomIndex: newIndex,
        chTempChartData: [...this.historyChartsData[classRooms[newIndex].id].chTempChartData],
        chPowerChartData: [...this.historyChartsData[classRooms[newIndex].id].chPowerChartData],
        envTempHumChartData: [...this.historyChartsData[classRooms[newIndex].id].envTempHumChartData]
      });
      this.tickRoomCount = 0;
    }

    if (this.tickDataCount === 5) {
      this.tickData();
      this.tickDataCount = 0;
    }
  }

  tickData() {
    classRooms.forEach((room, index) => {
      AxiosClient.get(`/v1/scenes/${room.id}`)
        .then(res => {
          let resData = res.data;
          if (resData.state === 0) {
            this.refreshHistory(resData.data);
            if (index === this.state.currentClassRoomIndex) {
              this.refreshChart(resData.data);
            }
          }
          else {
            console.log('Failed to get class room: ' + resData.message);
          }
        }).catch(err => {
          console.log(err);
        });
    });

    // Logs for relay on and off (TO be implemented)
    this.setState({
      uvLightLogChartData: [
        { id: 0, time: '2022-01-23 21:00:00', duration: 62 },
        { id: 1, time: '2022-01-23 21:00:00', duration: 63 },
        { id: 2, time: '2022-01-23 21:00:00', duration: 61 },
        { id: 3, time: '2022-01-23 21:00:00', duration: 61 },
        { id: 4, time: '2022-01-23 21:00:00', duration: 64 },
        { id: 5, time: '2022-01-23 21:00:00', duration: 63 },
        { id: 6, time: '2022-01-23 21:00:00', duration: 62 },
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
        data: ['总电流'],
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
          data: [this.state.currentClassRoomName], //['大一班', '大二班', '大三班', '大四班']
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
          data: [30], // [702, 406, 664, 793],
          axisLabel: {
            formatter: (value, index) => {
              return `${value} mA`;
            },
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
          data: [((this.state.leakCurrent / 30) * 100).toFixed(2)], //[70, 34, 60, 78] for each classroom, leak
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
                style={{ height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
          </li>
          <li>
            <div className="bar">
              <div className="barbox">
                <ul className="clearfix">
                  <li className="pulll_left counter" style={{ color: '#ffeb7b', paddingTop: '0.1rem' }}>{numToPaddedText(classRooms.length)}</li>
                  <li className="pulll_left counter" style={{ color: '#ffeb7b' }}>{this.state.currentClassRoomName}</li>
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
              <div className='allnav' style={{ paddingTop: '0.2rem' }}>
                <div style={{ marginVertical: '4rem', height: '2.5rem' }}>
                  <div style={{
                    color: 'white', backgroundColor: 'green', display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    float: 'left', fontSize: '0.2rem',
                    height: '0.35rem', width: '0.35rem', borderRadius: '50%'
                  }}>{'优'}</div>
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
                          <tr key={`uvLog-${log.id}`} className={(index % 2 === 1) ? 'table_odd_row' : ''}>
                            <td>{index + 1}</td>
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
