"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var button_1 = require("../button/button");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var forms_1 = require("@angular/forms");
exports.CALENDAR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Calendar; }),
    multi: true
};
var Calendar = /** @class */ (function () {
    function Calendar(el, domHandler, renderer, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.cd = cd;
        this.dateFormat = 'mm/dd/yy';
        this.inline = false;
        this.showOtherMonths = true;
        this.icon = 'pi pi-calendar';
        this.shortYearCutoff = '+10';
        this.hourFormat = '24';
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.showSeconds = false;
        this.showOnFocus = true;
        this.dataType = 'date';
        this.selectionMode = 'single';
        this.todayButtonStyleClass = 'ui-button-secondary';
        this.clearButtonStyleClass = 'ui-button-secondary';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.keepInvalid = false;
        this.hideOnDateTimeSelect = false;
        this.numberOfMonths = 1;
        this.view = 'date';
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onInput = new core_1.EventEmitter();
        this.onTodayClick = new core_1.EventEmitter();
        this.onClearClick = new core_1.EventEmitter();
        this.onMonthChange = new core_1.EventEmitter();
        this.onYearChange = new core_1.EventEmitter();
        this._locale = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: 'Today',
            clear: 'Clear'
        };
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.inputFieldValue = null;
    }
    Object.defineProperty(Calendar.prototype, "utc", {
        get: function () {
            return this._utc;
        },
        set: function (_utc) {
            this._utc = _utc;
            console.log("Setting utc has no effect as built-in UTC support is dropped.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (date) {
            this._minDate = date;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (date) {
            this._maxDate = date;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "disabledDates", {
        get: function () {
            return this._disabledDates;
        },
        set: function (disabledDates) {
            this._disabledDates = disabledDates;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "disabledDays", {
        get: function () {
            return this._disabledDays;
        },
        set: function (disabledDays) {
            this._disabledDays = disabledDays;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "showTime", {
        get: function () {
            return this._showTime;
        },
        set: function (showTime) {
            this._showTime = showTime;
            if (this.currentHour === undefined) {
                this.initTime(this.value || new Date());
            }
            this.updateInputfield();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (newLocale) {
            this._locale = newLocale;
            this.createWeekDays();
            this.createMonths(this.currentMonth, this.currentYear);
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.ngOnInit = function () {
        var date = this.defaultDate || new Date();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.yearNavigator && this.yearRange) {
            this.yearOptions = [];
            var years = this.yearRange.split(':'), yearStart = parseInt(years[0]), yearEnd = parseInt(years[1]);
            for (var i = yearStart; i <= yearEnd; i++) {
                this.yearOptions.push(i);
            }
        }
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        }
        else if (this.view === 'month') {
            this.monthPickerValues = [];
            for (var i = 0; i <= 11; i++) {
                this.monthPickerValues.push(this.locale.monthNamesShort[i]);
            }
        }
    };
    Calendar.prototype.ngAfterViewInit = function () {
        if (!this.inline && this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlayViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.overlayViewChild.nativeElement, this.appendTo);
        }
    };
    Calendar.prototype.ngAfterViewChecked = function () {
        if (this.overlayShown) {
            this.alignOverlay();
            this.overlayShown = false;
        }
    };
    Calendar.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'date':
                    _this.dateTemplate = item.template;
                    break;
                default:
                    _this.dateTemplate = item.template;
                    break;
            }
        });
    };
    Calendar.prototype.createWeekDays = function () {
        this.weekDays = [];
        var dayIndex = this.locale.firstDayOfWeek;
        for (var i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
    };
    Calendar.prototype.createMonths = function (month, year) {
        this.months = this.months = [];
        for (var i = 0; i < this.numberOfMonths; i++) {
            var m = month + i;
            var y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }
            this.months.push(this.createMonth(m, y));
        }
    };
    Calendar.prototype.createMonth = function (month, year) {
        var dates = [];
        var firstDay = this.getFirstDayOfMonthIndex(month, year);
        var daysLength = this.getDaysCountInMonth(month, year);
        var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        var sundayIndex = this.getSundayIndex();
        var dayNo = 1;
        var today = new Date();
        for (var i = 0; i < 6; i++) {
            var week = [];
            if (i == 0) {
                for (var j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    var prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year) });
                }
                var remainingDaysLength = 7 - week.length;
                for (var j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year) });
                    dayNo++;
                }
            }
            else {
                for (var j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        var next = this.getNextMonthAndYear(month, year);
                        week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year) });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year) });
                    }
                    dayNo++;
                }
            }
            dates.push(week);
        }
        return {
            month: month,
            year: year,
            dates: dates
        };
    };
    Calendar.prototype.initTime = function (date) {
        this.pm = date.getHours() > 11;
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            if (this.hourFormat == '12')
                this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
            else
                this.currentHour = date.getHours();
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    };
    Calendar.prototype.navBackward = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.view === 'month') {
            this.decrementYear();
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
        event.preventDefault();
    };
    Calendar.prototype.navForward = function (event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.view === 'month') {
            this.incrementYear();
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
        event.preventDefault();
    };
    Calendar.prototype.decrementYear = function () {
        this.currentYear--;
        if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
            this.currentYear = this.yearOptions[this.yearOptions.length - 1];
        }
    };
    Calendar.prototype.incrementYear = function () {
        this.currentYear++;
        if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
            this.currentYear = this.yearOptions[0];
        }
    };
    Calendar.prototype.onDateSelect = function (event, dateMeta) {
        var _this = this;
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter(function (date, i) {
                return !_this.isDateEquals(date, dateMeta);
            });
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                if (dateMeta.otherMonth) {
                    if (this.selectOtherMonths) {
                        this.currentMonth = dateMeta.month;
                        this.currentYear = dateMeta.year;
                        this.createMonths(this.currentMonth, this.currentYear);
                        this.selectDate(dateMeta);
                    }
                }
                else {
                    this.selectDate(dateMeta);
                }
            }
        }
        if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
            this.overlayVisible = false;
            if (this.mask) {
                this.disableModality();
            }
        }
        this.updateInputfield();
        event.preventDefault();
    };
    Calendar.prototype.shouldSelectDate = function (dateMeta) {
        if (this.isMultipleSelection())
            return !this.maxDateCount || !this.value || this.maxDateCount > this.value.length;
        else
            return true;
    };
    Calendar.prototype.onMonthSelect = function (event, index) {
        this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
    };
    Calendar.prototype.updateInputfield = function () {
        var formattedValue = '';
        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (var i = 0; i < this.value.length; i++) {
                    var dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== (this.value.length - 1)) {
                        formattedValue += ', ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    var startDate = this.value[0];
                    var endDate = this.value[1];
                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' - ' + this.formatDateTime(endDate);
                    }
                }
            }
        }
        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    };
    Calendar.prototype.formatDateTime = function (date) {
        var formattedValue = null;
        if (date) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.dateFormat);
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }
        return formattedValue;
    };
    Calendar.prototype.selectDate = function (dateMeta) {
        var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat === '12' && this.pm && this.currentHour != 12)
                date.setHours(this.currentHour + 12);
            else
                date.setHours(this.currentHour);
            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }
        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.currentHour = date.getHours();
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.currentHour = date.getHours();
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? this.value.concat([date]) : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                var startDate = this.value[0];
                var endDate = this.value[1];
                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }
        this.onSelect.emit(date);
    };
    Calendar.prototype.updateModel = function (value) {
        var _this = this;
        this.value = value;
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                var stringArrValue = null;
                if (this.value) {
                    stringArrValue = this.value.map(function (date) { return _this.formatDateTime(date); });
                }
                this.onModelChange(stringArrValue);
            }
        }
    };
    Calendar.prototype.getFirstDayOfMonthIndex = function (month, year) {
        var day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        var dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    };
    Calendar.prototype.getDaysCountInMonth = function (month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    };
    Calendar.prototype.getDaysCountInPrevMonth = function (month, year) {
        var prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    };
    Calendar.prototype.getPreviousMonthAndYear = function (month, year) {
        var m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    };
    Calendar.prototype.getNextMonthAndYear = function (month, year) {
        var m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    };
    Calendar.prototype.getSundayIndex = function () {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    };
    Calendar.prototype.isSelected = function (dateMeta) {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                var selected = false;
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var date = _a[_i];
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }
                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta);
            }
        }
        else {
            return false;
        }
    };
    Calendar.prototype.isMonthSelected = function (month) {
        if (this.value) {
            return this.value.getDate() === 1 && this.value.getMonth() === month && this.value.getFullYear() === this.currentYear;
        }
        else {
            return false;
        }
    };
    Calendar.prototype.isDateEquals = function (value, dateMeta) {
        if (value)
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    };
    Calendar.prototype.isDateBetween = function (start, end, dateMeta) {
        var between = false;
        if (start && end) {
            var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }
        return between;
    };
    Calendar.prototype.isSingleSelection = function () {
        return this.selectionMode === 'single';
    };
    Calendar.prototype.isRangeSelection = function () {
        return this.selectionMode === 'range';
    };
    Calendar.prototype.isMultipleSelection = function () {
        return this.selectionMode === 'multiple';
    };
    Calendar.prototype.isToday = function (today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    Calendar.prototype.isSelectable = function (day, month, year) {
        var validMin = true;
        var validMax = true;
        var validDate = true;
        var validDay = true;
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year) {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }
        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }
        return validMin && validMax && validDate && validDay;
    };
    Calendar.prototype.isDateDisabled = function (day, month, year) {
        if (this.disabledDates) {
            for (var _i = 0, _a = this.disabledDates; _i < _a.length; _i++) {
                var disabledDate = _a[_i];
                if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                    return true;
                }
            }
        }
        return false;
    };
    Calendar.prototype.isDayDisabled = function (day, month, year) {
        if (this.disabledDays) {
            var weekday = new Date(year, month, day);
            var weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    };
    Calendar.prototype.onInputFocus = function (event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    };
    Calendar.prototype.onInputClick = function (event) {
        this.datepickerClick = true;
        if (this.autoZIndex) {
            this.overlayViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    Calendar.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    };
    Calendar.prototype.onButtonClick = function (event, inputfield) {
        var _this = this;
        if (!this.overlayViewChild.nativeElement.offsetParent || this.overlayViewChild.nativeElement.style.display === 'none') {
            inputfield.focus();
            this.showOverlay();
            if (this.overlayViewChild != undefined) {
                setTimeout(function () {
                    _this.overlay = _this.overlayViewChild.nativeElement;
                    _this.selectElement = _this.domHandler.findSingle(_this.overlay, 'a.ui-state-active');
                    _this.todayElement = _this.domHandler.findSingle(_this.overlay, 'a.ui-state-highlight');
                    _this.focusElement = _this.selectElement ? _this.selectElement : _this.todayElement;
                    _this.focusElement.focus();
                }, 200);
            }
        }
        else
            this.overlayVisible = false;
        this.datepickerClick = true;
    };
    Calendar.prototype.onInputKeydown = function (event) {
        this.isKeydown = true;
        if (event.keyCode === 9) {
            this.overlayVisible = false;
        }
    };
    Calendar.prototype.onMonthDropdownChange = function (m) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    };
    Calendar.prototype.onYearDropdownChange = function (y) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    };
    Calendar.prototype.incrementHour = function (event) {
        var prevHour = this.currentHour;
        var newHour = this.currentHour + this.stepHour;
        if (this.validateHour(newHour)) {
            if (this.hourFormat == '24')
                this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
            else if (this.hourFormat == '12') {
                // Before the AM/PM break, now after
                if (prevHour < 12 && newHour > 11) {
                    this.pm = !this.pm;
                }
                this.currentHour = (newHour >= 13) ? (newHour - 12) : newHour;
            }
            this.updateTime();
        }
        event.preventDefault();
    };
    Calendar.prototype.decrementHour = function (event) {
        var newHour = this.currentHour - this.stepHour;
        if (this.validateHour(newHour)) {
            if (this.hourFormat == '24')
                this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
            else if (this.hourFormat == '12') {
                // If we were at noon/midnight, then switch
                if (this.currentHour === 12) {
                    this.pm = !this.pm;
                }
                this.currentHour = (newHour <= 0) ? (12 + newHour) : newHour;
            }
            this.updateTime();
        }
        event.preventDefault();
    };
    Calendar.prototype.validateHour = function (hour) {
        var valid = true;
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        var valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getHours() > hour) {
                valid = false;
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getHours() < hour) {
                valid = false;
            }
        }
        return valid;
    };
    Calendar.prototype.incrementMinute = function (event) {
        var newMinute = this.currentMinute + this.stepMinute;
        if (this.validateMinute(newMinute)) {
            this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
            this.updateTime();
        }
        event.preventDefault();
    };
    Calendar.prototype.decrementMinute = function (event) {
        var newMinute = this.currentMinute - this.stepMinute;
        if (this.validateMinute(newMinute)) {
            this.currentMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
            this.updateTime();
        }
        event.preventDefault();
    };
    Calendar.prototype.validateMinute = function (minute) {
        var valid = true;
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        var valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (value.getHours() == this.minDate.getHours()) {
                if (this.minDate.getMinutes() > minute) {
                    valid = false;
                }
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (value.getHours() == this.maxDate.getHours()) {
                if (this.maxDate.getMinutes() < minute) {
                    valid = false;
                }
            }
        }
        return valid;
    };
    Calendar.prototype.incrementSecond = function (event) {
        var newSecond = this.currentSecond + this.stepSecond;
        if (this.validateSecond(newSecond)) {
            this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
            this.updateTime();
        }
        event.preventDefault();
    };
    Calendar.prototype.decrementSecond = function (event) {
        var newSecond = this.currentSecond - this.stepSecond;
        if (this.validateSecond(newSecond)) {
            this.currentSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
            this.updateTime();
        }
        event.preventDefault();
    };
    Calendar.prototype.validateSecond = function (second) {
        var valid = true;
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        var valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getSeconds() > second) {
                valid = false;
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getSeconds() < second) {
                valid = false;
            }
        }
        return valid;
    };
    Calendar.prototype.updateTime = function () {
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();
        if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }
        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }
        if (this.isMultipleSelection()) {
            value = this.value.slice(0, -1).concat([value]);
        }
        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    };
    Calendar.prototype.toggleAMPM = function (event) {
        this.pm = !this.pm;
        this.updateTime();
        event.preventDefault();
    };
    Calendar.prototype.onUserInput = function (event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;
        var val = event.target.value;
        try {
            var value = this.parseValueFromString(val);
            this.updateModel(value);
            this.updateUI();
        }
        catch (err) {
            //invalid date
            this.updateModel(null);
        }
        this.filled = val != null && val.length;
        this.onInput.emit(event);
    };
    Calendar.prototype.parseValueFromString = function (text) {
        if (!text || text.trim().length === 0) {
            return null;
        }
        var value;
        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            var tokens = text.split(',');
            value = [];
            for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                var token = tokens_1[_i];
                value.push(this.parseDateTime(token.trim()));
            }
        }
        else if (this.isRangeSelection()) {
            var tokens = text.split(' - ');
            value = [];
            for (var i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }
        return value;
    };
    Calendar.prototype.parseDateTime = function (text) {
        var date;
        var parts = text.split(' ');
        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            if (this.showTime) {
                date = this.parseDate(parts[0], this.dateFormat);
                this.populateTime(date, parts[1], parts[2]);
            }
            else {
                date = this.parseDate(text, this.dateFormat);
            }
        }
        return date;
    };
    Calendar.prototype.populateTime = function (value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = (ampm === 'PM' || ampm === 'pm');
        var time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    };
    Calendar.prototype.updateUI = function () {
        var val = this.value || this.defaultDate || new Date();
        if (Array.isArray(val)) {
            val = val[0];
        }
        this.createMonths(val.getMonth(), val.getFullYear());
        if (this.showTime || this.timeOnly) {
            var hours = val.getHours();
            if (this.hourFormat == '12') {
                this.pm = hours > 11;
                if (hours >= 12) {
                    this.currentHour = (hours == 12) ? 12 : hours - 12;
                }
                else {
                    this.currentHour = (hours == 0) ? 12 : hours;
                }
            }
            else {
                this.currentHour = val.getHours();
            }
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    };
    Calendar.prototype.onDatePickerClick = function (event) {
        this.datepickerClick = true;
    };
    Calendar.prototype.showOverlay = function () {
        this.overlayVisible = true;
        this.overlayShown = true;
        if (this.autoZIndex) {
            this.overlayViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
        this.bindDocumentClickListener();
    };
    Calendar.prototype.alignOverlay = function () {
        if (this.touchUI) {
            this.enableModality();
        }
        else {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.overlayViewChild.nativeElement, this.inputfieldViewChild.nativeElement);
            else
                this.domHandler.relativePosition(this.overlayViewChild.nativeElement, this.inputfieldViewChild.nativeElement);
        }
    };
    Calendar.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.overlayViewChild.nativeElement.style.zIndex) - 1);
            var maskStyleClass = 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
            this.domHandler.addMultipleClasses(this.mask, maskStyleClass);
            this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                _this.disableModality();
            });
            document.body.appendChild(this.mask);
            this.domHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    };
    Calendar.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            var bodyChildren = document.body.children;
            var hasBlockerMasks = void 0;
            for (var i = 0; i < bodyChildren.length; i++) {
                var bodyChild = bodyChildren[i];
                if (this.domHandler.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
                    hasBlockerMasks = true;
                    break;
                }
            }
            if (!hasBlockerMasks) {
                this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.overlayVisible = false;
            this.unbindMaskClickListener();
            this.mask = null;
        }
    };
    Calendar.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Calendar.prototype.writeValue = function (value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }
        this.updateInputfield();
        this.updateUI();
    };
    Calendar.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Calendar.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Calendar.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    // Ported from jquery-ui datepicker formatDate
    Calendar.prototype.formatDate = function (date, format) {
        if (!date) {
            return '';
        }
        var iFormat;
        var lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = function (match, value, len) {
            var num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        }, formatName = function (match, value, shortNames, longNames) {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };
        var output = '';
        var literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\'')) {
                                output += '\'';
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    };
    Calendar.prototype.formatTime = function (date) {
        if (!date) {
            return '';
        }
        var output = '';
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }
        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
        }
        else {
            output += (hours < 10) ? '0' + hours : hours;
        }
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }
        return output;
    };
    Calendar.prototype.parseTime = function (value) {
        var tokens = value.split(':');
        var validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw "Invalid time";
        }
        var h = parseInt(tokens[0]);
        var m = parseInt(tokens[1]);
        var s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw "Invalid time";
        }
        else {
            if (this.hourFormat == '12' && h !== 12 && this.pm) {
                h += 12;
            }
            return { hour: h, minute: m, second: s };
        }
    };
    // Ported from jquery-ui datepicker parseDate
    Calendar.prototype.parseDate = function (value, format) {
        if (format == null || value == null) {
            throw "Invalid arguments";
        }
        value = (typeof value === "object" ? value.toString() : value + "");
        if (value === "") {
            return null;
        }
        var iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = function (match) {
            var isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
            if (!num) {
                throw "Missing number at position " + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = function (match, shortNames, longNames) {
            var index = -1;
            var arr = lookAhead(match) ? longNames : shortNames;
            var names = [];
            for (var i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort(function (a, b) {
                return -(a[1].length - b[1].length);
            });
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i][1];
                if (value.substr(iValue, name_1.length).toLowerCase() === name_1.toLowerCase()) {
                    index = names[i][0];
                    iValue += name_1.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw "Unknown name at position " + iValue;
            }
        }, checkLiteral = function () {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw "Unexpected literal at position " + iValue;
            }
            iValue++;
        };
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", this.locale.dayNamesShort, this.locale.dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw "Invalid date"; // E.g. 31/02/00
        }
        return date;
    };
    Calendar.prototype.daylightSavingAdjust = function (date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    };
    Calendar.prototype.updateFilledState = function () {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    };
    Calendar.prototype.onTodayButtonClick = function (event) {
        var date = new Date();
        var dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), today: true, selectable: true };
        this.createMonths(dateMeta.month, dateMeta.year);
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    };
    Calendar.prototype.onClearButtonClick = function (event) {
        this.updateModel(null);
        this.updateInputfield();
        this.overlayVisible = false;
        this.onClearClick.emit(event);
    };
    Calendar.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (!_this.datepickerClick && _this.overlayVisible) {
                    _this.overlayVisible = false;
                    _this.onClose.emit(event);
                }
                _this.datepickerClick = false;
                _this.cd.detectChanges();
            });
        }
    };
    Calendar.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Calendar.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        this.unbindMaskClickListener();
        if (!this.inline && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlayViewChild.nativeElement);
        }
    };
    Calendar.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-calendar',
                    template: "\n        <span [ngClass]=\"{'ui-calendar':true, 'ui-calendar-w-btn': showIcon, 'ui-calendar-timeonly': timeOnly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-template [ngIf]=\"!inline\">\n                <input #inputfield type=\"text\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.required]=\"required\" [value]=\"inputFieldValue\" (focus)=\"onInputFocus($event)\" (keydown)=\"onInputKeydown($event)\" (click)=\"onInputClick($event)\" (blur)=\"onInputBlur($event)\"\n                    [readonly]=\"readonlyInput\" (input)=\"onUserInput($event)\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [placeholder]=\"placeholder||''\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"\n                    [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all'\" autocomplete=\"off\"\n                    ><button type=\"button\" [icon]=\"icon\" pButton *ngIf=\"showIcon\" (click)=\"onButtonClick($event,inputfield)\" class=\"ui-datepicker-trigger ui-calendar-button\"\n                    [ngClass]=\"{'ui-state-disabled':disabled}\" [disabled]=\"disabled\" tabindex=\"-1\"></button>\n            </ng-template>\n            <div #datepicker [class]=\"panelStyleClass\" [ngClass]=\"{'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all': true, 'ui-datepicker-inline':inline,'ui-shadow':!inline,\n                'ui-state-disabled':disabled,'ui-datepicker-timeonly':timeOnly,'ui-datepicker-multiple-month': this.numberOfMonths > 1, 'ui-datepicker-monthpicker': (view === 'month'), 'ui-datepicker-touch-ui': touchUI}\"\n                [ngStyle]=\"{'display': inline ? 'inline-block' : (overlayVisible ? 'block' : 'none')}\" (click)=\"onDatePickerClick($event)\" [@overlayState]=\"inline ? 'visible' : (overlayVisible ? 'visible' : 'hidden')\">\n                \n                <ng-container *ngIf=\"!timeOnly && (overlayVisible || inline)\">\n                    <div class=\"ui-datepicker-group ui-widget-content\" *ngFor=\"let month of months; let i = index;\">\n                        <div class=\"ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all\">\n                            <ng-content select=\"p-header\"></ng-content>\n                            <a class=\"ui-datepicker-prev ui-corner-all\" href=\"#\" (click)=\"navBackward($event)\" *ngIf=\"i === 0\">\n                                <span class=\"pi pi-chevron-left\"></span>\n                            </a>\n                            <a class=\"ui-datepicker-next ui-corner-all\" href=\"#\" (click)=\"navForward($event)\" *ngIf=\"this.numberOfMonths === 1 ? true : (i === this.numberOfMonths -1)\">\n                                <span class=\"pi pi-chevron-right\"></span>\n                            </a>\n                            <div class=\"ui-datepicker-title\">\n                                <span class=\"ui-datepicker-month\" *ngIf=\"!monthNavigator && (view !== 'month')\">{{locale.monthNames[month.month]}}</span>\n                                <select class=\"ui-datepicker-month\" *ngIf=\"monthNavigator && (view !== 'month')\" (change)=\"onMonthDropdownChange($event.target.value)\">\n                                    <option [value]=\"i\" *ngFor=\"let month of locale.monthNames;let i = index\" [selected]=\"i == currentMonth\">{{month}}</option>\n                                </select>\n                                <select class=\"ui-datepicker-year\" *ngIf=\"yearNavigator\" (change)=\"onYearDropdownChange($event.target.value)\">\n                                    <option [value]=\"year\" *ngFor=\"let year of yearOptions\" [selected]=\"year == currentYear\">{{year}}</option>\n                                </select>\n                                <span class=\"ui-datepicker-year\" *ngIf=\"!yearNavigator\">{{month.year}}</span>\n                            </div>\n                        </div>\n                        <div class=\"ui-datepicker-calendar-container\" *ngIf=\"view ==='date'\">\n                            <table class=\"ui-datepicker-calendar\">\n                                <thead>\n                                    <tr>\n                                        <th scope=\"col\" *ngFor=\"let weekDay of weekDays;let begin = first; let end = last\">\n                                            <span>{{weekDay}}</span>\n                                        </th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let week of month.dates\">\n                                        <td *ngFor=\"let date of week\" [ngClass]=\"{'ui-datepicker-other-month ui-state-disabled':date.otherMonth,\n                                            'ui-datepicker-current-day':isSelected(date),'ui-datepicker-today':date.today}\">\n                                            <a class=\"ui-state-default\" href=\"#\" *ngIf=\"date.otherMonth ? showOtherMonths : true\"\n                                                [ngClass]=\"{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today, 'ui-state-disabled':!date.selectable}\"\n                                                (click)=\"onDateSelect($event,date)\" draggable=\"false\">\n                                                <ng-container *ngIf=\"!dateTemplate\">{{date.day}}</ng-container>\n                                                <ng-container *ngTemplateOutlet=\"dateTemplate; context: {$implicit: date}\"></ng-container>\n                                            </a>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        <div class=\"ui-datepicker-monthpicker-container\" *ngIf=\"view === 'month'\">\n                            <a href=\"#\" *ngFor=\"let m of monthPickerValues; let i = index\" (click)=\"onMonthSelect($event, i)\" class=\"ui-datepicker-month-cell\" [ngClass]=\"{'ui-state-active': isMonthSelected(i)}\">\n                                {{m}}\n                            </a>\n                        </div>\n                    </div>\n                </ng-container>\n                <div class=\"ui-timepicker ui-widget-header ui-corner-all\" *ngIf=\"showTime||timeOnly\">\n                    <div class=\"ui-hour-picker\">\n                        <a href=\"#\" (click)=\"incrementHour($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentHour < 10 ? 'inline': 'none'}\">0</span><span>{{currentHour}}</span>\n                        <a href=\"#\" (click)=\"decrementHour($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-separator\">\n                        <a href=\"#\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>:</span>\n                        <a href=\"#\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-minute-picker\">\n                        <a href=\"#\" (click)=\"incrementMinute($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentMinute < 10 ? 'inline': 'none'}\">0</span><span>{{currentMinute}}</span>\n                        <a href=\"#\" (click)=\"decrementMinute($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-separator\" *ngIf=\"showSeconds\">\n                        <a href=\"#\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>:</span>\n                        <a href=\"#\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-second-picker\" *ngIf=\"showSeconds\">\n                        <a href=\"#\" (click)=\"incrementSecond($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentSecond < 10 ? 'inline': 'none'}\">0</span><span>{{currentSecond}}</span>\n                        <a href=\"#\" (click)=\"decrementSecond($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-ampm-picker\" *ngIf=\"hourFormat=='12'\">\n                        <a href=\"#\" (click)=\"toggleAMPM($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{pm ? 'PM' : 'AM'}}</span>\n                        <a href=\"#\" (click)=\"toggleAMPM($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"ui-datepicker-buttonbar ui-widget-header\" *ngIf=\"showButtonBar\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-6\">\n                            <button type=\"button\" [label]=\"_locale.today\" (click)=\"onTodayButtonClick($event)\" pButton [ngClass]=\"[todayButtonStyleClass]\"></button>\n                        </div>\n                        <div class=\"ui-g-6\">\n                            <button type=\"button\" [label]=\"_locale.clear\" (click)=\"onClearButtonClick($event)\" pButton [ngClass]=\"[clearButtonStyleClass]\"></button>\n                        </div>\n                    </div>\n                </div>\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </span>\n    ",
                    animations: [
                        animations_1.trigger('overlayState', [
                            animations_1.state('hidden', animations_1.style({
                                opacity: 0
                            })),
                            animations_1.state('visible', animations_1.style({
                                opacity: 1
                            })),
                            animations_1.transition('visible => hidden', animations_1.animate('400ms ease-in')),
                            animations_1.transition('hidden => visible', animations_1.animate('400ms ease-out'))
                        ])
                    ],
                    host: {
                        '[class.ui-inputwrapper-filled]': 'filled',
                        '[class.ui-inputwrapper-focus]': 'focus'
                    },
                    providers: [domhandler_1.DomHandler, exports.CALENDAR_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    Calendar.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler },
        { type: core_1.Renderer2 },
        { type: core_1.ChangeDetectorRef }
    ]; };
    Calendar.propDecorators = {
        defaultDate: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        inputStyle: [{ type: core_1.Input }],
        inputId: [{ type: core_1.Input }],
        name: [{ type: core_1.Input }],
        inputStyleClass: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        dateFormat: [{ type: core_1.Input }],
        inline: [{ type: core_1.Input }],
        showOtherMonths: [{ type: core_1.Input }],
        selectOtherMonths: [{ type: core_1.Input }],
        showIcon: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        appendTo: [{ type: core_1.Input }],
        readonlyInput: [{ type: core_1.Input }],
        shortYearCutoff: [{ type: core_1.Input }],
        monthNavigator: [{ type: core_1.Input }],
        yearNavigator: [{ type: core_1.Input }],
        yearRange: [{ type: core_1.Input }],
        hourFormat: [{ type: core_1.Input }],
        timeOnly: [{ type: core_1.Input }],
        stepHour: [{ type: core_1.Input }],
        stepMinute: [{ type: core_1.Input }],
        stepSecond: [{ type: core_1.Input }],
        showSeconds: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        showOnFocus: [{ type: core_1.Input }],
        dataType: [{ type: core_1.Input }],
        selectionMode: [{ type: core_1.Input }],
        maxDateCount: [{ type: core_1.Input }],
        showButtonBar: [{ type: core_1.Input }],
        todayButtonStyleClass: [{ type: core_1.Input }],
        clearButtonStyleClass: [{ type: core_1.Input }],
        autoZIndex: [{ type: core_1.Input }],
        baseZIndex: [{ type: core_1.Input }],
        panelStyleClass: [{ type: core_1.Input }],
        keepInvalid: [{ type: core_1.Input }],
        hideOnDateTimeSelect: [{ type: core_1.Input }],
        numberOfMonths: [{ type: core_1.Input }],
        view: [{ type: core_1.Input }],
        touchUI: [{ type: core_1.Input }],
        onFocus: [{ type: core_1.Output }],
        onBlur: [{ type: core_1.Output }],
        onClose: [{ type: core_1.Output }],
        onSelect: [{ type: core_1.Output }],
        onInput: [{ type: core_1.Output }],
        onTodayClick: [{ type: core_1.Output }],
        onClearClick: [{ type: core_1.Output }],
        onMonthChange: [{ type: core_1.Output }],
        onYearChange: [{ type: core_1.Output }],
        templates: [{ type: core_1.ContentChildren, args: [shared_1.PrimeTemplate,] }],
        tabindex: [{ type: core_1.Input }],
        utc: [{ type: core_1.Input }],
        overlayViewChild: [{ type: core_1.ViewChild, args: ['datepicker',] }],
        inputfieldViewChild: [{ type: core_1.ViewChild, args: ['inputfield',] }],
        minDate: [{ type: core_1.Input }],
        maxDate: [{ type: core_1.Input }],
        disabledDates: [{ type: core_1.Input }],
        disabledDays: [{ type: core_1.Input }],
        showTime: [{ type: core_1.Input }],
        locale: [{ type: core_1.Input }]
    };
    return Calendar;
}());
exports.Calendar = Calendar;
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, button_1.ButtonModule, shared_1.SharedModule],
                    exports: [Calendar, button_1.ButtonModule, shared_1.SharedModule],
                    declarations: [Calendar]
                },] },
    ];
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.js.map