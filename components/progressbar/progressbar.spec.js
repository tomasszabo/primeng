"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var progressbar_1 = require("./progressbar");
var animations_1 = require("@angular/platform-browser/animations");
describe('ProgressBar', function () {
    var progressbar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                progressbar_1.ProgressBar
            ]
        });
        fixture = testing_1.TestBed.createComponent(progressbar_1.ProgressBar);
        progressbar = fixture.componentInstance;
    });
});
//# sourceMappingURL=progressbar.spec.js.map