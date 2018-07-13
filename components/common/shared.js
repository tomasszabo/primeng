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
var core_2 = require("@angular/core");
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate([
        core_2.Component({
            selector: 'p-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
exports.Header = Header;
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate([
        core_2.Component({
            selector: 'p-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
exports.Footer = Footer;
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    __decorate([
        core_1.Input()
    ], PrimeTemplate.prototype, "type");
    __decorate([
        core_1.Input('pTemplate')
    ], PrimeTemplate.prototype, "name");
    PrimeTemplate = __decorate([
        core_1.Directive({
            selector: '[pTemplate]',
            host: {}
        })
    ], PrimeTemplate);
    return PrimeTemplate;
}());
exports.PrimeTemplate = PrimeTemplate;
/* Deprecated */
var Column = /** @class */ (function () {
    function Column() {
        this.filterType = 'text';
        this.exportable = true;
        this.resizable = true;
        this.sortFunction = new core_1.EventEmitter();
    }
    Column.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'filter':
                    _this.filterTemplate = item.template;
                    break;
                case 'editor':
                    _this.editorTemplate = item.template;
                    break;
                default:
                    _this.bodyTemplate = item.template;
                    break;
            }
        });
    };
    __decorate([
        core_1.Input()
    ], Column.prototype, "field");
    __decorate([
        core_1.Input()
    ], Column.prototype, "colId");
    __decorate([
        core_1.Input()
    ], Column.prototype, "sortField");
    __decorate([
        core_1.Input()
    ], Column.prototype, "filterField");
    __decorate([
        core_1.Input()
    ], Column.prototype, "header");
    __decorate([
        core_1.Input()
    ], Column.prototype, "footer");
    __decorate([
        core_1.Input()
    ], Column.prototype, "sortable");
    __decorate([
        core_1.Input()
    ], Column.prototype, "editable");
    __decorate([
        core_1.Input()
    ], Column.prototype, "filter");
    __decorate([
        core_1.Input()
    ], Column.prototype, "filterMatchMode");
    __decorate([
        core_1.Input()
    ], Column.prototype, "filterType");
    __decorate([
        core_1.Input()
    ], Column.prototype, "excludeGlobalFilter");
    __decorate([
        core_1.Input()
    ], Column.prototype, "rowspan");
    __decorate([
        core_1.Input()
    ], Column.prototype, "colspan");
    __decorate([
        core_1.Input()
    ], Column.prototype, "scope");
    __decorate([
        core_1.Input()
    ], Column.prototype, "style");
    __decorate([
        core_1.Input()
    ], Column.prototype, "styleClass");
    __decorate([
        core_1.Input()
    ], Column.prototype, "exportable");
    __decorate([
        core_1.Input()
    ], Column.prototype, "headerStyle");
    __decorate([
        core_1.Input()
    ], Column.prototype, "headerStyleClass");
    __decorate([
        core_1.Input()
    ], Column.prototype, "bodyStyle");
    __decorate([
        core_1.Input()
    ], Column.prototype, "bodyStyleClass");
    __decorate([
        core_1.Input()
    ], Column.prototype, "footerStyle");
    __decorate([
        core_1.Input()
    ], Column.prototype, "footerStyleClass");
    __decorate([
        core_1.Input()
    ], Column.prototype, "hidden");
    __decorate([
        core_1.Input()
    ], Column.prototype, "expander");
    __decorate([
        core_1.Input()
    ], Column.prototype, "selectionMode");
    __decorate([
        core_1.Input()
    ], Column.prototype, "filterPlaceholder");
    __decorate([
        core_1.Input()
    ], Column.prototype, "filterMaxlength");
    __decorate([
        core_1.Input()
    ], Column.prototype, "frozen");
    __decorate([
        core_1.Input()
    ], Column.prototype, "resizable");
    __decorate([
        core_1.Output()
    ], Column.prototype, "sortFunction");
    __decorate([
        core_1.ContentChildren(PrimeTemplate)
    ], Column.prototype, "templates");
    __decorate([
        core_1.ContentChild(core_1.TemplateRef)
    ], Column.prototype, "template");
    Column = __decorate([
        core_2.Component({
            selector: 'p-column',
            template: ''
        })
    ], Column);
    return Column;
}());
exports.Column = Column;
/* Deprecated */
var Row = /** @class */ (function () {
    function Row() {
    }
    __decorate([
        core_1.ContentChildren(Column)
    ], Row.prototype, "columns");
    Row = __decorate([
        core_2.Component({
            selector: 'p-row',
            template: ""
        })
    ], Row);
    return Row;
}());
exports.Row = Row;
/* Deprecated */
var HeaderColumnGroup = /** @class */ (function () {
    function HeaderColumnGroup() {
    }
    __decorate([
        core_1.Input()
    ], HeaderColumnGroup.prototype, "frozen");
    __decorate([
        core_1.ContentChildren(Row)
    ], HeaderColumnGroup.prototype, "rows");
    HeaderColumnGroup = __decorate([
        core_2.Component({
            selector: 'p-headerColumnGroup',
            template: ""
        })
    ], HeaderColumnGroup);
    return HeaderColumnGroup;
}());
exports.HeaderColumnGroup = HeaderColumnGroup;
/* Deprecated */
var FooterColumnGroup = /** @class */ (function () {
    function FooterColumnGroup() {
    }
    __decorate([
        core_1.Input()
    ], FooterColumnGroup.prototype, "frozen");
    __decorate([
        core_1.ContentChildren(Row)
    ], FooterColumnGroup.prototype, "rows");
    FooterColumnGroup = __decorate([
        core_2.Component({
            selector: 'p-footerColumnGroup',
            template: ""
        })
    ], FooterColumnGroup);
    return FooterColumnGroup;
}());
exports.FooterColumnGroup = FooterColumnGroup;
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup],
            declarations: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
