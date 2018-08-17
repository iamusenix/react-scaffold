let util = {};

Date.prototype.format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    var fullYear = this.getFullYear();
    var year = this.getYear();
    var month = this.getMonth() + 1;
    var day = Week[this.getDay()];
    var date = this.getDate();
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();

    str = str.replace(/yyyy|YYYY/, fullYear);
    str = str.replace(/yy|YY/, (year % 100) > 9 ? (year % 100).toString() : '0' + (year % 100));

    str = str.replace(/mmon/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/mon/g, month);

    str = str.replace(/w|W/g, day);

    str = str.replace(/dd|DD/, date > 9 ? date.toString() : '0' + date);
    str = str.replace(/d|D/g, date);

    str = str.replace(/hh|HH/, hours > 9 ? hours.toString() : '0' + hours);
    str = str.replace(/h|H/g, hours);
    str = str.replace(/mm|MM/, minutes > 9 ? minutes.toString() : '0' + minutes);
    str = str.replace(/m|M/g, minutes);

    str = str.replace(/ss|SS/, seconds > 9 ? seconds.toString() : '0' + seconds);
    str = str.replace(/s|S/g, seconds);

    return str;
}

// 计算时间差
util.timeDiffFromStart = function(dateStart) { //di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    // var dateBegin = new Date(dateStart.replace(/-/g, "/")); //将-转化为/，使用new Date
    var dateEnd = new Date(); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateStart; //时间差的毫秒数
    
    return this.timeDiff(dateDiff);
};

util.timeDiff = function(dateDiff) {
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)

    return fillIn(hours) + ":" + fillIn(minutes) + ":" + fillIn(seconds);
    // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数", hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
}

// 根据&符解析url参数
util.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

util.setSession = function(str, data) {
    sessionStorage.setItem(str, JSON.stringify(data));
}

util.getSession = function(str) {
    if (typeof str == 'string') {
        let param = sessionStorage.getItem(str);

        try {
            return JSON.parse(param);
        } catch (error) {
            return param;
        }
    }
    return {};
}

// 函数节流
util.throttle = function(fn, interval = 300) {
    let canRun = true;
    return function() {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
}

// 函数防抖
util.debounce = function(fn, interval = 300) {
    let timeout = null;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}

function fillIn(num) {
    if (Number(num) !== NaN)
        return num > 9 ? num.toString() : '0' + num;
    else
        return num;
}

export default util;