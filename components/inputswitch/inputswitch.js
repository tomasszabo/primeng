"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var domhandler_1 = require("../dom/domhandler");
exports.INPUTSWITCH_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputSwitch; }),
    multi: true
};
var InputSwitch = /** @class */ (function () {
    function InputSwitch(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.ariaLabelTemplate = "InputSwitch {0}";
        this.onChange = new core_1.EventEmitter();
        this.checked = false;
        this.focused = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.initialized = false;
    }
    InputSwitch.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.handle = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-inputswitch-handle');
        this.onContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-on');
        this.offContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-off');
        this.onLabelChild = this.domHandler.findSingle(this.onContainer, 'span.ui-inputswitch-onlabel');
        this.offLabelChild = this.domHandler.findSingle(this.offContainer, 'span.ui-inputswitch-offlabel');
    };
    InputSwitch.prototype.ngAfterViewChecked = function () {
        if (this.container && this.container.offsetParent && !this.initialized) {
            this.render();
        }
    };
    InputSwitch.prototype.render = function () {
        var onContainerWidth = this.domHandler.width(this.onContainer), offContainerWidth = this.domHandler.width(this.offContainer), spanPadding = this.domHandler.innerWidth(this.offLabelChild) - this.domHandler.width(this.offLabelChild), handleMargins = this.domHandler.getOuterWidth(this.handle) - this.domHandler.innerWidth(this.handle);
        var containerWidth = (onContainerWidth > offContainerWidth) ? onContainerWidth : offContainerWidth, handleWidth = containerWidth;
        this.handle.style.width = handleWidth + 'px';
        handleWidth = this.domHandler.width(this.handle);
        containerWidth = containerWidth + handleWidth + 6;
        var labelWidth = containerWidth - handleWidth - spanPadding - handleMargins;
        this.container.style.width = containerWidth + 'px';
        this.onLabelChild.style.width = labelWidth + 'px';
        this.offLabelChild.style.width = labelWidth + 'px';
        //position
        this.offContainer.style.width = (this.domHandler.width(this.container) - 5) + 'px';
        this.offset = this.domHandler.width(this.container) - this.domHandler.getOuterWidth(this.handle);
        //default value
        if (this.checked) {
            this.handle.style.left = this.offset + 'px';
            this.onContainer.style.width = this.offset + 'px';
            this.offLabelChild.style.marginRight = -this.offset + 'px';
        }
        else {
            this.onContainer.style.width = 0 + 'px';
            this.onLabelChild.style.marginLeft = -this.offset + 'px';
        }
        this.initialized = true;
    };
    InputSwitch.prototype.toggle = function (event, checkbox) {
        if (!this.disabled) {
            if (this.checked) {
                this.checked = false;
                this.uncheckUI();
            }
            else {
                this.checked = true;
                this.checkUI();
            }
            this.onModelChange(this.checked);
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            checkbox.focus();
        }
    };
    InputSwitch.prototype.checkUI = function () {
        this.onContainer.style.width = this.offset + 'px';
        this.onLabelChild.style.marginLeft = 0 + 'px';
        this.offLabelChild.style.marginRight = -this.offset + 'px';
        this.handle.style.left = this.offset + 'px';
        this.updateAriaLabel();
    };
    InputSwitch.prototype.uncheckUI = function () {
        this.onContainer.style.width = 0 + 'px';
        this.onLabelChild.style.marginLeft = -this.offset + 'px';
        this.offLabelChild.style.marginRight = 0 + 'px';
        this.handle.style.left = 0 + 'px';
        this.updateAriaLabel();
    };
    InputSwitch.prototype.onFocus = function (event) {
        this.focused = true;
    };
    InputSwitch.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    InputSwitch.prototype.writeValue = function (checked) {
        this.checked = checked;
        if (this.initialized) {
            if (this.checked === true)
                this.checkUI();
            else
                this.uncheckUI();
        }
    };
    InputSwitch.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputSwitch.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    InputSwitch.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    InputSwitch.prototype.updateAriaLabel = function () {
        var pattern = /{(.*?)}/, value = this.checked ? this.onLabel : this.offLabel;
        this.ariaLabel = this.ariaLabelTemplate.replace(this.ariaLabelTemplate.match(pattern)[0], value);
    };
    InputSwitch.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-inputSwitch',
                    template: "\n        <div [ngClass]=\"{'ui-inputswitch ui-widget ui-widget-content ui-corner-all': true,\n            'ui-state-disabled': disabled,'ui-inputswitch-checked':checked, 'ui-state-focus':focused}\" (click)=\"toggle($event, in)\"\n            [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inputswitch-off\">\n                <span class=\"ui-inputswitch-offlabel\">{{offLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-on\">\n                <span class=\"ui-inputswitch-onlabel\">{{onLabel}}</span>\n            </div>\n            <div [ngClass]=\"{'ui-inputswitch-handle ui-state-default':true, 'ui-state-focus':focused}\"></div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"checkbox\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" aria-live=\"polite\" [attr.id]=\"inputId\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" readonly=\"readonly\" [attr.tabindex]=\"tabindex\"/>\n            </div>\n        </div>\n    ",
                    providers: [exports.INPUTSWITCH_VALUE_ACCESSOR, domhandler_1.DomHandler]
                },] },
    ];
    /** @nocollapse */
    InputSwitch.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: domhandler_1.DomHandler }
    ]; };
    InputSwitch.propDecorators = {
        onLabel: [{ type: core_1.Input }],
        offLabel: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        inputId: [{ type: core_1.Input }],
        ariaLabelTemplate: [{ type: core_1.Input }],
        onChange: [{ type: core_1.Output }]
    };
    return InputSwitch;
}());
exports.InputSwitch = InputSwitch;
var InputSwitchModule = /** @class */ (function () {
    function InputSwitchModule() {
    }
    InputSwitchModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [InputSwitch],
                    declarations: [InputSwitch]
                },] },
    ];
    return InputSwitchModule;
}());
exports.InputSwitchModule = InputSwitchModule;
//# sourceMappingURL=inputswitch.js.map