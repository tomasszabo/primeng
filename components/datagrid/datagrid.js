"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var paginator_1 = require("../paginator/paginator");
var DataGrid = /** @class */ (function () {
    function DataGrid(el, differs) {
        this.el = el;
        this.differs = differs;
        this.pageLinks = 5;
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new core_1.EventEmitter();
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.trackBy = function (index, item) { return item; };
        this.immutable = true;
        this.onPage = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    DataGrid.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataGrid.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(DataGrid.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.immutable) {
                this.handleDataChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    DataGrid.prototype.handleDataChange = function () {
        if (this.paginator) {
            this.updatePaginator();
        }
        this.updateDataToRender(this.value);
    };
    DataGrid.prototype.ngDoCheck = function () {
        if (!this.immutable) {
            var changes = this.differ.diff(this.value);
            if (changes) {
                this.handleDataChange();
            }
        }
    };
    DataGrid.prototype.updatePaginator = function () {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        //first
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataGrid.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataGrid.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataGrid.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataGrid.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataGrid.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    DataGrid.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-dataGrid',
                    template: "\n        <div [ngClass]=\"'ui-datagrid ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datagrid-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div class=\"ui-datagrid-content ui-widget-content\">\n                <div class=\"ui-g\">\n                    <ng-template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\" [ngForTrackBy]=\"trackBy\"></ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"ui-widget-content ui-g-12\">{{emptyMessage}}</div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div class=\"ui-datagrid-footer ui-widget-footer ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DataGrid.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.IterableDiffers }
    ]; };
    DataGrid.propDecorators = {
        paginator: [{ type: core_1.Input }],
        rows: [{ type: core_1.Input }],
        totalRecords: [{ type: core_1.Input }],
        pageLinks: [{ type: core_1.Input }],
        rowsPerPageOptions: [{ type: core_1.Input }],
        lazy: [{ type: core_1.Input }],
        emptyMessage: [{ type: core_1.Input }],
        onLazyLoad: [{ type: core_1.Output }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        paginatorPosition: [{ type: core_1.Input }],
        alwaysShowPaginator: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        immutable: [{ type: core_1.Input }],
        paginatorDropdownAppendTo: [{ type: core_1.Input }],
        onPage: [{ type: core_1.Output }],
        header: [{ type: core_1.ContentChild, args: [shared_1.Header,] }],
        footer: [{ type: core_1.ContentChild, args: [shared_1.Footer,] }],
        templates: [{ type: core_1.ContentChildren, args: [shared_1.PrimeTemplate,] }],
        value: [{ type: core_1.Input }]
    };
    return DataGrid;
}());
exports.DataGrid = DataGrid;
var DataGridModule = /** @class */ (function () {
    function DataGridModule() {
    }
    DataGridModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, shared_1.SharedModule, paginator_1.PaginatorModule],
                    exports: [DataGrid, shared_1.SharedModule],
                    declarations: [DataGrid]
                },] },
    ];
    return DataGridModule;
}());
exports.DataGridModule = DataGridModule;
//# sourceMappingURL=datagrid.js.map