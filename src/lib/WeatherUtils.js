const getAirQuality = (pm25) => {
    let airInfo = {
        color: '',
        text: ''
    };

    if (pm25 >= 0 && pm25 <= 50) {
        airInfo.text = '优';
    }
    else if (pm25 > 50 && pm25 <= 100) {
        airInfo.text = '良';
    }
    else if (pm25 > 100 && pm25 <= 150) {
        airInfo.text = '轻度';
    }
    else if (pm25 > 150 && pm25 <= 200) {
        airInfo.text = '中度';
    }
    else if (pm25 > 200 && pm25 <= 300) {
        airInfo.text = '重度';
    }
    else if (pm25 > 300 && pm25 <= 500) {
        airInfo.text = '严重';
    }
    else {
        airInfo.text = '';
    }

    return airInfo;
};

const getWeatherImage = weatherText => {
    if (weatherText && weatherText !== '') {
        return `http://www.lengshuotech.com:3000/res/weather/${weatherText}.png`;
    }

    return `http://www.lengshuotech.com:3000/res/weather/weather_img01.png`;
};

export { getAirQuality, getWeatherImage };

