"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var messageservice_1 = require("../common/messageservice");
var Growl = /** @class */ (function () {
    function Growl(el, domHandler, differs, messageService, zone) {
        var _this = this;
        this.el = el;
        this.domHandler = domHandler;
        this.differs = differs;
        this.messageService = messageService;
        this.zone = zone;
        this.life = 3000;
        this.immutable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.onClick = new core_1.EventEmitter();
        this.onHover = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
        if (messageService) {
            this.subscription = messageService.messageObserver.subscribe(function (messages) {
                if (messages) {
                    if (messages instanceof Array) {
                        var filteredMessages = messages.filter(function (m) { return _this.key === m.key; });
                        _this.value = _this.value ? _this.value.concat(filteredMessages) : filteredMessages.slice();
                    }
                    else if (_this.key === messages.key) {
                        _this.value = _this.value ? _this.value.concat([messages]) : [messages];
                    }
                }
                else {
                    _this.value = null;
                }
            });
        }
    }
    Growl.prototype.ngAfterViewInit = function () {
        if (!this.sticky) {
            this.initTimeout();
        }
    };
    Object.defineProperty(Growl.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.containerViewChild && this.containerViewChild.nativeElement && this.immutable) {
                this.handleValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Growl.prototype, "sticky", {
        get: function () {
            return this._sticky;
        },
        set: function (value) {
            if (value && this.timeout) {
                clearTimeout(this.timeout);
            }
            this._sticky = value;
        },
        enumerable: true,
        configurable: true
    });
    Growl.prototype.ngDoCheck = function () {
        if (!this.immutable && this.containerViewChild && this.containerViewChild.nativeElement) {
            var changes = this.differ.diff(this.value);
            if (changes) {
                this.handleValueChange();
            }
        }
    };
    Growl.prototype.handleValueChange = function () {
        if (this.preventRerender) {
            this.preventRerender = false;
            return;
        }
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
        this.domHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        if (!this.sticky) {
            this.initTimeout();
        }
    };
    Growl.prototype.initTimeout = function () {
        var _this = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.zone.runOutsideAngular(function () {
            _this.timeout = setTimeout(function () {
                _this.zone.run(function () {
                    _this.removeAll();
                });
            }, _this.life);
        });
    };
    Growl.prototype.remove = function (index, msgel) {
        var _this = this;
        this.closeIconClick = true;
        this.domHandler.fadeOut(msgel, 250);
        setTimeout(function () {
            _this.preventRerender = true;
            _this.onClose.emit({ message: _this.value[index] });
            if (_this.immutable) {
                _this._value = _this.value.filter(function (val, i) { return i != index; });
                _this.valueChange.emit(_this._value);
            }
            else {
                _this._value.splice(index, 1);
            }
        }, 250);
    };
    Growl.prototype.removeAll = function () {
        var _this = this;
        if (this.value && this.value.length) {
            this.domHandler.fadeOut(this.containerViewChild.nativeElement, 250);
            setTimeout(function () {
                _this.value.forEach(function (msg, index) { return _this.onClose.emit({ message: _this.value[index] }); });
                if (_this.immutable) {
                    _this.value = [];
                    _this.valueChange.emit(_this.value);
                }
                else {
                    _this.value.splice(0, _this.value.length);
                }
            }, 250);
        }
    };
    Growl.prototype.onMessageClick = function (i) {
        if (this.closeIconClick)
            this.closeIconClick = false;
        else
            this.onClick.emit({ message: this.value[i] });
    };
    Growl.prototype.onMessageHover = function (i) {
        this.onHover.emit({ message: this.value[i] });
    };
    Growl.prototype.ngOnDestroy = function () {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Growl.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-growl',
                    template: "\n        <div #container [ngClass]=\"'ui-growl ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div #msgel *ngFor=\"let msg of value;let i = index\" class=\"ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow\" aria-live=\"polite\"\n                [ngClass]=\"{'ui-growl-message-info':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn',\n                    'ui-growl-message-error':msg.severity == 'error','ui-growl-message-success':msg.severity == 'success'}\"\n                    (click)=\"onMessageClick(i)\" (mouseenter)=\"onMessageHover(i)\">\n                <div class=\"ui-growl-item\">\n                     <div class=\"ui-growl-icon-close pi pi-times\" (click)=\"remove(i,msgel)\"></div>\n                     <span class=\"ui-growl-image pi\"\n                        [ngClass]=\"{'pi-info-circle':msg.severity == 'info','pi-exclamation-triangle':msg.severity == 'warn',\n                                'pi-times':msg.severity == 'error','pi-check':msg.severity == 'success'}\"></span>\n                     <div class=\"ui-growl-message\">\n                        <span class=\"ui-growl-title\">{{msg.summary}}</span>\n                        <p [innerHTML]=\"msg.detail||''\"></p>\n                     </div>\n                     <div style=\"clear: both;\"></div>\n                </div>\n            </div>\n        </div>\n    ",
                    providers: [domhandler_1.DomHandler]
                },] },
    ];
    /** @nocollapse */
    Growl.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler },
        { type: core_1.IterableDiffers },
        { type: messageservice_1.MessageService, decorators: [{ type: core_1.Optional }] },
        { type: core_1.NgZone }
    ]; };
    Growl.propDecorators = {
        life: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        immutable: [{ type: core_1.Input }],
        autoZIndex: [{ type: core_1.Input }],
        baseZIndex: [{ type: core_1.Input }],
        key: [{ type: core_1.Input }],
        onClick: [{ type: core_1.Output }],
        onHover: [{ type: core_1.Output }],
        onClose: [{ type: core_1.Output }],
        valueChange: [{ type: core_1.Output }],
        containerViewChild: [{ type: core_1.ViewChild, args: ['container',] }],
        value: [{ type: core_1.Input }],
        sticky: [{ type: core_1.Input }]
    };
    return Growl;
}());
exports.Growl = Growl;
var GrowlModule = /** @class */ (function () {
    function GrowlModule() {
    }
    GrowlModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Growl],
                    declarations: [Growl]
                },] },
    ];
    return GrowlModule;
}());
exports.GrowlModule = GrowlModule;
//# sourceMappingURL=growl.js.map