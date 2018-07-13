"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var Card = /** @class */ (function () {
    function Card(el) {
        this.el = el;
    }
    Card.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Card.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-card',
                    template: "\n        <div [ngClass]=\"'ui-card ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-card-header\" *ngIf=\"headerFacet\">\n               <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div class=\"ui-card-body\">\n                <div class=\"ui-card-title\" *ngIf=\"title\">{{title}}</div>\n                <div class=\"ui-card-subtitle\" *ngIf=\"subtitle\">{{subtitle}}</div>\n                <div class=\"ui-card-content\">\n                    <ng-content></ng-content>\n                </div>\n                <div class=\"ui-card-footer\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    Card.ctorParameters = function () { return [
        { type: core_1.ElementRef }
    ]; };
    Card.propDecorators = {
        title: [{ type: core_1.Input }],
        subtitle: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        headerFacet: [{ type: core_1.ContentChild, args: [shared_1.Header,] }],
        footerFacet: [{ type: core_1.ContentChild, args: [shared_1.Footer,] }]
    };
    return Card;
}());
exports.Card = Card;
var CardModule = /** @class */ (function () {
    function CardModule() {
    }
    CardModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Card, shared_1.SharedModule],
                    declarations: [Card]
                },] },
    ];
    return CardModule;
}());
exports.CardModule = CardModule;
//# sourceMappingURL=card.js.map