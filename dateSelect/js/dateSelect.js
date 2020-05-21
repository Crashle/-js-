var selectBirth = {'year': false, 'month': false, 'day' :false};
var curYear = '2019';
var curMonth = '3';
var curDay = '16';
$(function () {
    // 选择生日
    var monthDom = $('#month');
    var yearDom = $('#year');
    var dayDom = $('#day');
    var lastYearType = '';
    var lastDay = 0;

    //设置月份
    function setMonthFn(maxMonth) {
	    for (var i = 1; i <= maxMonth; i++) {
		    var monthData = '<option value=' + i + '>' + i + '</option>';
		    monthDom.append(monthData);
	    }
    }
    // 月份列表
	setMonthFn(curMonth);
    // for (var i = 1; i <= 12; i++) {
    //     var monthData = '<option value=' + i + '>' + i + '</option>';
    //     monthDom.append(monthData);
    // }
    // 年份列表
    var yearNow = new Date().getFullYear();
	yearNow = curYear;
    for (var i = yearNow; i >= 1900; i--) {
        var yearData = '<option value=' + i + '>' + i + '</option>';
        yearDom.append(yearData);
    }
    // 选着月份以后
    monthDom.on('change', function () {
        var selectYear = parseInt(yearDom.val());
        var selectMonth = parseInt(monthDom.val());
        monthDom.removeClass('error');
        // 月份选择不为空
        if(selectMonth) {
            var day31 = selectMonth === 1 || selectMonth === 3 || selectMonth === 5 || selectMonth === 7 || selectMonth === 8 || selectMonth === 10 || selectMonth === 12;
            var setDay = 0;
            if (selectMonth === 2) {
                // 选择过年份
                if(selectYear) {
                    setDay = lastYearType === '闰年' ? 29 : 28;
                } else {
                    setDay = 29;
                }
            } else if (day31) {
                setDay = 31;
            } else {
                setDay = 30;
            }
        }
        if (lastDay !== setDay) {
            setDayFn(setDay);
        }
        lastDay = setDay;
    });
    // 选择年份
    yearDom.on('change', function () {
        var selectYear = parseInt(yearDom.val());
        var selectMonth = parseInt(monthDom.val());
        yearDom.removeClass('error');
        var yearRun = selectYear%4===0 && selectYear%100!==0 || selectYear%400===0;
        var yearType = '';
        var setDay = 0;
        if(selectYear) {
            if(selectYear && yearRun) {yearType = '闰年';} else {yearType = '平年';}
            if(lastYearType !== yearType) {
                if(selectMonth && selectMonth === 2) {
                    setDay = yearType === '闰年' ? 29 : 28;
                    if(lastDay !== setDay) {
                        setDayFn(setDay);
                    }
                }
            }
        } else {
            monthDom.trigger("change");
        }
        lastDay = setDay;
        lastYearType = yearType;
    });
    // 选择日期
    dayDom.on('change', function () {
        dayDom.removeClass('error');
        lastDay = parseInt(dayDom.val());
    });
    // 设置日期
    function setDayFn(day) {
        // 移除day下面的所有元素
        dayDom.empty();
        selectBirth['day'] = false;
        if(!day) {
            dayDom.append('<option value=' + '' + '>' + '' + '</option>');
        } else {
            // 日期列表
            for(var i = 0; i <= day; i++) {
                var num = i === 0 ? "" : i;
                var dayData = '<option value=' + num + '>' + num + '</option>';
                dayDom.append(dayData);
            }
        }
    }

    // 设置默认值
    function setBirthDay(year, month, day) {
        yearDom.find("option[value='"+year+"']").prop("selected",true);
        yearDom.trigger("change");
        monthDom.find("option[value='"+month+"']").prop("selected",true);
        monthDom.trigger("change");
        dayDom.find("option[value='"+day+"']").prop("selected",true);
    }
    // setBirthDay(2015, 3, 25);
});
