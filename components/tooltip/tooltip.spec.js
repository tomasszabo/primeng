"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tooltip_1 = require("./tooltip");
var animations_1 = require("@angular/platform-browser/animations");
describe('Tooltip', function () {
    var tooltip;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tooltip_1.Tooltip
            ]
        });
        fixture = testing_1.TestBed.createComponent(tooltip_1.Tooltip);
        tooltip = fixture.componentInstance;
    });
});
//# sourceMappingURL=tooltip.spec.js.map