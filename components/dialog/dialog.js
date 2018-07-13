"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var idx = 0;
var Dialog = /** @class */ (function () {
    function Dialog(el, domHandler, renderer, zone) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.zone = zone;
        this.draggable = true;
        this.resizable = true;
        this.minWidth = 150;
        this.minHeight = 150;
        this.closeOnEscape = true;
        this.closable = true;
        this.responsive = true;
        this.showHeader = true;
        this.breakpoint = 640;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.minX = 0;
        this.minY = 0;
        this.focusOnShow = true;
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.visibleChange = new core_1.EventEmitter();
        this.id = "ui-dialog-" + idx++;
    }
    Object.defineProperty(Dialog.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
                if (this._visible)
                    this.show();
                else {
                    if (this.preventVisibleChangePropagation)
                        this.preventVisibleChangePropagation = false;
                    else
                        this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.ngAfterViewChecked = function () {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.positionOverlay();
            if (this.focusOnShow) {
                this.focus();
            }
            this.executePostDisplayActions = false;
        }
    };
    Dialog.prototype.focus = function () {
        var focusable = this.domHandler.findSingle(this.containerViewChild.nativeElement, 'button');
        if (focusable) {
            focusable.focus();
        }
    };
    Dialog.prototype.show = function () {
        this.executePostDisplayActions = true;
        this.moveOnTop();
        this.bindGlobalListeners();
        if (this.maximized) {
            this.domHandler.addClass(document.body, 'ui-overflow-hidden');
        }
        if (this.modal) {
            this.enableModality();
        }
    };
    Dialog.prototype.positionOverlay = function () {
        var viewport = this.domHandler.getViewport();
        if (this.domHandler.getOuterHeight(this.containerViewChild.nativeElement) > viewport.height) {
            this.contentViewChild.nativeElement.style.height = (viewport.height * .75) + 'px';
        }
        if (this.positionLeft >= 0 && this.positionTop >= 0) {
            this.containerViewChild.nativeElement.style.left = this.positionLeft + 'px';
            this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
        }
        else if (this.positionTop >= 0) {
            this.center();
            this.containerViewChild.nativeElement.style.top = this.positionTop + 'px';
        }
        else {
            this.center();
        }
    };
    Dialog.prototype.hide = function () {
        this.onHide.emit({});
        this.unbindMaskClickListener();
        this.unbindGlobalListeners();
        this.dragging = false;
        if (this.maximized) {
            this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
        if (this.modal) {
            this.disableModality();
        }
    };
    Dialog.prototype.close = function (event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Dialog.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        if (this.visible) {
            this.show();
        }
    };
    Dialog.prototype.center = function () {
        var elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
        var elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
        if (elementWidth == 0 && elementHeight == 0) {
            this.containerViewChild.nativeElement.style.visibility = 'hidden';
            this.containerViewChild.nativeElement.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            elementHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            this.containerViewChild.nativeElement.style.display = 'none';
            this.containerViewChild.nativeElement.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = Math.max(Math.floor((viewport.width - elementWidth) / 2), 0);
        var y = Math.max(Math.floor((viewport.height - elementHeight) / 2), 0);
        this.containerViewChild.nativeElement.style.left = x + 'px';
        this.containerViewChild.nativeElement.style.top = y + 'px';
    };
    Dialog.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            var maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            if (this.blockScroll) {
                maskStyleClass += ' ui-dialog-mask-scrollblocker';
            }
            this.domHandler.addMultipleClasses(this.mask, maskStyleClass);
            if (this.closable && this.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    _this.close(event);
                });
            }
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                this.domHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    };
    Dialog.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                var bodyChildren = document.body.children;
                var hasBlockerMasks = void 0;
                for (var i = 0; i < bodyChildren.length; i++) {
                    var bodyChild = bodyChildren[i];
                    if (this.domHandler.hasClass(bodyChild, 'ui-dialog-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }
                if (!hasBlockerMasks) {
                    this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
            }
            this.mask = null;
        }
    };
    Dialog.prototype.toggleMaximize = function (event) {
        if (this.maximized)
            this.revertMaximize();
        else
            this.maximize();
        event.preventDefault();
    };
    Dialog.prototype.maximize = function () {
        this.domHandler.addClass(this.containerViewChild.nativeElement, 'ui-dialog-maximized');
        this.preMaximizePageX = parseFloat(this.containerViewChild.nativeElement.style.top);
        this.preMaximizePageY = parseFloat(this.containerViewChild.nativeElement.style.left);
        this.preMaximizeContainerWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
        this.preMaximizeContainerHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
        this.preMaximizeContentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
        this.containerViewChild.nativeElement.style.top = '0px';
        this.containerViewChild.nativeElement.style.left = '0px';
        this.containerViewChild.nativeElement.style.width = '100vw';
        this.containerViewChild.nativeElement.style.height = '100vh';
        var diffHeight = this.domHandler.getOuterHeight(this.headerViewChild.nativeElement) + this.domHandler.getOuterHeight(this.footerViewChild.nativeElement) + parseFloat(this.containerViewChild.nativeElement.style.top);
        this.contentViewChild.nativeElement.style.height = 'calc(100vh - ' + diffHeight + 'px)';
        this.domHandler.addClass(document.body, 'ui-overflow-hidden');
        this.maximized = true;
    };
    Dialog.prototype.revertMaximize = function () {
        var _this = this;
        this.containerViewChild.nativeElement.style.top = this.preMaximizePageX + 'px';
        this.containerViewChild.nativeElement.style.left = this.preMaximizePageY + 'px';
        this.containerViewChild.nativeElement.style.width = this.preMaximizeContainerWidth + 'px';
        this.containerViewChild.nativeElement.style.height = this.preMaximizeContainerHeight + 'px';
        this.contentViewChild.nativeElement.style.height = this.preMaximizeContentHeight + 'px';
        this.domHandler.removeClass(document.body, 'ui-overflow-hidden');
        this.maximized = false;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () { return _this.domHandler.removeClass(_this.containerViewChild.nativeElement, 'ui-dialog-maximized'); }, 300);
        });
    };
    Dialog.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Dialog.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    Dialog.prototype.onCloseMouseDown = function (event) {
        this.closeIconMouseDown = true;
    };
    Dialog.prototype.initDrag = function (event) {
        if (this.closeIconMouseDown) {
            this.closeIconMouseDown = false;
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.domHandler.addClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.onDrag = function (event) {
        if (this.dragging) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var leftPos = parseInt(this.containerViewChild.nativeElement.style.left) + deltaX;
            var topPos = parseInt(this.containerViewChild.nativeElement.style.top) + deltaY;
            if (leftPos >= this.minX) {
                this.containerViewChild.nativeElement.style.left = leftPos + 'px';
            }
            if (topPos >= this.minY) {
                this.containerViewChild.nativeElement.style.top = topPos + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.endDrag = function (event) {
        if (this.draggable) {
            this.dragging = false;
            this.domHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.initResize = function (event) {
        if (this.resizable) {
            this.preWidth = null;
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.domHandler.addClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.onResize = function (event) {
        if (this.resizing) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var containerWidth = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
            var containerHeight = this.domHandler.getOuterHeight(this.containerViewChild.nativeElement);
            var contentHeight = this.domHandler.getOuterHeight(this.contentViewChild.nativeElement);
            var newWidth = containerWidth + deltaX;
            var newHeight = containerHeight + deltaY;
            if (newWidth > this.minWidth) {
                this.containerViewChild.nativeElement.style.width = newWidth + 'px';
            }
            if (newHeight > this.minHeight) {
                this.containerViewChild.nativeElement.style.height = newHeight + 'px';
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    };
    Dialog.prototype.onResizeEnd = function (event) {
        if (this.resizing) {
            this.resizing = false;
            this.domHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.bindGlobalListeners = function () {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.responsive) {
            this.bindDocumentResponsiveListener();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    };
    Dialog.prototype.unbindGlobalListeners = function () {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentResponsiveListener();
        this.unbindDocumentEscapeListener();
    };
    Dialog.prototype.bindDocumentDragListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentDragListener = _this.onDrag.bind(_this);
            window.document.addEventListener('mousemove', _this.documentDragListener);
        });
    };
    Dialog.prototype.unbindDocumentDragListener = function () {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    };
    Dialog.prototype.bindDocumentDragEndListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentDragEndListener = _this.endDrag.bind(_this);
            window.document.addEventListener('mouseup', _this.documentDragEndListener);
        });
    };
    Dialog.prototype.unbindDocumentDragEndListener = function () {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    };
    Dialog.prototype.bindDocumentResizeListeners = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentResizeListener = _this.onResize.bind(_this);
            _this.documentResizeEndListener = _this.onResizeEnd.bind(_this);
            window.document.addEventListener('mousemove', _this.documentResizeListener);
            window.document.addEventListener('mouseup', _this.documentResizeEndListener);
        });
    };
    Dialog.prototype.unbindDocumentResizeListeners = function () {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mouseup', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    };
    Dialog.prototype.bindDocumentResponsiveListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentResponsiveListener = _this.onWindowResize.bind(_this);
            window.addEventListener('resize', _this.documentResponsiveListener);
        });
    };
    Dialog.prototype.unbindDocumentResponsiveListener = function () {
        if (this.documentResponsiveListener) {
            window.removeEventListener('resize', this.documentResponsiveListener);
            this.documentResponsiveListener = null;
        }
    };
    Dialog.prototype.onWindowResize = function (event) {
        if (this.maximized) {
            return;
        }
        var viewport = this.domHandler.getViewport();
        var width = this.domHandler.getOuterWidth(this.containerViewChild.nativeElement);
        if (viewport.width <= this.breakpoint) {
            if (!this.preWidth) {
                this.preWidth = width;
            }
            this.containerViewChild.nativeElement.style.left = '0px';
            this.containerViewChild.nativeElement.style.width = '100%';
        }
        else {
            this.containerViewChild.nativeElement.style.width = this.preWidth + 'px';
            this.positionOverlay();
        }
    };
    Dialog.prototype.bindDocumentEscapeListener = function () {
        var _this = this;
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event.which == 27) {
                if (parseInt(_this.containerViewChild.nativeElement.style.zIndex) == domhandler_1.DomHandler.zindex) {
                    _this.close(event);
                }
            }
        });
    };
    Dialog.prototype.unbindDocumentEscapeListener = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    };
    Dialog.prototype.ngOnDestroy = function () {
        this.initialized = false;
        this.disableModality();
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindMaskClickListener();
    };
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "header");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "draggable");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "resizable");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "minWidth");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "minHeight");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "width");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "height");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "positionLeft");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "positionTop");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "contentStyle");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "modal");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "closeOnEscape");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "dismissableMask");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "rtl");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "closable");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "responsive");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "appendTo");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "style");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "styleClass");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "showHeader");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "breakpoint");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "blockScroll");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "autoZIndex");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "baseZIndex");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "minX");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "minY");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "focusOnShow");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "maximizable");
    __decorate([
        core_1.ContentChildren(shared_1.Header, { descendants: false })
    ], Dialog.prototype, "headerFacet");
    __decorate([
        core_1.ContentChildren(shared_1.Footer, { descendants: false })
    ], Dialog.prototype, "footerFacet");
    __decorate([
        core_1.ViewChild('container')
    ], Dialog.prototype, "containerViewChild");
    __decorate([
        core_1.ViewChild('titlebar')
    ], Dialog.prototype, "headerViewChild");
    __decorate([
        core_1.ViewChild('content')
    ], Dialog.prototype, "contentViewChild");
    __decorate([
        core_1.ViewChild('footer')
    ], Dialog.prototype, "footerViewChild");
    __decorate([
        core_1.Output()
    ], Dialog.prototype, "onShow");
    __decorate([
        core_1.Output()
    ], Dialog.prototype, "onHide");
    __decorate([
        core_1.Output()
    ], Dialog.prototype, "visibleChange");
    __decorate([
        core_1.Input()
    ], Dialog.prototype, "visible");
    Dialog = __decorate([
        core_1.Component({
            selector: 'p-dialog',
            template: "\n        <div #container [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}\"\n            [ngStyle]=\"style\" [class]=\"styleClass\" [style.width.px]=\"width\" [style.height.px]=\"height\" [style.minWidth.px]=\"minWidth\" [style.minHeight.px]=\"minHeight\" (mousedown)=\"moveOnTop()\" [@dialogState]=\"visible ? 'visible' : 'hidden'\"\n            role=\"dialog\" [attr.aria-labelledby]=\"id + '-label'\">\n            <div #titlebar class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\"\n                (mousedown)=\"initDrag($event)\" *ngIf=\"showHeader\">\n                <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"headerFacet && headerFacet.first\">\n                    <ng-content select=\"p-header\"></ng-content>\n                </span>\n                <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"close($event)\" (mousedown)=\"onCloseMouseDown($event)\">\n                    <span class=\"pi pi-times\"></span>\n                </a>\n                <a *ngIf=\"maximizable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}\" href=\"#\" role=\"button\" (click)=\"toggleMaximize($event)\">\n                    <span [ngClass]=\"maximized ? 'pi pi-window-minimize' : 'pi pi-window-maximize'\"></span>\n                </a>\n            </div>\n            <div #content class=\"ui-dialog-content ui-widget-content\" [ngStyle]=\"contentStyle\">\n                <ng-content></ng-content>\n            </div>\n            <div #footer class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footerFacet && footerFacet.first\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n            <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\"\n                (mousedown)=\"initResize($event)\"></div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('dialogState', [
                    animations_1.state('hidden', animations_1.style({
                        transform: 'translate3d(0, 25%, 0)',
                        opacity: 0,
                        display: 'none'
                    })),
                    animations_1.state('visible', animations_1.style({
                        display: 'block',
                        transform: 'none',
                        opacity: 1
                    })),
                    animations_1.state('void', animations_1.style({
                        transform: 'translate3d(0, 25%, 0) scale(0.9)',
                        opacity: 0
                    })),
                    animations_1.transition('* => *', animations_1.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
                ])
            ],
            providers: [domhandler_1.DomHandler]
        })
    ], Dialog);
    return Dialog;
}());
exports.Dialog = Dialog;
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Dialog, shared_1.SharedModule],
            declarations: [Dialog]
        })
    ], DialogModule);
    return DialogModule;
}());
exports.DialogModule = DialogModule;
