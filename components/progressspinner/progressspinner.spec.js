"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var progressspinner_1 = require("./progressspinner");
var animations_1 = require("@angular/platform-browser/animations");
describe('ProgressSpinner', function () {
    var progressspinner;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                progressspinner_1.ProgressSpinner
            ]
        });
        fixture = testing_1.TestBed.createComponent(progressspinner_1.ProgressSpinner);
        progressspinner = fixture.componentInstance;
    });
});
//# sourceMappingURL=progressspinner.spec.js.map