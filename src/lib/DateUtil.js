const weekDayCNMap = {
    Mon: '(一)',
    Tue: '(二)',
    Wed: '(三)',
    Thu: '(四)',
    Fri: '(五)',
    Sat: '(六)',
    Sun: '(日)',
};

let numToPaddedText = (num) => {
    return num > 9 ? num.toString() : ('0' + num);
};

let dateToDateTimeString = (date) => {
    let strDate = '';

    if (date === null || date === undefined) {
        return strDate;
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    const y = date.getFullYear();
    const mt = (date.getMonth() + 1);
    const day = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    strDate = y + "-" + numToPaddedText(mt) + "-" +
        numToPaddedText(day) + " " + numToPaddedText(h) + ":"
        + numToPaddedText(m) + ":" + numToPaddedText(s);
    return strDate;
};

let dateToDateString = (date) => {
    let strDate = '';

    if (date === null || date === undefined) {
        return strDate;
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    const y = date.getFullYear();
    const mt = (date.getMonth() + 1);
    const day = date.getDate();

    strDate = y + "-" + numToPaddedText(mt) + "-" +
        numToPaddedText(day);
    return strDate;
};

let dateToDateWeekString = (date) => {
    let strDate = '';

    if (date === null || date === undefined) {
        return strDate;
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    const mt = (date.getMonth() + 1);
    const day = date.getDate();
    const dayOfWeek = date.toDateString().substring(0, 3);

    strDate = numToPaddedText(mt) + "-" +
        numToPaddedText(day) + weekDayCNMap[dayOfWeek];
    return strDate;
};

let dateToTimeString = (date) => {
    let strDate = '';

    if (date === null || date === undefined) {
        return strDate;
    }

    if (typeof date === 'string') {
        date = new Date(date);
    }

    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    strDate = numToPaddedText(h) + ":"
        + numToPaddedText(m) + ":" + numToPaddedText(s);
    return strDate;
};

let stringToDate = () => {
    return new Date();
};

let dateAddDays = (date, days) => {
    const newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + days);
    return newDate;
};

export { dateToDateTimeString, dateToDateString,
    dateToTimeString, dateToDateWeekString,
    stringToDate, dateAddDays, numToPaddedText };