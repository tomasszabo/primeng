"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var core_2 = require("@angular/core");
var Header = /** @class */ (function () {
    function Header() {
    }
    Header.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'p-header',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return Header;
}());
exports.Header = Header;
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'p-footer',
                    template: '<ng-content></ng-content>'
                },] },
    ];
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
    PrimeTemplate.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[pTemplate]',
                    host: {}
                },] },
    ];
    /** @nocollapse */
    PrimeTemplate.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    PrimeTemplate.propDecorators = {
        type: [{ type: core_1.Input }],
        name: [{ type: core_1.Input, args: ['pTemplate',] }]
    };
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
    Column.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'p-column',
                    template: ''
                },] },
    ];
    Column.propDecorators = {
        field: [{ type: core_1.Input }],
        colId: [{ type: core_1.Input }],
        sortField: [{ type: core_1.Input }],
        filterField: [{ type: core_1.Input }],
        header: [{ type: core_1.Input }],
        footer: [{ type: core_1.Input }],
        sortable: [{ type: core_1.Input }],
        editable: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        filterMatchMode: [{ type: core_1.Input }],
        filterType: [{ type: core_1.Input }],
        excludeGlobalFilter: [{ type: core_1.Input }],
        rowspan: [{ type: core_1.Input }],
        colspan: [{ type: core_1.Input }],
        scope: [{ type: core_1.Input }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        exportable: [{ type: core_1.Input }],
        headerStyle: [{ type: core_1.Input }],
        headerStyleClass: [{ type: core_1.Input }],
        bodyStyle: [{ type: core_1.Input }],
        bodyStyleClass: [{ type: core_1.Input }],
        footerStyle: [{ type: core_1.Input }],
        footerStyleClass: [{ type: core_1.Input }],
        hidden: [{ type: core_1.Input }],
        expander: [{ type: core_1.Input }],
        selectionMode: [{ type: core_1.Input }],
        filterPlaceholder: [{ type: core_1.Input }],
        filterMaxlength: [{ type: core_1.Input }],
        frozen: [{ type: core_1.Input }],
        resizable: [{ type: core_1.Input }],
        sortFunction: [{ type: core_1.Output }],
        templates: [{ type: core_1.ContentChildren, args: [PrimeTemplate,] }],
        template: [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] }]
    };
    return Column;
}());
exports.Column = Column;
/* Deprecated */
var Row = /** @class */ (function () {
    function Row() {
    }
    Row.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'p-row',
                    template: ""
                },] },
    ];
    Row.propDecorators = {
        columns: [{ type: core_1.ContentChildren, args: [Column,] }]
    };
    return Row;
}());
exports.Row = Row;
/* Deprecated */
var HeaderColumnGroup = /** @class */ (function () {
    function HeaderColumnGroup() {
    }
    HeaderColumnGroup.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'p-headerColumnGroup',
                    template: ""
                },] },
    ];
    HeaderColumnGroup.propDecorators = {
        frozen: [{ type: core_1.Input }],
        rows: [{ type: core_1.ContentChildren, args: [Row,] }]
    };
    return HeaderColumnGroup;
}());
exports.HeaderColumnGroup = HeaderColumnGroup;
/* Deprecated */
var FooterColumnGroup = /** @class */ (function () {
    function FooterColumnGroup() {
    }
    FooterColumnGroup.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'p-footerColumnGroup',
                    template: ""
                },] },
    ];
    FooterColumnGroup.propDecorators = {
        frozen: [{ type: core_1.Input }],
        rows: [{ type: core_1.ContentChildren, args: [Row,] }]
    };
    return FooterColumnGroup;
}());
exports.FooterColumnGroup = FooterColumnGroup;
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup],
                    declarations: [Header, Footer, Column, PrimeTemplate, Row, HeaderColumnGroup, FooterColumnGroup]
                },] },
    ];
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.js.map