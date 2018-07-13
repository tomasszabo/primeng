"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var datascroller_1 = require("./datascroller");
var animations_1 = require("@angular/platform-browser/animations");
describe('DataScroller', function () {
    var datascroller;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                datascroller_1.DataScroller
            ]
        });
        fixture = testing_1.TestBed.createComponent(datascroller_1.DataScroller);
        datascroller = fixture.componentInstance;
    });
});
//# sourceMappingURL=datascroller.spec.js.map