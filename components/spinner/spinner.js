"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var inputtext_1 = require("../inputtext/inputtext");
var domhandler_1 = require("../dom/domhandler");
var forms_1 = require("@angular/forms");
exports.SPINNER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Spinner; }),
    multi: true
};
var Spinner = /** @class */ (function () {
    function Spinner(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onChange = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.step = 1;
        this.decimalSeparator = '.';
        this.thousandSeparator = ',';
        this.formatInput = true;
        this.type = 'text';
        this.valueAsString = '';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.keyPattern = /[0-9\+\-]/;
        this.negativeSeparator = '-';
    }
    Spinner.prototype.ngOnInit = function () {
        if (Math.floor(this.step) === 0) {
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }
    };
    Spinner.prototype.repeat = function (event, interval, dir) {
        var _this = this;
        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
            _this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    };
    Spinner.prototype.spin = function (event, dir) {
        var step = this.step * dir;
        var currentValue = this.value || 0;
        var newValue = null;
        if (this.precision)
            this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    };
    Spinner.prototype.toFixed = function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    };
    Spinner.prototype.onUpButtonMousedown = function (event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    };
    Spinner.prototype.onUpButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onUpButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMousedown = function (event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    };
    Spinner.prototype.onDownButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onInputKeydown = function (event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    };
    Spinner.prototype.onInputKeyPress = function (event) {
        var inputChar = String.fromCharCode(event.charCode);
        if (!this.keyPattern.test(inputChar) && inputChar != this.decimalSeparator && event.keyCode != 9 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 46) {
            event.preventDefault();
        }
    };
    Spinner.prototype.onInputKeyup = function (event) {
        this.decimalSeparatorRegEx = this.decimalSeparatorRegEx || new RegExp(this.decimalSeparator === '.' ? '\\.' : this.decimalSeparator, "g");
        var inputValue = event.target.value.trim();
        this.value = this.parseValue(inputValue);
        if (this.shouldFormat(inputValue)) {
            this.formatValue();
        }
        this.onModelChange(this.value);
        this.updateFilledState();
    };
    Spinner.prototype.shouldFormat = function (value) {
        if (this.negativeSeparator === value) {
            return false;
        }
        if (!this.domHandler.isInteger(this.step) && (value.match(this.decimalSeparatorRegEx) || []).length === 1 && value.indexOf(this.decimalSeparator) === value.length - 1) {
            return false;
        }
        return true;
    };
    Spinner.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.restrictValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Spinner.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    Spinner.prototype.parseValue = function (val) {
        var value;
        if (this.formatInput) {
            val = val.split(this.thousandSeparator).join('');
        }
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.precision) {
                value = parseFloat(val.replace(',', '.'));
            }
            else {
                value = parseInt(val);
            }
            if (isNaN(value)) {
                value = null;
            }
        }
        return value;
    };
    Spinner.prototype.restrictValue = function () {
        var restricted;
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
            restricted = true;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
            restricted = true;
        }
        if (restricted) {
            this.onModelChange(this.value);
            this.formatValue();
        }
    };
    Spinner.prototype.formatValue = function () {
        if (this.value !== null && this.value !== undefined) {
            var textValue = String(this.value).replace('.', this.decimalSeparator);
            if (this.formatInput) {
                var parts = textValue.split(this.decimalSeparator);
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandSeparator);
                textValue = parts.join(this.decimalSeparator);
            }
            this.valueAsString = textValue;
        }
        else {
            this.valueAsString = '';
        }
        this.inputfieldViewChild.nativeElement.value = this.valueAsString;
    };
    Spinner.prototype.handleChange = function (event) {
        this.onChange.emit(event);
    };
    Spinner.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    Spinner.prototype.writeValue = function (value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
    };
    Spinner.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Spinner.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Spinner.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Spinner.prototype.updateFilledState = function () {
        this.filled = (this.value !== undefined && this.value != null);
    };
    Spinner.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-spinner',
                    template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #inputfield [attr.type]=\"type\" [attr.id]=\"inputId\" [value]=\"valueAsString\" [attr.name]=\"name\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [attr.readonly]=\"readonly\" [attr.required]=\"required\"\n            (keydown)=\"onInputKeydown($event)\" (keyup)=\"onInputKeyup($event)\" (keypress)=\"onInputKeyPress($event)\" (blur)=\"onInputBlur($event)\" (change)=\"handleChange($event)\" (focus)=\"onInputFocus($event)\"\n            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [ngClass]=\"'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-up ui-clickable\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-down ui-clickable\"></span>\n            </button>\n        </span>\n    ",
                    host: {
                        '[class.ui-inputwrapper-filled]': 'filled',
                        '[class.ui-inputwrapper-focus]': 'focus'
                    },
                    providers: [domhandler_1.DomHandler, exports.SPINNER_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    Spinner.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler }
    ]; };
    Spinner.propDecorators = {
        onChange: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output }],
        onBlur: [{ type: core_1.Output }],
        step: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        maxlength: [{ type: core_1.Input }],
        size: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        inputId: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        decimalSeparator: [{ type: core_1.Input }],
        thousandSeparator: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        formatInput: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        name: [{ type: core_1.Input }],
        inputStyle: [{ type: core_1.Input }],
        inputStyleClass: [{ type: core_1.Input }],
        inputfieldViewChild: [{ type: core_1.ViewChild, args: ['inputfield',] }]
    };
    return Spinner;
}());
exports.Spinner = Spinner;
var SpinnerModule = /** @class */ (function () {
    function SpinnerModule() {
    }
    SpinnerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, inputtext_1.InputTextModule],
                    exports: [Spinner],
                    declarations: [Spinner]
                },] },
    ];
    return SpinnerModule;
}());
exports.SpinnerModule = SpinnerModule;
//# sourceMappingURL=spinner.js.map