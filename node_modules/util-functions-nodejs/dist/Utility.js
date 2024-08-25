"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
const AbstractUtility_1 = require("./AbstractUtility");
class Utility extends AbstractUtility_1.AbstractUtility {
    constructor() {
        super(...arguments);
        this.daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.validateName = (Name) => /^(?=.*[a-zA-Z]).{3,}$/.test(Name.trim());
        this.validateFullName = (FullName) => /^(?=.*[ _]).{6,}$/.test(FullName.trim());
        this.validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
        this.validatePassword = (password) => /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(password.trim());
        this.validatePhone = (Phone) => /^[1-9]\d{9}$/.test(Phone.trim());
        this.validateURL = (url) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(url);
        this.validateCreditCard = (cardNumber) => /^\d{13,19}$/.test(cardNumber);
        this.validateIPV4 = (ip) => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
        this.validateDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
        this.validateHexColor = (color) => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color);
        this.validateMACAddress = (mac) => /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
        this.validateIPv6 = (ipv6) => /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}(:[0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){1,5}((:[0-9a-fA-F]{1,4}){1,2}|:))|(([0-9a-fA-F]{1,4}:){1,4}((:[0-9a-fA-F]{1,4}){1,3}|:))|(([0-9a-fA-F]{1,4}:){1,3}((:[0-9a-fA-F]{1,4}){1,4}|:))|(([0-9a-fA-F]{1,4}:){1,2}((:[0-9a-fA-F]{1,4}){1,5}|:))|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6}|:)|(:((:[0-9a-fA-F]{1,4}){1,7}|:))$/.test(ipv6);
        this.validateUUID = (uuid) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
        this.validateCreditCardCVV = (cvv) => /^\d{3,4}$/.test(cvv + "");
        this.validateLatitude = (latitude) => /^(-?[1-8]?[0-9](\.\d+)?|90(\.0+)?)$/.test(latitude);
        this.validateLongitude = (longitude) => /^(-?(1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?)$/.test(longitude);
        this.validateHTMLTag = (tag) => /^<\/?[a-z][a-z0-9]*[^<>]*>$/i.test(tag);
        this.validateCountryCode = (code) => /^\+\d{1,3}$/.test(code);
        this.validatePassportNumber = (passport) => /^[a-zA-Z0-9]{6,9}$/.test(passport);
        this.validateBinary = (binary) => /^[01]+$/.test(binary);
        this.validateYouTubeURL = (url) => /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url);
        this.validateMongoObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
    }
    getRandomAsciiValue() {
        const min = 33;
        const max = 122;
        const bannedNums = [34, 39, 40, 41, 42, 44, 46, 47, 58, 59, 60, 62, 91, 92, 93, 94, 96, 126];
        let value = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!bannedNums.includes(value)) {
            return value;
        }
        return this.getRandomAsciiValue();
    }
    removeExtraDecimals(inputString) {
        let decimalPosition = inputString.indexOf('.');
        if (decimalPosition === -1 || decimalPosition === inputString.length - 1 || Number(inputString) > 10) {
            return Math.floor(parseFloat(inputString)).toString();
        }
        return inputString.slice(0, decimalPosition + 2);
    }
    padStart(str, targetLength, padString = '0') {
        while (str.length < targetLength) {
            str = padString + str;
        }
        return str;
    }
    numGenerator(val) {
        const num = Math.floor(Math.random() * Math.pow(10, val));
        if (num.toString().length < val) {
            return this.numGenerator(val);
        }
        else {
            return num;
        }
    }
    parseDate(dateStr) {
        const [month, day, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    numTokandM(numString) {
        var _a;
        try {
            const number = Number(numString);
            if (number > 999 && number < 1000000) {
                return this.removeExtraDecimals((number / 1000).toString()) + "k";
            }
            else if (number >= 1000000) {
                return this.removeExtraDecimals((number / 1000000).toString()) + "M";
            }
            else {
                return numString;
            }
        }
        catch (error) {
            console.log((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error while converting");
            return "Invalid Input";
        }
    }
    getDate(date, fullDay) {
        var _a;
        try {
            date = Number(date);
            let currentDate;
            if (!fullDay) {
                currentDate = new Date();
            }
            else {
                currentDate = new Date(fullDay);
                if (isNaN(currentDate.getTime())) {
                    console.error(`Invalid date format: ${fullDay}`);
                    return "Invalid date";
                }
            }
            currentDate.setDate(currentDate.getDate() + date);
            const month = this.padStart(String(currentDate.getMonth() + 1), 2, '0');
            const day = this.padStart(String(currentDate.getDate()), 2, '0');
            const year = currentDate.getFullYear();
            if (isNaN(year) || isNaN(parseInt(month)) || isNaN(parseInt(day))) {
                console.error(`Date calculation resulted in NaN: year=${year}, month=${month}, day=${day}`);
                return "Invalid date";
            }
            return `${year}-${month}-${day}`;
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Error occurred while getting date");
            return "null";
        }
    }
    getTimeDifference(targetDate) {
        var _a;
        try {
            const currentDate = new Date();
            const targetDateTime = new Date(targetDate).getTime();
            const currentTime = currentDate.getTime();
            const timeDifference = Math.abs(targetDateTime - currentTime);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const days = Math.floor((timeDifference / (1000 * 60 * 60 * 24)) % 365);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);
            let timeString = '';
            if (years > 0) {
                timeString += years + (years === 1 ? ' year ' : ' years ');
            }
            if (months > 0) {
                timeString += months + (months === 1 ? ' month ' : ' months ');
            }
            if (days > 0) {
                timeString += days + (days === 1 ? ' day ' : ' days ');
            }
            if (hours > 0) {
                timeString += hours + (hours === 1 ? ' hour ' : ' hours ');
            }
            if (minutes > 0) {
                timeString += minutes + (minutes === 1 ? ' minute ' : ' minutes ');
            }
            return timeString.trim();
        }
        catch (error) {
            console.log((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error occurred while getting time");
            return "Invalid Input";
        }
    }
    getLastMonths(monthCount) {
        var _a;
        try {
            let currentDate = new Date().getMonth();
            monthCount -= 1;
            const lastMonths = [];
            while (monthCount > -1) {
                lastMonths.push(this.monthNames[currentDate]);
                currentDate--;
                monthCount--;
                if (currentDate < 0) {
                    currentDate = 11;
                }
            }
            return lastMonths.reverse();
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Error occurred while getting months");
            return [];
        }
    }
    getDatesOfCurrentYear(arrayOfDays) {
        var _a;
        try {
            const currentYear = new Date().getFullYear();
            const filteredArray = arrayOfDays.filter(item => {
                const dateYear = new Date(item).getFullYear();
                return dateYear <= currentYear;
            });
            return filteredArray;
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Error occurred while getting dates");
            return [];
        }
    }
    generateOtp(digit) {
        if (!digit || isNaN(digit)) {
            return "Invalid digits";
        }
        return Number(this.padStart(this.numGenerator(digit).toString(), digit, this.numGenerator(1).toString()));
    }
    xKeyGenerator(length) {
        var _a;
        try {
            let KEY = "";
            length = Number(length);
            if (length < 1 || isNaN(length)) {
                return "Invalid Length";
            }
            for (let i = 0; i < length; i++) {
                KEY += String.fromCharCode(this.getRandomAsciiValue());
            }
            return KEY;
        }
        catch (error) {
            console.log((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error while generating key generator");
            return "Invalid Length";
        }
    }
    isLeapYear(year) {
        const yr = Number(year);
        if (isNaN(yr) || yr <= 0) {
            console.error("Invalid Input");
            return false;
        }
        return yr % (this.isEndCentury(yr) ? 400 : 4) === 0;
    }
    isEndCentury(year) {
        const num = Number(year);
        if (isNaN(num)) {
            console.error("Invalid Input");
            return false;
        }
        return num % 100 === 0;
    }
    dayDifference(dateStr1, dateStr2) {
        var _a;
        try {
            const date1 = this.parseDate(dateStr1);
            const date2 = this.parseDate(dateStr2);
            const timeDifference = date2.getTime() - date1.getTime();
            const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
            return Math.abs(dayDifference);
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Pass date in format MM-DD-YYYY");
            return null;
        }
    }
    getDay(dateStr) {
        return this.daysOfWeek[this.parseDate(dateStr).getDay()];
    }
    daysOfYear(dateStr) {
        var _a;
        try {
            const date = new Date(dateStr);
            let days = 0;
            const datesInMonth = [31, this.isLeapYear(date.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (date.getMonth() !== 0) {
                days = datesInMonth.reduce((acc, curr, idx) => (idx < date.getMonth()) ? acc + curr : acc + 0, 0);
            }
            return days + date.getDate();
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Please input a valid date");
            return -1;
        }
    }
    formatDate(date) {
        var _a;
        try {
            const d = date.getDate().toString().padStart(2, '0');
            const m = (date.getMonth() + 1).toString().padStart(2, '0');
            const y = date.getFullYear();
            return `${d}-${m}-${y}`;
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Please send a valid date");
            return "Please send a valid date";
        }
    }
    ;
    retryPromise(fn, retry = 3, delay = 1000) {
        var _a;
        try {
            return new Promise((resolve, reject) => {
                const attempt = () => {
                    fn().then(resolve).catch((error) => {
                        if (retry === 0) {
                            reject(error);
                        }
                        else {
                            setTimeout(() => { retry--; attempt(); }, delay);
                        }
                    });
                };
                attempt();
            });
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Please input a valid date");
        }
    }
    getRelativeTime(date) {
        var _a;
        try {
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 60)
                return `${diffMins} minute(s) ago`;
            if (diffMins < 1440)
                return `${Math.floor(diffMins / 60)} hour(s) ago`;
            return `${Math.floor(diffMins / 1440)} day(s) ago`;
        }
        catch (error) {
            console.log((_a = error.message) !== null && _a !== void 0 ? _a : "Enter a valid date");
            return "Enter a valid date";
        }
    }
    ;
    camelToSnake(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
    snakeToCamel(str) {
        return str.toLowerCase().replace(/(_\w)/g, match => match[1].toUpperCase());
    }
}
exports.Utility = Utility;
