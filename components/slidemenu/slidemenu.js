"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var router_1 = require("@angular/router");
var SlideMenuSub = /** @class */ (function () {
    function SlideMenuSub(slideMenu) {
        this.slideMenu = slideMenu;
        this.backLabel = 'Back';
        this.easing = 'ease-out';
    }
    SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
        var _this = this;
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
        if (item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(function () { return _this.slideMenu.animating = false; }, this.effectDuration);
        }
    };
    SlideMenuSub.prototype.ngOnDestroy = function () {
        this.activeItem = null;
    };
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "item");
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "root");
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "backLabel");
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "menuWidth");
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "effectDuration");
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "easing");
    __decorate([
        core_1.Input()
    ], SlideMenuSub.prototype, "index");
    SlideMenuSub = __decorate([
        core_1.Component({
            selector: 'p-slideMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root, 'ui-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" \n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" \n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"ui-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SlideMenu; })))
    ], SlideMenuSub);
    return SlideMenuSub;
}());
exports.SlideMenuSub = SlideMenuSub;
var SlideMenu = /** @class */ (function () {
    function SlideMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.menuWidth = 190;
        this.viewportHeight = 180;
        this.effectDuration = 250;
        this.easing = 'ease-out';
        this.backLabel = 'Back';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.left = 0;
        this.animating = false;
    }
    SlideMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.containerViewChild.nativeElement;
        this.backwardElement = this.backwardViewChild.nativeElement;
        this.slideMenuContentElement = this.slideMenuContentViewChild.nativeElement;
        this.slideMenuContentElement.style.height = this.viewportHeight - this.domHandler.getHiddenElementOuterHeight(this.backwardElement) + 'px';
        if (this.popup) {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    this.domHandler.appendChild(this.container, this.appendTo);
            }
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    SlideMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    };
    SlideMenu.prototype.show = function (event) {
        this.preventDocumentDefault = true;
        this.moveOnTop();
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    };
    SlideMenu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    SlideMenu.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    SlideMenu.prototype.onClick = function (event) {
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.goBack = function () {
        this.left += this.menuWidth;
    };
    SlideMenu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            if (this.documentClickListener) {
                this.documentClickListener();
            }
            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "model");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "popup");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "style");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "styleClass");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "menuWidth");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "viewportHeight");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "effectDuration");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "easing");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "backLabel");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "appendTo");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "autoZIndex");
    __decorate([
        core_1.Input()
    ], SlideMenu.prototype, "baseZIndex");
    __decorate([
        core_1.ViewChild('container')
    ], SlideMenu.prototype, "containerViewChild");
    __decorate([
        core_1.ViewChild('backward')
    ], SlideMenu.prototype, "backwardViewChild");
    __decorate([
        core_1.ViewChild('slideMenuContent')
    ], SlideMenu.prototype, "slideMenuContentViewChild");
    SlideMenu = __decorate([
        core_1.Component({
            selector: 'p-slideMenu',
            template: "\n        <div #container [ngClass]=\"{'ui-slidemenu ui-widget ui-widget-content ui-corner-all':true, 'ui-slidemenu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\">\n            <div class=\"ui-slidemenu-wrapper\" [style.height.px]=\"viewportHeight\">\n                <div #slideMenuContent class=\"ui-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"ui-slidemenu-backward ui-widget-header ui-corner-all\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"ui-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        })
    ], SlideMenu);
    return SlideMenu;
}());
exports.SlideMenu = SlideMenu;
var SlideMenuModule = /** @class */ (function () {
    function SlideMenuModule() {
    }
    SlideMenuModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            exports: [SlideMenu, router_1.RouterModule],
            declarations: [SlideMenu, SlideMenuSub]
        })
    ], SlideMenuModule);
    return SlideMenuModule;
}());
exports.SlideMenuModule = SlideMenuModule;
