"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var InputText = /** @class */ (function () {
    function InputText(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    InputText.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputText.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    InputText.prototype.updateFilledState = function () {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    };
    InputText.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[pInputText]',
                    host: {
                        '[class.ui-inputtext]': 'true',
                        '[class.ui-corner-all]': 'true',
                        '[class.ui-state-default]': 'true',
                        '[class.ui-widget]': 'true',
                        '[class.ui-state-filled]': 'filled'
                    }
                },] },
    ];
    /** @nocollapse */
    InputText.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: forms_1.NgModel, decorators: [{ type: core_1.Optional }] }
    ]; };
    InputText.propDecorators = {
        onInput: [{ type: core_1.HostListener, args: ['input', ['$event'],] }]
    };
    return InputText;
}());
exports.InputText = InputText;
var InputTextModule = /** @class */ (function () {
    function InputTextModule() {
    }
    InputTextModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [InputText],
                    declarations: [InputText]
                },] },
    ];
    return InputTextModule;
}());
exports.InputTextModule = InputTextModule;
//# sourceMappingURL=inputtext.js.map