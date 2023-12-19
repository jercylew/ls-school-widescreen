const getSingleDataName = dataInfoStr => {
    if (dataInfoStr.indexOf(':') < 0) {
      return '';
    }
    const arDataInfo = dataInfoStr.split(':');
    if (arDataInfo.length !== 2) {
      return '';
    }
    return arDataInfo[0].trim();
  };

const getSingleDataValueString = dataInfoStr => {
if (dataInfoStr.indexOf(':') < 0) {
    return dataInfoStr;
}
const arDataInfo = dataInfoStr.split(':');
if (arDataInfo.length !== 2) {
    return "";
}
return arDataInfo[1].trim();
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
    return [
    {
        name: getSingleDataName(dataInfoStr),
        value: getSingleDataValueString(dataInfoStr)
    }
    ]
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
    return [
    {
        name: getSingleDataName(dataInfoStr),
        value: getSingleDataValueFloat(dataInfoStr)
    }
    ]
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
    return [
    {
        name: getSingleDataName(dataInfoStr),
        value: getSingleDataValueInt(dataInfoStr)
    }
    ]
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

export { getSingleDataName, getSingleDataValueString,
    getSingleDataValueInt, getSingleDataValueFloat,
    getMultDataValueString, getMultDataValueFloat, getMultDataValueInt };