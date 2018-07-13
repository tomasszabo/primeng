"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var datalist_1 = require("./datalist");
var animations_1 = require("@angular/platform-browser/animations");
describe('DataList', function () {
    var datalist;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                datalist_1.DataList
            ]
        });
        fixture = testing_1.TestBed.createComponent(datalist_1.DataList);
        datalist = fixture.componentInstance;
    });
});
//# sourceMappingURL=datalist.spec.js.map