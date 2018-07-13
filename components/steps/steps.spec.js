"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var steps_1 = require("./steps");
var animations_1 = require("@angular/platform-browser/animations");
describe('Steps', function () {
    var steps;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                steps_1.Steps
            ]
        });
        fixture = testing_1.TestBed.createComponent(steps_1.Steps);
        steps = fixture.componentInstance;
    });
});
//# sourceMappingURL=steps.spec.js.map