"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var organizationchart_1 = require("./organizationchart");
var animations_1 = require("@angular/platform-browser/animations");
describe('OrganizationChart', function () {
    var organizationchart;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                organizationchart_1.OrganizationChart
            ]
        });
        fixture = testing_1.TestBed.createComponent(organizationchart_1.OrganizationChart);
        organizationchart = fixture.componentInstance;
    });
});
//# sourceMappingURL=organizationchart.spec.js.map