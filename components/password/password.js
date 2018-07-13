"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var Password = /** @class */ (function () {
    function Password(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.promptLabel = 'Please enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
        this.feedback = true;
    }
    Password.prototype.ngAfterViewInit = function () {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ui-password-panel-overlay';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        if (this.feedback) {
            this.panel.appendChild(this.meter);
            this.panel.appendChild(this.info);
            document.body.appendChild(this.panel);
        }
    };
    Password.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    Password.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    Password.prototype.updateFilledState = function () {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    };
    Password.prototype.onFocus = function (e) {
        this.panel.style.zIndex = String(++domhandler_1.DomHandler.zindex);
        this.domHandler.removeClass(this.panel, 'ui-helper-hidden');
        this.domHandler.absolutePosition(this.panel, this.el.nativeElement);
        this.domHandler.fadeIn(this.panel, 250);
    };
    Password.prototype.onBlur = function (e) {
        this.domHandler.addClass(this.panel, 'ui-helper-hidden');
    };
    Password.prototype.onKeyup = function (e) {
        var value = e.target.value, label = null, meterPos = null;
        if (value.length === 0) {
            label = this.promptLabel;
            meterPos = '0px 0px';
        }
        else {
            var score = this.testStrength(value);
            if (score < 30) {
                label = this.weakLabel;
                meterPos = '0px -10px';
            }
            else if (score >= 30 && score < 80) {
                label = this.mediumLabel;
                meterPos = '0px -20px';
            }
            else if (score >= 80) {
                label = this.strongLabel;
                meterPos = '0px -30px';
            }
        }
        this.meter.style.backgroundPosition = meterPos;
        this.info.textContent = label;
    };
    Password.prototype.testStrength = function (str) {
        var grade = 0;
        var val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    };
    Password.prototype.normalize = function (x, y) {
        var diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    };
    Object.defineProperty(Password.prototype, "disabled", {
        get: function () {
            return this.el.nativeElement.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Password.prototype.ngOnDestroy = function () {
        if (!this.feedback)
            return;
        this.panel.removeChild(this.meter);
        this.panel.removeChild(this.info);
        document.body.removeChild(this.panel);
        this.panel = null;
        this.meter = null;
        this.info = null;
    };
    Password.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[pPassword]',
                    host: {
                        '[class.ui-inputtext]': 'true',
                        '[class.ui-corner-all]': 'true',
                        '[class.ui-state-default]': 'true',
                        '[class.ui-widget]': 'true',
                        '[class.ui-state-filled]': 'filled'
                    },
                    providers: [domhandler_1.DomHandler]
                },] },
    ];
    /** @nocollapse */
    Password.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler }
    ]; };
    Password.propDecorators = {
        promptLabel: [{ type: core_1.Input }],
        weakLabel: [{ type: core_1.Input }],
        mediumLabel: [{ type: core_1.Input }],
        strongLabel: [{ type: core_1.Input }],
        feedback: [{ type: core_1.Input }],
        onInput: [{ type: core_1.HostListener, args: ['input', ['$event'],] }],
        onFocus: [{ type: core_1.HostListener, args: ['focus', ['$event'],] }],
        onBlur: [{ type: core_1.HostListener, args: ['blur', ['$event'],] }],
        onKeyup: [{ type: core_1.HostListener, args: ['keyup', ['$event'],] }]
    };
    return Password;
}());
exports.Password = Password;
var PasswordModule = /** @class */ (function () {
    function PasswordModule() {
    }
    PasswordModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Password],
                    declarations: [Password]
                },] },
    ];
    return PasswordModule;
}());
exports.PasswordModule = PasswordModule;
//# sourceMappingURL=password.js.map