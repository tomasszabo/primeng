"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var Schedule = /** @class */ (function () {
    function Schedule(el, differs) {
        this.el = el;
        this.aspectRatio = 1.35;
        this.defaultView = 'month';
        this.allDaySlot = true;
        this.allDayText = 'all-day';
        this.slotDuration = '00:30:00';
        this.scrollTime = '06:00:00';
        this.minTime = '00:00:00';
        this.maxTime = '24:00:00';
        this.slotEventOverlap = true;
        this.dragRevertDuration = 500;
        this.dragOpacity = .75;
        this.dragScroll = true;
        this.timezone = false;
        this.timeFormat = null;
        this.onDayClick = new core_1.EventEmitter();
        this.onDrop = new core_1.EventEmitter();
        this.onEventClick = new core_1.EventEmitter();
        this.onEventMouseover = new core_1.EventEmitter();
        this.onEventMouseout = new core_1.EventEmitter();
        this.onEventDragStart = new core_1.EventEmitter();
        this.onEventDragStop = new core_1.EventEmitter();
        this.onEventDrop = new core_1.EventEmitter();
        this.onEventResizeStart = new core_1.EventEmitter();
        this.onEventResizeStop = new core_1.EventEmitter();
        this.onEventResize = new core_1.EventEmitter();
        this.onViewRender = new core_1.EventEmitter();
        this.onViewDestroy = new core_1.EventEmitter();
        this.onNavLinkDayClick = new core_1.EventEmitter();
        this.onNavLinkWeekClick = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }
    Schedule.prototype.ngOnInit = function () {
        var _this = this;
        this.config = {
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            locale: this.locale,
            timezone: this.timezone,
            timeFormat: this.timeFormat,
            editable: this.editable,
            droppable: this.droppable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDaySlot: this.allDaySlot,
            allDayText: this.allDayText,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            eventRender: this.eventRender,
            dayRender: this.dayRender,
            navLinks: this.navLinks,
            dayClick: function (date, jsEvent, view) {
                _this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            drop: function (date, jsEvent, ui, resourceId) {
                _this.onDrop.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'ui': ui,
                    'resourceId': resourceId
                });
            },
            eventClick: function (calEvent, jsEvent, view) {
                _this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: function (calEvent, jsEvent, view) {
                _this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: function (calEvent, jsEvent, view) {
                _this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: function (event, jsEvent, ui, view) {
                _this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: function (event, jsEvent, ui, view) {
                _this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this._updateEvent(event);
                _this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: function (event, jsEvent, ui, view) {
                _this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
                _this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this._updateEvent(event);
                _this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: function (view, element) {
                _this.onViewRender.emit({
                    'view': view,
                    'element': element
                });
            },
            viewDestroy: function (view, element) {
                _this.onViewDestroy.emit({
                    'view': view,
                    'element': element
                });
            },
            navLinkDayClick: function (weekStart, jsEvent) {
                _this.onNavLinkDayClick.emit({
                    'weekStart': weekStart,
                    'event': jsEvent
                });
            },
            navLinkWeekClick: function (weekStart, jsEvent) {
                _this.onNavLinkWeekClick.emit({
                    'weekStart': weekStart,
                    'event': jsEvent
                });
            }
        };
        if (this.options) {
            for (var prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    };
    Schedule.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    Schedule.prototype.ngOnChanges = function (changes) {
        if (this.calendar) {
            for (var propName in changes) {
                if (propName !== 'events') {
                    this.calendar.option(propName, changes[propName].currentValue);
                }
            }
        }
    };
    Schedule.prototype.initialize = function () {
        this.calendar = new FullCalendar.Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
    };
    Schedule.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.events);
        if (this.calendar && changes) {
            this.calendar.removeEventSources();
            if (this.events) {
                this.calendar.addEventSource(this.events);
            }
        }
    };
    Schedule.prototype.ngOnDestroy = function () {
        if (this.calendar) {
            this.calendar.destroy;
            this.initialized = false;
            this.calendar = null;
        }
    };
    Schedule.prototype.gotoDate = function (date) {
        this.calendar.gotoDate(date);
    };
    Schedule.prototype.prev = function () {
        this.calendar.prev();
    };
    Schedule.prototype.next = function () {
        this.calendar.next();
    };
    Schedule.prototype.prevYear = function () {
        this.calendar.prevYear();
    };
    Schedule.prototype.nextYear = function () {
        this.calendar.nextYear();
    };
    Schedule.prototype.today = function () {
        this.calendar.today();
    };
    Schedule.prototype.incrementDate = function (duration) {
        this.calendar.incrementDate(duration);
    };
    Schedule.prototype.changeView = function (viewName, dateOrRange) {
        this.calendar.incrementDate(viewName, dateOrRange);
    };
    Schedule.prototype.getDate = function () {
        return this.calendar.getDate();
    };
    Schedule.prototype.updateEvent = function (event) {
        this.calendar.updateEvent(event);
    };
    Schedule.prototype._findEvent = function (id) {
        var event;
        if (this.events) {
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.id === id) {
                    event = e;
                    break;
                }
            }
        }
        return event;
    };
    Schedule.prototype._updateEvent = function (event) {
        var sourceEvent = this._findEvent(event.id);
        if (sourceEvent) {
            sourceEvent.start = event.start.format();
            if (event.end) {
                sourceEvent.end = event.end.format();
            }
        }
    };
    Schedule.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-schedule',
                    template: '<div [ngStyle]="style" [class]="styleClass"></div>'
                },] },
    ];
    /** @nocollapse */
    Schedule.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.IterableDiffers }
    ]; };
    Schedule.propDecorators = {
        events: [{ type: core_1.Input }],
        header: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        rtl: [{ type: core_1.Input }],
        weekends: [{ type: core_1.Input }],
        hiddenDays: [{ type: core_1.Input }],
        fixedWeekCount: [{ type: core_1.Input }],
        weekNumbers: [{ type: core_1.Input }],
        businessHours: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        contentHeight: [{ type: core_1.Input }],
        aspectRatio: [{ type: core_1.Input }],
        eventLimit: [{ type: core_1.Input }],
        defaultDate: [{ type: core_1.Input }],
        editable: [{ type: core_1.Input }],
        droppable: [{ type: core_1.Input }],
        eventStartEditable: [{ type: core_1.Input }],
        eventDurationEditable: [{ type: core_1.Input }],
        defaultView: [{ type: core_1.Input }],
        allDaySlot: [{ type: core_1.Input }],
        allDayText: [{ type: core_1.Input }],
        slotDuration: [{ type: core_1.Input }],
        slotLabelInterval: [{ type: core_1.Input }],
        snapDuration: [{ type: core_1.Input }],
        scrollTime: [{ type: core_1.Input }],
        minTime: [{ type: core_1.Input }],
        maxTime: [{ type: core_1.Input }],
        slotEventOverlap: [{ type: core_1.Input }],
        nowIndicator: [{ type: core_1.Input }],
        dragRevertDuration: [{ type: core_1.Input }],
        dragOpacity: [{ type: core_1.Input }],
        dragScroll: [{ type: core_1.Input }],
        eventOverlap: [{ type: core_1.Input }],
        eventConstraint: [{ type: core_1.Input }],
        locale: [{ type: core_1.Input }],
        timezone: [{ type: core_1.Input }],
        timeFormat: [{ type: core_1.Input }],
        eventRender: [{ type: core_1.Input }],
        dayRender: [{ type: core_1.Input }],
        navLinks: [{ type: core_1.Input }],
        options: [{ type: core_1.Input }],
        onDayClick: [{ type: core_1.Output }],
        onDrop: [{ type: core_1.Output }],
        onEventClick: [{ type: core_1.Output }],
        onEventMouseover: [{ type: core_1.Output }],
        onEventMouseout: [{ type: core_1.Output }],
        onEventDragStart: [{ type: core_1.Output }],
        onEventDragStop: [{ type: core_1.Output }],
        onEventDrop: [{ type: core_1.Output }],
        onEventResizeStart: [{ type: core_1.Output }],
        onEventResizeStop: [{ type: core_1.Output }],
        onEventResize: [{ type: core_1.Output }],
        onViewRender: [{ type: core_1.Output }],
        onViewDestroy: [{ type: core_1.Output }],
        onNavLinkDayClick: [{ type: core_1.Output }],
        onNavLinkWeekClick: [{ type: core_1.Output }]
    };
    return Schedule;
}());
exports.Schedule = Schedule;
var ScheduleModule = /** @class */ (function () {
    function ScheduleModule() {
    }
    ScheduleModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Schedule],
                    declarations: [Schedule]
                },] },
    ];
    return ScheduleModule;
}());
exports.ScheduleModule = ScheduleModule;
//# sourceMappingURL=schedule.js.map