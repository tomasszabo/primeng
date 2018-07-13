"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
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
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "events");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "header");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "style");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "styleClass");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "rtl");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "weekends");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "hiddenDays");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "fixedWeekCount");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "weekNumbers");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "businessHours");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "height");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "contentHeight");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "aspectRatio");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "eventLimit");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "defaultDate");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "editable");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "droppable");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "eventStartEditable");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "eventDurationEditable");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "defaultView");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "allDaySlot");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "allDayText");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "slotDuration");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "slotLabelInterval");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "snapDuration");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "scrollTime");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "minTime");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "maxTime");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "slotEventOverlap");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "nowIndicator");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "dragRevertDuration");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "dragOpacity");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "dragScroll");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "eventOverlap");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "eventConstraint");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "locale");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "timezone");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "timeFormat");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "eventRender");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "dayRender");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "navLinks");
    __decorate([
        core_1.Input()
    ], Schedule.prototype, "options");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onDayClick");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onDrop");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventClick");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventMouseover");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventMouseout");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventDragStart");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventDragStop");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventDrop");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventResizeStart");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventResizeStop");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onEventResize");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onViewRender");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onViewDestroy");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onNavLinkDayClick");
    __decorate([
        core_1.Output()
    ], Schedule.prototype, "onNavLinkWeekClick");
    Schedule = __decorate([
        core_1.Component({
            selector: 'p-schedule',
            template: '<div [ngStyle]="style" [class]="styleClass"></div>'
        })
    ], Schedule);
    return Schedule;
}());
exports.Schedule = Schedule;
var ScheduleModule = /** @class */ (function () {
    function ScheduleModule() {
    }
    ScheduleModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Schedule],
            declarations: [Schedule]
        })
    ], ScheduleModule);
    return ScheduleModule;
}());
exports.ScheduleModule = ScheduleModule;
