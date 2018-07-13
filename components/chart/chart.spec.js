"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var chart_1 = require("./chart");
var animations_1 = require("@angular/platform-browser/animations");
describe('UIChart', function () {
    var chart;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                chart_1.UIChart
            ]
        });
        fixture = testing_1.TestBed.createComponent(chart_1.UIChart);
        chart = fixture.componentInstance;
    });
});
//# sourceMappingURL=chart.spec.js.map