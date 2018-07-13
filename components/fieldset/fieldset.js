"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var idx = 0;
var Fieldset = /** @class */ (function () {
    function Fieldset(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new core_1.EventEmitter();
        this.onBeforeToggle = new core_1.EventEmitter();
        this.onAfterToggle = new core_1.EventEmitter();
        this.id = "ui-fieldset-" + idx++;
    }
    Fieldset.prototype.toggle = function (event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    };
    Fieldset.prototype.expand = function (event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    };
    Fieldset.prototype.collapse = function (event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    };
    Fieldset.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Fieldset.prototype.onToggleDone = function (event) {
        this.animating = false;
    };
    Fieldset.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-fieldset',
                    template: "\n        <fieldset [attr.id]=\"id\" [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\">\n                <ng-container *ngIf=\"toggleable; else legendContent\">\n                    <a href=\"#\" (click)=\"toggle($event)\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"!collapsed\" [attr.tabindex]=\"toggleable ? null : -1\">\n                        <ng-container *ngTemplateOutlet=\"legendContent\"></ng-container>\n                    </a>\n                </ng-container>\n                <ng-template #legendContent>\n                    <span class=\"ui-fieldset-toggler pi\" *ngIf=\"toggleable\" [ngClass]=\"{'pi-minus': !collapsed,'pi-plus':collapsed}\"></span>\n                    <span class=\"ui-fieldset-legend-text\">{{legend}}</span>\n                    <ng-content select=\"p-header\"></ng-content>\n                </ng-template>\n            </legend>\n            <div [attr.id]=\"id + '-content'\" class=\"ui-fieldset-content-wrapper\" [@fieldsetContent]=\"collapsed ? 'hidden' : 'visible'\" \n                        [ngClass]=\"{'ui-fieldset-content-wrapper-overflown': collapsed||animating}\" [attr.aria-hidden]=\"collapsed\"\n                         (@fieldsetContent.done)=\"onToggleDone($event)\" role=\"region\">\n                <div class=\"ui-fieldset-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </fieldset>\n    ",
                    animations: [
                        animations_1.trigger('fieldsetContent', [
                            animations_1.state('hidden', animations_1.style({
                                height: '0px'
                            })),
                            animations_1.state('visible', animations_1.style({
                                height: '*'
                            })),
                            animations_1.transition('visible => hidden', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                            animations_1.transition('hidden => visible', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    Fieldset.ctorParameters = function () { return [
        { type: core_1.ElementRef }
    ]; };
    Fieldset.propDecorators = {
        legend: [{ type: core_1.Input }],
        toggleable: [{ type: core_1.Input }],
        collapsed: [{ type: core_1.Input }],
        collapsedChange: [{ type: core_1.Output }],
        onBeforeToggle: [{ type: core_1.Output }],
        onAfterToggle: [{ type: core_1.Output }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }]
    };
    return Fieldset;
}());
exports.Fieldset = Fieldset;
var FieldsetModule = /** @class */ (function () {
    function FieldsetModule() {
    }
    FieldsetModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Fieldset, shared_1.SharedModule],
                    declarations: [Fieldset]
                },] },
    ];
    return FieldsetModule;
}());
exports.FieldsetModule = FieldsetModule;
//# sourceMappingURL=fieldset.js.map