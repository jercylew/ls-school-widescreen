import React, { Component } from 'react';
import AxiosClient from '../lib/AxiosClient';
import { dateToTimeString, dateToDateString, numToPaddedText, dateToDateTimeString } from '../lib/DateUtil';
import { getAirQuality, getWeatherImage } from '../lib/WeatherUtils';
import { creatBall } from '../lib/WaterBall';
import axios from "axios";

import lbx from '../picture/lbx.png';
import jt from '../picture/jt.png';
import map from '../images/layout-hgk-kindergarten.png';
import camera_icon from '../images/camera.png';
import camera_state_bg from '../images/main_middle.png';
import temp_icon from '../images/temp_icon.png';
import humi_icon from '../images/humi_icon.png';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/lib/echarts';

import $ from 'jquery';

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

const myColor = ['#33cc33', '#ff0000'];
const nNumOfCamerasInView = 4;

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
  // { id: '63d8aa420b0dad2f9cb0cb8d', pm: 0, refrg: 0, rm: [0, 0] },
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
      camerasStatusData: [], //[{id, chaName, online}]
      cameraViewScrollIndex: 0,
      chError: [], // [{ch: 0, err: false, type: null}, {ch: 1, err: true, type: 'over_current'}], type = 'over_current|over_temp|leak_current'
      leakCurrent: 0,
      alarmLogChartData: {
        leakCurrentCounts: 21,   // For test
        overCurrentCounts: 10,   // For test
        overTempCounts: 13       // For test
      },
      datetime: new Date(),
      currentClassRoomIndex: 0,
      currentClassRoomName: '',

      weatherTemp: 0,
      weatherQuality: '',
      weatherQualityColor: '',
      weatherType: '',
      //Report from host heartbeat
      sceneInfo: null,//{ address: '深圳市，龙岗区，建新路，建新幼儿园', loc: [321.2221, 156.354], tel: '86-755-8432124' }
      alarmIconBlinkOn: false,
      classRoomStatus: classRooms.map((cr, index) => 0)
    };
    this.state = this.initialState;
    this.tickDatetime = this.tickDatetime.bind(this);
    this.tickData = this.tickData.bind(this);
    this.refreshChart = this.refreshChart.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
    this.tickWeather = this.tickWeather.bind(this);
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
      },
      '63d8aa420b0dad2f9cb0cb8d': {
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
    };
  }

  componentDidMount() {
    this.tickData();
    this.tickWeather();
    this.timerIDData = setInterval(
      () => this.tickDatetime(),
      1000
    );

    this.timerAlarmBlink = setInterval(() => {
      const newBlinkOn = !this.state.alarmIconBlinkOn;
      this.setState({
        alarmIconBlinkOn: newBlinkOn
      });
    }, 500);

    this.timerCameraStatusViewScroll = setInterval(
      () => this.tickCameraViewScrollIndex(),
      3000
    );

    // creatBall('rainfallOne', 60);
  }

  componentWillUnmount() {
    clearInterval(this.timerIDData);
    clearInterval(this.timerAlarmBlink);
    clearInterval(this.timerCameraStatusViewScroll);
  }

  // Using this room data to update the charts
  refreshChart(roomData, index) {
    const devices = roomData.devices;

    let leakCurrent = 0;
    let totalCurrent = 0;
    let status = 0;
    let pm25 = 0;
    let powerData = this.state.chPowerChartData;
    let tempData = this.state.chTempChartData;
    let envTempHumData = this.state.envTempHumChartData;

    if (roomData.online) {
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

          //Ignore 0 value, simply use the latest one
          if (Math.abs(envTemp) < 0.1) {
            envTemp = envTempData[23];
          }
          if (Math.abs(envHum) < 0.1) {
            envHum = envHumData[23];
          }

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
          totalCurrent += Math.abs(getSingleDataValueFloat(device.dataInfo));
        }
        if (device.devType === 'modbus_error_ch') { //TODO: Record all errors for all channels
          if (getSingleDataValueInt(device.dataInfo)) {
            status = 1;
          }
        }
        if (device.devType === 'modbus_leak_current') {
          leakCurrent = Math.abs(getSingleDataValueFloat(device.dataInfo));
        }
      });
    }
    else {
      status = 2;

      //env temp and env
      for (let i = 0;i < envTempHumData.length;i++) {
        const envTempHumValue = [...envTempHumData[i]];
        envTempHumValue.push(0);
        if (envTempHumValue.length > 24) {
          envTempHumValue.shift();
        }
        envTempHumData[i] = envTempHumValue;
      }

      //channel temp
      for (let i = 0;i < tempData.length;i++) {
        const newTempData = [...tempData[i]];
        newTempData.push(0);
        if (newTempData.length > 24) {
          newTempData.shift();
        }
        tempData[i] = newTempData;
      }
    }

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

    const rl = roomData.relayLogs.filter(l => l.relayId === 'modbus_relay_ttyS0_2_3' && l.ended).reverse();
    this.setState({
      currentClassRoomName: roomData.name, leakCurrent: leakCurrent, chTempChartData: tempData,
      chPowerChartData: powerData, envTempHumChartData: envTempHumData, weatherQuality: getAirQuality(pm25).text,
      weatherQualityColor: getAirQuality(pm25).color,
      uvLightLogChartData: rl.map((log, index) => {
        return {
          id: index,
          startTime: dateToDateTimeString(log.startTime),
          elapsed: log.elapsed.toFixed(2),
        }
      }),
      camerasStatusData: [
        { id: 0, name: '大一班教室', online: true },
        { id: 1, name: '大一班卫生间', online: true },
        { id: 2, name: '大一班午休室', online: false },
        { id: 3, name: '中一班教室', online: true },
        { id: 4, name: '中一班门口', online: false },
        { id: 5, name: '中一班午休室', online: true },
        { id: 6, name: '中一班回画室', online: true },
        { id: 7, name: '小三班教室', online: false },
        { id: 8, name: '小一班教室', online: true },
        { id: 9, name: '小一班教室', online: true },
        { id: 10, name: '小二班教室', online: true },
        { id: 11, name: '小三班教室', online: false },
        { id: 12, name: '行政楼财务', online: true },
        { id: 13, name: '教导处', online: false },
      ]
    });
  }

  // Update the data behind the current view, no need to deep-copy, just save data
  refreshHistory(roomData, index) {
    const devices = roomData.devices;

    let totalCurrent = 0;
    let tempData = this.historyChartsData[roomData._id].chTempChartData;
    let powerData = this.historyChartsData[roomData._id].chPowerChartData;
    let envTempHumData = this.historyChartsData[roomData._id].envTempHumChartData;

    let status = 0;
    if (roomData.online) {
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
        if (device.devType === 'refrg_temp_hum_sensor' && device.devId === `RTH.${classRooms[index].refrg}`) {
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

          //Ignore 0 value, simply use the latest one
          if (Math.abs(envTemp) < 0.1) {
            envTemp = envTempData[23];
          }
          if (Math.abs(envHum) < 0.1) {
            envHum = envHumData[23];
          }

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
          totalCurrent += Math.abs(getSingleDataValueFloat(device.dataInfo));
        }
        if (device.devType === 'modbus_error_ch') { //TODO: Record all errors for all channels
          if (getSingleDataValueInt(device.dataInfo)) {
            status = 1;
          }
        }
      });
    }
    else {
      status = 2;
      //env temp and env
      for (let i = 0;i < envTempHumData.length;i++) {
        const envTempHumValue = [...envTempHumData[i]];
        envTempHumValue.push(0);
        if (envTempHumValue.length > 24) {
          envTempHumValue.shift();
        }
        envTempHumData[i] = envTempHumValue;
      }

      //channel temp
      for (let i = 0;i < tempData.length;i++) {
        const newTempData = [...tempData[i]];
        newTempData.push(0);
        if (newTempData.length > 24) {
          newTempData.shift();
        }
        tempData[i] = newTempData;
      }
    }

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

    let updatedStatus = [...this.state.classRoomStatus];
    updatedStatus[index] = status;
    this.setState({
      classRoomStatus: updatedStatus
    })
  }

  tickDatetime() {
    this.setState({
      datetime: new Date(),
    });
    this.tickDataCount++;
    this.tickRoomCount++;

    if (this.tickRoomCount === 30) { //30 seconds
      console.log('Time to switch to the next classroom...');
      let newIndex = this.state.currentClassRoomIndex + 1;
      if (newIndex === classRooms.length) {
        newIndex = 0;
      }

      this.tickWeather();
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
            this.refreshHistory(resData.data, index);
            if (index === this.state.currentClassRoomIndex) {
              this.refreshChart(resData.data, index);
              //TODO: Update weather if not updated
            }
          }
          else {
            console.log('Failed to get class room: ' + resData.message);
          }
        }).catch(err => {
          console.log(err);
        });
    });
  }

  tickWeather() {
    const weatherApiOptions = {
      method: 'GET',
      url: 'https://api.seniverse.com/v3/weather/now.json',
      params: {
        key: 'SYQCesWE45OfyUwJH',
        location: '22.736447:114.226381', //TODO: From host report
        language: 'zh-Hans',
        unit: 'c'
      }
    };
    axios.request(weatherApiOptions).then(response => {
      console.log('Weather data: ', response.data);
      const weatherInfo = response.data;
      if (weatherInfo.results && weatherInfo.results.length > 0) {
        const result = weatherInfo.results[0];
        const nowInfo = result.now;
        // const location = result.location; //Not used so far

        this.setState({
          weatherTemp: nowInfo.temperature,
          weatherType: nowInfo.text
        });
      }
    }).catch(function (error) {
      console.error('Error while getting weather data: ', error);
    });
  }

  tickCameraViewScrollIndex() {
    let newIndex = this.state.cameraViewScrollIndex + 1;
    if (newIndex + nNumOfCamerasInView >= this.state.camerasStatusData.length) {
      newIndex = 0;
    }
    this.setState({
      cameraViewScrollIndex: newIndex
    });

    $(".message_scroll_box").animate({ marginTop: 72 }, 800,
      function () {
        $(".message_scroll_box").css({ marginTop: 0 });
        // Insert the last message on the top of the list
        $(".message_scroll_box .message_scroll:first").before($(".message_scroll_box .message_scroll:last"));
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
        data: ['总线路温度', '空调温度', '插座温度', '总电流'],
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
          name: '总线路温度',
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
              color: '#ef0425',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: this.state.chTempChartData[0]
        },
        {
          name: '空调温度',
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
          name: '插座温度',
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
                color: 'rgba(0, 126, 220, 0.4)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 221, 185, 0.1)'
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
        {
          name: '总电流',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              color: '#00FFFF',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 216, 105, 0.4)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 216, 105, 0.1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: '#00FFFF',
              borderColor: 'rgba(221, 220, 110, .1)',
              borderWidth: 12
            }
          },
          data: this.state.chPowerChartData[0]
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
          data: [(((this.state.leakCurrent) / 30) * 100).toFixed(2)], //[70, 34, 60, 78] for each classroom, leak
          barWidth: 20,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: (this.state.leakCurrent < 15 && this.state.leakCurrent > 0) ? myColor[0] : myColor[1],
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
    const fireControlWaterChartOption = {
      tooltip: {
          formatter: "{a} <br/>{c} {b}"
      },
      toolbox: {
          show: false,
          feature: {
              restore: {
                  show: true
              },
              saveAsImage: {
                  show: true
              }
          }
      },
      series: [
      // {
      //     name: '水池水位',
      //     type: 'gauge',
      //     center: ['25%', '50%'],
      //     z: 3,
      //     min: 0,
      //     max: 20,
      //     splitNumber: 10,
      //     radius: '50%',
      //     axisLine: {
      //         lineStyle: {
      //             color: [[0.2, '#7FFF00'], [0.8, '#00FFFF'], [1, '#FF0000']],
      //             width: 6
      //         }
      //     },
      //     axisTick: {
      //         length: 5,
      //         lineStyle: {
      //             color: 'auto'
      //         }
      //     },
      //     splitLine: {
      //         length: 20,
      //         lineStyle: {
      //             color: 'auto'
      //         }
      //     },
      //     pointer: {
      //         width: 2
      //     },
      //     title: {
      //         textStyle: {
      //             fontWeight: 'normal',
      //             color: '#fff',
      //             fontSize: 12,
      //             offsetCenter: ['15%', '-20%'],
      //         }
      //     },
      //     detail: {
      //         textStyle: {
      //             fontWeight: 'normal',
      //             fontSize: 12
      //         }
      //     },
      //     data: [{
      //         value: 1,
      //         name: '水池水位'
      //     }]
      // },
      {
          name: '喷淋水压',
          type: 'gauge',
          center: ['50%', '50%'],
          z: 3,
          min: 0,
          max: 8,
          splitNumber: 8,
          radius: '100%',
          axisLine: {
              lineStyle: {
                  color: [[0.2, '#7CFC00'], [0.8, '#00FFFF'], [1, '#FF0000']],
                  width: 6
              }
          },
          axisTick: {
              length: 15,
              lineStyle: {
                  color: 'auto'
              }
          },
          splitLine: {
              length: 20,
              lineStyle: {
                  color: 'auto'
              }
          },
          pointer: {
              width: 4
          },
          title: {
              textStyle: {
                  fontWeight: 'normal',
                  color: '#fff',
                  fontSize: 12,
              }
          },
          detail: {
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12
              }
          },
          data: [{
              value: 4,
              name: '喷淋水压（ MPa ）'
          }]
      },
      // {
      //     name: 'A相电压',
      //     type: 'gauge',
      //     center: ['10%', '60%'],
      //     radius: '35%',
      //     min: 0,
      //     max: 540,
      //     startAngle: 180,
      //     endAngle: 0,
      //     splitNumber: 2,
      //     axisLine: {
      //         lineStyle: {
      //             color: [[0.2, '#7CFC00'], [0.8, '#00FFFF'], [1, '#FF0000']],
      //             width: 4
      //         }
      //     },
      //     axisTick: {
      //         length: 12,
      //         lineStyle: {
      //             color: 'auto'
      //         }
      //     },
      //     splitLine: {
      //         length: 20,
      //         lineStyle: {
      //             color: 'auto'
      //         }
      //     },
      //     pointer: {
      //         width: 3
      //     },
      //     title: {
      //         offsetCenter: ['5%', '-20%'],
      //         color: '#fff',
      //         fontSize: 12,
      //     },
      //     detail: {
      //         textStyle: {
      //             fontSize: 12,
      //             fontWeight: 'normal'
      //         }
      //     },
      //     data: [{
      //         value: 270,
      //         name: 'A相电压'
      //     }]
      // },
      // {
      //     name: '剩余电流',
      //     type: 'gauge',
      //     center: ['80%', '60%'],
      //     radius: '35%',
      //     min: 0,
      //     max: 2,
      //     startAngle: 180,
      //     endAngle: 0,
      //     splitNumber: 2,
      //     axisLine: {
      //         lineStyle: {
      //             color: [[0.2, '#7CFC00'], [0.8, '#00FFFF'], [1, '#FF0000']],
      //             width: 4
      //         }
      //     },
      //     axisTick: {
      //         splitNumber: 5,
      //         length: 10,
      //         lineStyle: {
      //             color: 'auto'
      //         }
      //     },
      //     axisLabel: {
      //         formatter: function(v) {
      //             switch (v + '') {
      //             case '0':
      //                 return 'E';
      //             case '1':
      //                 return '1/2';
      //             case '2':
      //                 return 'F'
      //             }
      //         }
      //     },
      //     splitLine: {
      //         length: 15,
      //         lineStyle: {
      //             color: 'auto'
      //         }
      //     },
      //     pointer: {
      //         width: 2
      //     },
      //     title: {
      //         offsetCenter: ['5%', '35%'],
      //         color: '#fff',
      //         fontSize: 12,
      //     },
      //     detail: {
      //         show: false
      //     },
      //     data: [{
      //         value: 270,
      //         name: '剩余电流'
      //     }]
      // }
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
            <div className="boxall" style={{ height: "2.3rem" }}>
              <div className="alltitle">智能用电监测</div>
              <ReactECharts
                option={chTempChartOption}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            {/* <div className="boxall" style={{ height: "2.3rem" }}>
              <div className="alltitle">实时用电量</div>
              <ReactECharts
                option={chPowerChartOption}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div> */}
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
            <div className="boxall" style={{ height: "4.05rem" }}>
              <div className="alltitle">紫外灯消毒记录</div>
              <div className="main_table">
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
                      this.state.uvLightLogChartData.slice(0, 10).map((log, index) => {
                        return (
                          <tr key={`uvLog-${log.id}`} className={(index % 2 === 1) ? 'table_odd_row' : ''}>
                            <td>{index + 1}</td>
                            <td>{log.startTime}</td>
                            <td>{log.elapsed}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="boxfoot"></div>
            </div>
            {/* <div className="boxall" style={{ height: "4.2rem", display: 'none' }}>
              <div className="alltitle">视频监控</div>
              <div className="mini_table">
                <table>
                  <tbody>
                    {
                      this.state.camerasStatusData.slice(this.state.cameraViewScrollIndex,
                        this.state.cameraViewScrollIndex + nNumOfCamerasInView).map((camera, index) => {
                          return (
                            <tr key={`camera-${camera.id}`}>
                              <td style={{ width: '10%' }}><img src={camera_icon} alt="camera icon" height='25rem' width={'35rem'} /></td>
                              <td style={{ width: '20%', textAlign: 'left' }}>{camera.name}</td>
                              <td style={{ width: '70%', textAlign: 'center', color: camera.online ? 'green' : 'red' }}>
                                {camera.online ? '在线' : '离线'}
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
              <div className="boxfoot"></div>
            </div> */}
          </li>
          <li>
            <div className="bar" style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{ width: '45%' }}>
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
              <div className='allnav' style={{ width: '45%' }}>
                {/* <div style={{ marginVertical: '2rem'}}>
                  <div style={{
                    color: 'white', backgroundColor: this.state.weatherQualityColor, display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    float: 'left', fontSize: '0.15rem',
                    height: '0.35rem', width: '0.35rem', borderRadius: '50%'
                  }}>{this.state.weatherQuality}</div>
                  <div className="weather">
                    <img id="weatherImg" src={getWeatherImage(this.state.weatherType)} alt="" />
                    <div id="weather">
                      <p className="active">{this.state.weatherType}</p>
                      <p>{`${this.state.weatherTemp} ℃`}</p>
                      <p>深圳市龙岗区</p>
                    </div>
                  </div>
                </div> */}
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-end', marginTop: '0.2rem', marginBottom: '0.2rem' }}>
                  <div>
                    <img src={temp_icon} height={'40rem'} width={'40rem'} style={{
                      display: 'block', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }} alt='' />
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'yellow', fontSize: '13px' }}>{`温度：34℃`}</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}>
                    <img src={humi_icon} height={'40rem'} width={'40rem'} style={{
                      display: 'block', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }} alt='' />
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'yellow', fontSize: '13px' }}>{`湿度：54%`}</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: '0.18rem', marginRight: '0.1rem' }}>
                    <img src={getWeatherImage(this.state.weatherType)} height={'40rem'} width={'40rem'} style={{
                      display: 'block', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }} alt="" />
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: 'yellow', fontSize: '13px' }}>{this.state.weatherType}</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}>
                    <div style={{
                      color: 'white', backgroundColor: this.state.weatherQualityColor, display: 'flex',
                      justifyContent: 'center', alignItems: 'center',
                      float: 'left', fontSize: '0.15rem',
                      height: '0.35rem', width: '0.35rem', borderRadius: '50%'
                    }}>{this.state.weatherQuality}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="map">
              <div className="map1"><img src={lbx} alt="lbx" /></div>
              <div className="map2"><img src={jt} alt="jt" /></div>
              <div className="map3"><img src={map} alt="map" /></div>
              {
                classRooms.map((cr, index) => {
                  if (this.state.classRoomStatus[index] !== 0) {
                    return (
                      <div key={`alarmIcon-${cr.id}`}
                      className={this.state.alarmIconBlinkOn ? `alarmIconAbnormal${index + 1}` : `alarmIconNormal${index + 1}`}></div>
                    )
                  }
                  else {
                    return null;
                  }
                })
              }
              {/* <div className="map4" id="map_1"></div> */}
            </div>
            <div className="boxall" style={{ height: "2.65rem" }}>
              <div className="alltitle">视频监控</div>
              <div className="main_middle">
                <div className="main_middle_list">
                  <img src={camera_state_bg} alt='' />
                  <div className="main_list_title main_list_title1">总设备数量</div>
                  <span className="main_list_title_num main_list_title_num1">{this.state.camerasStatusData.length}</span>
                </div>
                <div className="main_middle_list">
                  <img src={camera_state_bg} alt='' />
                  <div className="main_list_title main_list_title2">在线数量</div>
                  <span className="main_list_title_num main_list_title_num2">12</span>
                </div>
                <div className="main_middle_list">
                  <img src={camera_state_bg} alt='' />
                  <div className="main_list_title main_list_title3">离线数量</div>
                  <span className="main_list_title_num main_list_title_num3">2</span>
                </div>
              </div>
              <div className="mini_table" style={{ marginTop: '5px' }}>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>位置</th>
                      <th>状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.camerasStatusData.slice(this.state.cameraViewScrollIndex,
                        this.state.cameraViewScrollIndex + nNumOfCamerasInView).map((camera, index) => {
                          return (
                            <tr key={`camera-${camera.id}`}>
                              <td style={{ width: '10%' }}><img src={camera_icon} alt="camera icon" height='25rem' width={'35rem'} /></td>
                              <td style={{ width: '20%', textAlign: 'left' }}>{camera.name}</td>
                              <td style={{ width: '70%', textAlign: 'center', color: camera.online ? 'green' : 'red' }}>
                                {camera.online ? '在线' : '离线'}
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
              <div className="boxfoot"></div>
            </div>
            {/* <div className="boxall" style={{ height: "2.83rem", display: 'flex', paddingBottom: '0.15rem',
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <div style={{ width: '100%', height: '100%'}}>
                <div className="alltitle">线路报警</div>
                <ReactECharts
                  option={alarmLogChartOption}
                  notMerge={true}
                  lazyUpdate={true}
                  style={{ height: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'none' }}>
                <div className="alltitle">消防报警</div>
                <div className="message_scroll_box" style={{marginTop: '5px'}}>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">打印机故障</span>
                      <span class="scroll_level scroll_level01">一级</span>
                      <a class="localize" href='/#'>{``}</a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title" href='/#'>一号主机</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg" href='/#'>一栋一区23楼</a>
                    </div>
                  </div>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">回路断路</span>
                      <span class="scroll_level scroll_level03">三级</span>
                      <a class="localize"></a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title">二号主机</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg">一栋二区5楼</a>
                    </div>
                  </div>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">电源断路</span>
                      <span class="scroll_level scroll_level02">四级</span>
                      <a class="localize"></a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title">主电箱</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg">行政办公楼203室</a>
                    </div>
                  </div>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">数据流量警示4</span>
                      <span class="scroll_level scroll_level01">五级</span>
                      <a class="localize"></a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title">下载大量视频</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg">教研楼4楼401室</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="boxfoot"></div>
            </div> */}
          </li>
          <li>
            <div className="boxall" style={{ height: "1.6rem", display: 'none' }}>
              <div className="alltitle">环境温湿度</div>
              <ReactECharts
                option={envTempHumChartOption}
                notMerge={true}
                lazyUpdate={true}
                style={{ height: '100%' }}
                opts={{ renderer: 'svg' }}
              />
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.1rem" }}>
              <div className="alltitle">消防</div>
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <div className="col-box1" style={{ width: '35%', height: '100%' }}>
                  <div className="col-title">水池水位</div>
                  <div className="col-main ">
                    <div className="yjxxtj-box">
                      <ul className="wgxc-box js-wgxcBox">
                        <li>
                          <div className="wgxc-bar"><span className="wgxc-sl-bar" style={{ height: '30%' }}></span></div>
                          <div className="wgxcName">{`52.44厘米`}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ReactECharts
                  option={fireControlWaterChartOption}
                  notMerge={true}
                  lazyUpdate={true}
                  style={{ width: '65%', height: '1.8rem' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
              
              {/* <div className="windBox">
                <div style={{ width: '33%', marginLeft: '4%' }}>
                  <p style={{ color: '#FFFFFF' }}>水池水位</p>
                  <p style={{ color: '#FFFFFF' }}><span className="currentSpeed" id="nowDay">23</span>{` 厘米`}</p>
                </div>
                <div style={{ width: '31%', marginLeft: '2%' }}>
                  <p style={{ color: '#FFFFFF' }}>喷淋水压</p>
                  <p style={{ color: '#FFFFFF' }}><span className="highestSpeed" id="highDay">46</span>{` 千帕`}</p>
                </div>
                <div style={{width: '30%'}}>
                  <div className="rainWrap" style={{ margin: '10px auto', textAlign: 'center' }}>
                    <canvas id="rainfallOne" ></canvas>
                  </div>
                </div>
              </div> */}
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "1.6rem" }}>
              <div className="alltitle">火灾自动报警监测</div>
              <div class="mapnav" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <ul>
                  <li>
                    <div>
                      <span style={{ color: 'white' }}>回路断路</span><p>12</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span style={{ color: 'white' }}>打印机故障</span>
                      <p>3</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span style={{ color: 'white' }}>软件复位</span>
                      <p>11</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span style={{ color: 'white' }}>丢失</span>
                      <p>2</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.36rem" }}>
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <div className="alltitle">实时告警</div> {/* 过流，过热，漏电流，消防报警事件等 */}
                <div className="message_scroll_box" style={{ marginTop: '5px' }}>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">打印机故障</span>
                      <span class="scroll_level scroll_level01">一级</span>
                      <a class="localize" href='/#'>{``}</a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title" href='/#'>一号主机</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg" href='/#'>一栋一区23楼</a>
                    </div>
                  </div>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">回路断路</span>
                      <span class="scroll_level scroll_level03">三级</span>
                      <a class="localize"></a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title">二号主机</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg">一栋二区5楼</a>
                    </div>
                  </div>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">电源断路</span>
                      <span class="scroll_level scroll_level02">四级</span>
                      <a class="localize"></a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title">主电箱</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg">行政办公楼203室</a>
                    </div>
                  </div>
                  <div className="message_scroll">
                    <div class="scroll_top">
                      <span class="scroll_title">数据流量警示4</span>
                      <span class="scroll_level scroll_level01">五级</span>
                      <a class="localize"></a>
                      <span class="scroll_timer">17-09-13/9:52</span>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_title">下载大量视频</a>
                    </div>
                    <div class="msg_cage">
                      <a class="localize_msg">教研楼4楼401室</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "1.55rem", display: 'none' }}>
              <div className="alltitle">空气质量</div>
              <div className='allnav' style={{ paddingTop: '0.2rem' }}>
                <div style={{ marginVertical: '4rem', height: '2.5rem' }}>
                  <div style={{
                    color: 'white', backgroundColor: this.state.weatherQualityColor, display: 'flex',
                    justifyContent: 'center', alignItems: 'center',
                    float: 'left', fontSize: '0.2rem',
                    height: '0.35rem', width: '0.35rem', borderRadius: '50%'
                  }}>{this.state.weatherQuality}</div>
                  <div className="data">
                    <p className="time">{timeStr}</p>
                    <p>{dateStr}</p>
                  </div>
                  <div className="weather">
                    <img id="weatherImg" src={getWeatherImage(this.state.weatherType)} alt="" />
                    <div id="weather">
                      <p className="active">{this.state.weatherType}</p>
                      <p>{`${this.state.weatherTemp} ℃`}</p>
                      <p>深圳市龙岗区</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="boxfoot"></div>
            </div>
            <div className="boxall" style={{ height: "3.36rem", display: 'none' }}>
              <div className="alltitle">紫外灯消毒记录</div>
              <div className="main_table">
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
                      this.state.uvLightLogChartData.slice(0, 7).map((log, index) => {
                        return (
                          <tr key={`uvLog-${log.id}`} className={(index % 2 === 1) ? 'table_odd_row' : ''}>
                            <td>{index + 1}</td>
                            <td>{log.startTime}</td>
                            <td>{log.elapsed}</td>
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
