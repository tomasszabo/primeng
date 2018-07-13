"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var button_1 = require("../button/button");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var SplitButton = /** @class */ (function () {
    function SplitButton(el, domHandler, renderer, router, cd) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.cd = cd;
        this.iconPos = 'left';
        this.onClick = new core_1.EventEmitter();
        this.onDropdownClick = new core_1.EventEmitter();
        this.menuVisible = false;
    }
    SplitButton.prototype.ngAfterViewInit = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlayViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.overlayViewChild.nativeElement, this.appendTo);
        }
    };
    SplitButton.prototype.ngAfterViewChecked = function () {
        if (this.shown) {
            this.onShow();
            this.shown = false;
        }
    };
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.itemClick = function (event, item) {
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
        this.menuVisible = false;
    };
    SplitButton.prototype.show = function () {
        this.shown = true;
        this.menuVisible = !this.menuVisible;
        this.alignPanel();
        this.overlayViewChild.nativeElement.style.zIndex = String(++domhandler_1.DomHandler.zindex);
    };
    SplitButton.prototype.onShow = function () {
        this.alignPanel();
        this.bindDocumentClickListener();
    };
    SplitButton.prototype.onDropdownButtonClick = function (event) {
        this.onDropdownClick.emit(event);
        this.dropdownClick = true;
        this.show();
    };
    SplitButton.prototype.alignPanel = function () {
        if (this.appendTo)
            this.domHandler.absolutePosition(this.overlayViewChild.nativeElement, this.containerViewChild.nativeElement);
        else
            this.domHandler.relativePosition(this.overlayViewChild.nativeElement, this.containerViewChild.nativeElement);
    };
    SplitButton.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (_this.dropdownClick) {
                    _this.dropdownClick = false;
                }
                else {
                    _this.menuVisible = false;
                    _this.unbindDocumentClickListener();
                    _this.cd.markForCheck();
                }
            });
        }
    };
    SplitButton.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    SplitButton.prototype.ngOnDestroy = function () {
        this.unbindDocumentClickListener();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.overlayViewChild.nativeElement);
        }
    };
    SplitButton.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-splitButton',
                    template: "\n        <div #container [ngClass]=\"{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" [cornerStyleClass]=\"dir === 'rtl' ? 'ui-corner-right': 'ui-corner-left'\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </button><button type=\"button\" pButton class=\"ui-splitbutton-menubutton\" icon=\"pi pi-caret-down\" [cornerStyleClass]=\"dir === 'rtl' ? 'ui-corner-left': 'ui-corner-right'\" (click)=\"onDropdownButtonClick($event)\" [disabled]=\"disabled\"></button>\n            <div #overlay [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\" [@overlayState]=\"menuVisible ? 'visible' : 'hidden'\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <ng-template ngFor let-item [ngForOf]=\"model\">\n                        <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngIf=\"item.visible !== false\">\n                            <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\"\n                                [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                <span [ngClass]=\"'ui-menuitem-icon'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                                <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                            </a>\n                            <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\"\n                                class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                <span [ngClass]=\"'ui-menuitem-icon'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                                <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                            </a>\n                        </li>\n                    </ng-template>\n                </ul>\n            </div>\n        </div>\n    ",
                    animations: [
                        animations_1.trigger('overlayState', [
                            animations_1.state('hidden', animations_1.style({
                                opacity: 0
                            })),
                            animations_1.state('visible', animations_1.style({
                                opacity: 1
                            })),
                            animations_1.transition('visible => hidden', animations_1.animate('400ms ease-in')),
                            animations_1.transition('hidden => visible', animations_1.animate('400ms ease-out'))
                        ])
                    ],
                    providers: [domhandler_1.DomHandler]
                },] },
    ];
    /** @nocollapse */
    SplitButton.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler },
        { type: core_1.Renderer2 },
        { type: router_1.Router },
        { type: core_1.ChangeDetectorRef }
    ]; };
    SplitButton.propDecorators = {
        model: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconPos: [{ type: core_1.Input }],
        label: [{ type: core_1.Input }],
        onClick: [{ type: core_1.Output }],
        onDropdownClick: [{ type: core_1.Output }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        menuStyle: [{ type: core_1.Input }],
        menuStyleClass: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        appendTo: [{ type: core_1.Input }],
        dir: [{ type: core_1.Input }],
        containerViewChild: [{ type: core_1.ViewChild, args: ['container',] }],
        buttonViewChild: [{ type: core_1.ViewChild, args: ['defaultbtn',] }],
        overlayViewChild: [{ type: core_1.ViewChild, args: ['overlay',] }]
    };
    return SplitButton;
}());
exports.SplitButton = SplitButton;
var SplitButtonModule = /** @class */ (function () {
    function SplitButtonModule() {
    }
    SplitButtonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, button_1.ButtonModule, router_2.RouterModule],
                    exports: [SplitButton, button_1.ButtonModule, router_2.RouterModule],
                    declarations: [SplitButton]
                },] },
    ];
    return SplitButtonModule;
}());
exports.SplitButtonModule = SplitButtonModule;
//# sourceMappingURL=splitbutton.js.map