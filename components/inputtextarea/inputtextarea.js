"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var InputTextarea = /** @class */ (function () {
    function InputTextarea(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
        this.rows = 2;
        this.cols = 20;
        this.onResize = new core_1.EventEmitter();
    }
    InputTextarea.prototype.ngOnInit = function () {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
    };
    InputTextarea.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputTextarea.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    InputTextarea.prototype.updateFilledState = function () {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    };
    InputTextarea.prototype.onFocus = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.onBlur = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.onKeyup = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.resize = function (event) {
        var linesCount = 0, lines = this.el.nativeElement.value.split('\n');
        for (var i = lines.length - 1; i >= 0; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }
        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
        this.onResize.emit(event || {});
    };
    InputTextarea.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[pInputTextarea]',
                    host: {
                        '[class.ui-inputtext]': 'true',
                        '[class.ui-corner-all]': 'true',
                        '[class.ui-state-default]': 'true',
                        '[class.ui-widget]': 'true',
                        '[class.ui-state-filled]': 'filled',
                        '[attr.rows]': 'rows',
                        '[attr.cols]': 'cols'
                    }
                },] },
    ];
    /** @nocollapse */
    InputTextarea.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: forms_1.NgModel, decorators: [{ type: core_1.Optional }] }
    ]; };
    InputTextarea.propDecorators = {
        autoResize: [{ type: core_1.Input }],
        rows: [{ type: core_1.Input }],
        cols: [{ type: core_1.Input }],
        onResize: [{ type: core_1.Output }],
        onInput: [{ type: core_1.HostListener, args: ['input', ['$event'],] }],
        onFocus: [{ type: core_1.HostListener, args: ['focus', ['$event'],] }],
        onBlur: [{ type: core_1.HostListener, args: ['blur', ['$event'],] }],
        onKeyup: [{ type: core_1.HostListener, args: ['keyup', ['$event'],] }]
    };
    return InputTextarea;
}());
exports.InputTextarea = InputTextarea;
var InputTextareaModule = /** @class */ (function () {
    function InputTextareaModule() {
    }
    InputTextareaModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [InputTextarea],
                    declarations: [InputTextarea]
                },] },
    ];
    return InputTextareaModule;
}());
exports.InputTextareaModule = InputTextareaModule;
//# sourceMappingURL=inputtextarea.js.map