"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var Steps = /** @class */ (function () {
    function Steps() {
        this.activeIndex = 0;
        this.readonly = true;
        this.activeIndexChange = new core_1.EventEmitter();
    }
    Steps.prototype.itemClick = function (event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    };
    Steps.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-steps',
                    template: "\n        <div [ngClass]=\"{'ui-steps ui-widget ui-helper-clearfix':true,'ui-steps-readonly':readonly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" class=\"ui-steps-item\" #menuitem\n                    [ngClass]=\"{'ui-state-highlight ui-steps-current':(i === activeIndex),\n                        'ui-state-default':(i !== activeIndex),\n                        'ui-state-complete':(i < activeIndex),\n                        'ui-state-disabled ui-steps-incomplete':item.disabled||(i !== activeIndex && readonly)}\">\n                    <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link\" (click)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\">\n                        <span class=\"ui-steps-number\">{{i + 1}}</span>\n                        <span class=\"ui-steps-title\">{{item.label}}</span>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link\" (click)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\">\n                        <span class=\"ui-steps-number\">{{i + 1}}</span>\n                        <span class=\"ui-steps-title\">{{item.label}}</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    "
                },] },
    ];
    Steps.propDecorators = {
        activeIndex: [{ type: core_1.Input }],
        model: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        activeIndexChange: [{ type: core_1.Output }]
    };
    return Steps;
}());
exports.Steps = Steps;
var StepsModule = /** @class */ (function () {
    function StepsModule() {
    }
    StepsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, router_1.RouterModule],
                    exports: [Steps, router_1.RouterModule],
                    declarations: [Steps]
                },] },
    ];
    return StepsModule;
}());
exports.StepsModule = StepsModule;
//# sourceMappingURL=steps.js.map