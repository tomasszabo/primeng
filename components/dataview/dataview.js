"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var objectutils_1 = require("../utils/objectutils");
var shared_1 = require("../common/shared");
var paginator_1 = require("../paginator/paginator");
var DataView = /** @class */ (function () {
    function DataView(el, objectUtils) {
        this.el = el;
        this.objectUtils = objectUtils;
        this.layout = 'list';
        this.pageLinks = 5;
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new core_1.EventEmitter();
        this.trackBy = function (index, item) { return item; };
        this.loadingIcon = 'pi pi-spinner';
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.first = 0;
        this._sortOrder = 1;
    }
    DataView.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    };
    Object.defineProperty(DataView.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataView.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    DataView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'listItem':
                    _this.listItemTemplate = item.template;
                    break;
                case 'gridItem':
                    _this.gridItemTemplate = item.template;
                    break;
            }
        });
        this.updateItemTemplate();
    };
    DataView.prototype.updateItemTemplate = function () {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
                break;
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
                break;
        }
    };
    Object.defineProperty(DataView.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.updateTotalRecords();
        },
        enumerable: true,
        configurable: true
    });
    DataView.prototype.changeLayout = function (layout) {
        this.layout = layout;
        this.updateItemTemplate();
    };
    DataView.prototype.updateTotalRecords = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    };
    DataView.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataView.prototype.sort = function () {
        var _this = this;
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort(function (data1, data2) {
                var value1 = _this.objectUtils.resolveFieldData(data1, _this.sortField);
                var value2 = _this.objectUtils.resolveFieldData(data2, _this.sortField);
                var result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2);
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (_this.sortOrder * result);
            });
        }
        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    };
    DataView.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    DataView.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    DataView.prototype.filter = function (value) {
        if (this.value && this.value.length) {
            var searchFields = this.filterBy.split(',');
            this.filteredValue = this.objectUtils.filter(this.value, searchFields, value);
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
        }
    };
    DataView.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-dataView',
                    template: "\n        <div [ngClass]=\"{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-dataview-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-dataview-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div class=\"ui-dataview-header ui-widget-header ui-corner-top\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div class=\"ui-dataview-content ui-widget-content\">\n                <div class=\"ui-g\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"ui-widget-content ui-g-12\">{{emptyMessage}}</div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\"></p-paginator>\n            <div class=\"ui-dataview-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
                    providers: [objectutils_1.ObjectUtils]
                },] },
    ];
    /** @nocollapse */
    DataView.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: objectutils_1.ObjectUtils }
    ]; };
    DataView.propDecorators = {
        layout: [{ type: core_1.Input }],
        paginator: [{ type: core_1.Input }],
        rows: [{ type: core_1.Input }],
        totalRecords: [{ type: core_1.Input }],
        pageLinks: [{ type: core_1.Input }],
        rowsPerPageOptions: [{ type: core_1.Input }],
        paginatorPosition: [{ type: core_1.Input }],
        alwaysShowPaginator: [{ type: core_1.Input }],
        paginatorDropdownAppendTo: [{ type: core_1.Input }],
        lazy: [{ type: core_1.Input }],
        emptyMessage: [{ type: core_1.Input }],
        onLazyLoad: [{ type: core_1.Output }],
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        filterBy: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        loadingIcon: [{ type: core_1.Input }],
        onPage: [{ type: core_1.Output }],
        onSort: [{ type: core_1.Output }],
        header: [{ type: core_1.ContentChild, args: [shared_1.Header,] }],
        footer: [{ type: core_1.ContentChild, args: [shared_1.Footer,] }],
        templates: [{ type: core_1.ContentChildren, args: [shared_1.PrimeTemplate,] }],
        sortField: [{ type: core_1.Input }],
        sortOrder: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }]
    };
    return DataView;
}());
exports.DataView = DataView;
var DataViewLayoutOptions = /** @class */ (function () {
    function DataViewLayoutOptions(dv) {
        this.dv = dv;
    }
    DataViewLayoutOptions.prototype.changeLayout = function (event, layout) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    };
    DataViewLayoutOptions.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'p-dataViewLayoutOptions',
                    template: "\n        <div [ngClass]=\"'ui-dataview-layout-options ui-selectbutton ui-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <a href=\"#\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'list')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'list'}\">\n                <i class=\"pi pi-bars ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a><a href=\"#\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'grid')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'grid'}\">\n                <i class=\"pi pi-th-large ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DataViewLayoutOptions.ctorParameters = function () { return [
        { type: DataView }
    ]; };
    DataViewLayoutOptions.propDecorators = {
        style: [{ type: core_1.Input }],
        styleClass: [{ type: core_1.Input }]
    };
    return DataViewLayoutOptions;
}());
exports.DataViewLayoutOptions = DataViewLayoutOptions;
var DataViewModule = /** @class */ (function () {
    function DataViewModule() {
    }
    DataViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, shared_1.SharedModule, paginator_1.PaginatorModule],
                    exports: [DataView, shared_1.SharedModule, DataViewLayoutOptions],
                    declarations: [DataView, DataViewLayoutOptions]
                },] },
    ];
    return DataViewModule;
}());
exports.DataViewModule = DataViewModule;
//# sourceMappingURL=dataview.js.map