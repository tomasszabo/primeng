"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var button_1 = require("../button/button");
var InplaceDisplay = /** @class */ (function () {
    function InplaceDisplay() {
    }
    InplaceDisplay.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-inplaceDisplay',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return InplaceDisplay;
}());
exports.InplaceDisplay = InplaceDisplay;
var InplaceContent = /** @class */ (function () {
    function InplaceContent() {
    }
    InplaceContent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-inplaceContent',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return InplaceContent;
}());
exports.InplaceContent = InplaceContent;
var Inplace = /** @class */ (function () {
    function Inplace() {
        this.onActivate = new core_1.EventEmitter();
        this.onDeactivate = new core_1.EventEmitter();
    }
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    Inplace.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-inplace',
                    template: "\n        <div [ngClass]=\"'ui-inplace ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\"\n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" icon=\"pi pi-times\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    "
                },] },
    ];
    Inplace.propDecorators = {
        active: [{ type: core_1.Input }],
        closable: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        onActivate: [{ type: core_1.Output }],
        onDeactivate: [{ type: core_1.Output }]
    };
    return Inplace;
}());
exports.Inplace = Inplace;
var InplaceModule = /** @class */ (function () {
    function InplaceModule() {
    }
    InplaceModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, button_1.ButtonModule],
                    exports: [Inplace, InplaceDisplay, InplaceContent, button_1.ButtonModule],
                    declarations: [Inplace, InplaceDisplay, InplaceContent]
                },] },
    ];
    return InplaceModule;
}());
exports.InplaceModule = InplaceModule;
//# sourceMappingURL=inplace.js.map