"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
exports.RATING_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Rating; }),
    multi: true
};
var Rating = /** @class */ (function () {
    function Rating(cd) {
        this.cd = cd;
        this.stars = 5;
        this.cancel = true;
        this.iconOnClass = 'pi pi-star';
        this.iconOffClass = 'pi pi-star-o';
        this.iconCancelClass = 'pi pi-ban';
        this.onRate = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Rating.prototype.ngOnInit = function () {
        this.starsArray = [];
        for (var i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    };
    Rating.prototype.rate = function (event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    };
    Rating.prototype.clear = function (event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    };
    Rating.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.detectChanges();
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Rating.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Rating.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Rating.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-rating',
                    template: "\n        <div class=\"ui-rating\" [ngClass]=\"{'ui-state-disabled': disabled}\">\n            <a href=\"#\" *ngIf=\"cancel\" (click)=\"clear($event)\" class=\"ui-rating-cancel\">\n                <span class=\"ui-rating-icon\" [ngClass]=\"iconCancelClass\" [ngStyle]=\"iconCancelStyle\"></span>\n            </a>\n            <a href=\"#\" *ngFor=\"let star of starsArray;let i=index\" (click)=\"rate($event,i)\">\n                <span class=\"ui-rating-icon\" \n                    [ngClass]=\"(!value || i >= value) ? iconOffClass : iconOnClass\"\n                    [ngStyle]=\"(!value || i >= value) ? iconOffStyle : iconOnStyle\"\n                ></span>\n            </a>\n        </div>\n    ",
                    providers: [exports.RATING_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    Rating.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef }
    ]; };
    Rating.propDecorators = {
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        stars: [{ type: core_1.Input }],
        cancel: [{ type: core_1.Input }],
        iconOnClass: [{ type: core_1.Input }],
        iconOnStyle: [{ type: core_1.Input }],
        iconOffClass: [{ type: core_1.Input }],
        iconOffStyle: [{ type: core_1.Input }],
        iconCancelClass: [{ type: core_1.Input }],
        iconCancelStyle: [{ type: core_1.Input }],
        onRate: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }]
    };
    return Rating;
}());
exports.Rating = Rating;
var RatingModule = /** @class */ (function () {
    function RatingModule() {
    }
    RatingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Rating],
                    declarations: [Rating]
                },] },
    ];
    return RatingModule;
}());
exports.RatingModule = RatingModule;
//# sourceMappingURL=rating.js.map