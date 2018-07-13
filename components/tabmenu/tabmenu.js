"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var router_1 = require("@angular/router");
var TabMenu = /** @class */ (function () {
    function TabMenu() {
    }
    TabMenu.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = item;
    };
    TabMenu.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-tabMenu',
                    template: "\n        <div [ngClass]=\"'ui-tabmenu ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\">\n                <li *ngFor=\"let item of model\"\n                    [ngClass]=\"{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,\n                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item,'ui-helper-hidden': item.visible === false}\"\n                        [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\">\n                    <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\">\n                        <span class=\"ui-menuitem-icon \" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\">\n                        <span class=\"ui-menuitem-icon \" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    ",
                    providers: [domhandler_1.DomHandler]
                },] },
    ];
    TabMenu.propDecorators = {
        model: [{ type: core_1.Input }],
        activeItem: [{ type: core_1.Input }],
        popup: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }]
    };
    return TabMenu;
}());
exports.TabMenu = TabMenu;
var TabMenuModule = /** @class */ (function () {
    function TabMenuModule() {
    }
    TabMenuModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, router_1.RouterModule],
                    exports: [TabMenu, router_1.RouterModule],
                    declarations: [TabMenu]
                },] },
    ];
    return TabMenuModule;
}());
exports.TabMenuModule = TabMenuModule;
//# sourceMappingURL=tabmenu.js.map