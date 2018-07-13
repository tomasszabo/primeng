"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var datatable_1 = require("./datatable");
var animations_1 = require("@angular/platform-browser/animations");
describe('DataTable', function () {
    var datatable;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                datatable_1.DataTable
            ]
        });
        fixture = testing_1.TestBed.createComponent(datatable_1.DataTable);
        datatable = fixture.componentInstance;
    });
});
//# sourceMappingURL=datatable.spec.js.map