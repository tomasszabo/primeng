"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var datagrid_1 = require("./datagrid");
var animations_1 = require("@angular/platform-browser/animations");
describe('DataGrid', function () {
    var datagrid;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                datagrid_1.DataGrid
            ]
        });
        fixture = testing_1.TestBed.createComponent(datagrid_1.DataGrid);
        datagrid = fixture.componentInstance;
    });
});
//# sourceMappingURL=datagrid.spec.js.map