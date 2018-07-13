"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var animations_1 = require("@angular/animations");
var idx = 0;
var Panel = /** @class */ (function () {
    function Panel(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.collapsedChange = new core_1.EventEmitter();
        this.onBeforeToggle = new core_1.EventEmitter();
        this.onAfterToggle = new core_1.EventEmitter();
        this.id = "ui-panel-" + idx++;
    }
    Panel.prototype.toggle = function (event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        event.preventDefault();
    };
    Panel.prototype.expand = function (event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.collapse = function (event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Panel.prototype.onToggleDone = function (event) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    };
    __decorate([
        core_1.Input()
    ], Panel.prototype, "toggleable");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "header");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "collapsed");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "style");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "styleClass");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "expandIcon");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "collapseIcon");
    __decorate([
        core_1.Input()
    ], Panel.prototype, "showHeader");
    __decorate([
        core_1.Output()
    ], Panel.prototype, "collapsedChange");
    __decorate([
        core_1.Output()
    ], Panel.prototype, "onBeforeToggle");
    __decorate([
        core_1.Output()
    ], Panel.prototype, "onAfterToggle");
    __decorate([
        core_1.ContentChild(shared_1.Footer)
    ], Panel.prototype, "footerFacet");
    Panel = __decorate([
        core_1.Component({
            selector: 'p-panel',
            template: "\n        <div [attr.id]=\"id\" [ngClass]=\"'ui-panel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all\" *ngIf=\"showHeader\">\n                <span class=\"ui-panel-title\" *ngIf=\"header\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <a *ngIf=\"toggleable\" [attr.id]=\"id + '-label'\" class=\"ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default\" href=\"#\"\n                    (click)=\"toggle($event)\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"!collapsed\">\n                    <span [class]=\"collapsed ? expandIcon : collapseIcon\"></span>\n                </a>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"ui-panel-content-wrapper\" [@panelContent]=\"collapsed ? 'hidden' : 'visible'\" (@panelContent.done)=\"onToggleDone($event)\"\n                [ngClass]=\"{'ui-panel-content-wrapper-overflown': collapsed||animating}\"\n                role=\"region\" [attr.aria-hidden]=\"collapsed\" [attr.aria-labelledby]=\"id + '-label'\">\n                <div class=\"ui-panel-content ui-widget-content\">\n                    <ng-content></ng-content>\n                </div>\n                \n                <div class=\"ui-panel-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('panelContent', [
                    animations_1.state('hidden', animations_1.style({
                        height: '0',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        height: '*',
                        opacity: 1
                    })),
                    animations_1.transition('visible <=> hidden', animations_1.animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
                ])
            ]
        })
    ], Panel);
    return Panel;
}());
exports.Panel = Panel;
var PanelModule = /** @class */ (function () {
    function PanelModule() {
    }
    PanelModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Panel, shared_1.SharedModule],
            declarations: [Panel]
        })
    ], PanelModule);
    return PanelModule;
}());
exports.PanelModule = PanelModule;
