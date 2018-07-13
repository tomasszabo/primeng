"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ProgressSpinner = /** @class */ (function () {
    function ProgressSpinner() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
    ProgressSpinner.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-progressSpinner',
                    template: "\n        <div class=\"ui-progress-spinner\" [ngStyle]=\"style\" [ngClass]=\"styleClass\">\n            <svg class=\"ui-progress-spinner-svg\" viewBox=\"25 25 50 50\" [style.animation-duration]=\"animationDuration\">\n                <circle class=\"ui-progress-spinner-circle\" cx=\"50\" cy=\"50\" r=\"20\" [attr.fill]=\"fill\" [attr.stroke-width]=\"strokeWidth\" stroke-miterlimit=\"10\"/>\n            </svg>\n        </div>\n    "
                },] },
    ];
    ProgressSpinner.propDecorators = {
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        strokeWidth: [{ type: core_1.Input }],
        fill: [{ type: core_1.Input }],
        animationDuration: [{ type: core_1.Input }]
    };
    return ProgressSpinner;
}());
exports.ProgressSpinner = ProgressSpinner;
var ProgressSpinnerModule = /** @class */ (function () {
    function ProgressSpinnerModule() {
    }
    ProgressSpinnerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [ProgressSpinner],
                    declarations: [ProgressSpinner]
                },] },
    ];
    return ProgressSpinnerModule;
}());
exports.ProgressSpinnerModule = ProgressSpinnerModule;
//# sourceMappingURL=progressspinner.js.map