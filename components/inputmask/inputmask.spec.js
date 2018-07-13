"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var inputmask_1 = require("./inputmask");
var animations_1 = require("@angular/platform-browser/animations");
describe('InputMask', function () {
    var inputmask;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inputmask_1.InputMask
            ]
        });
        fixture = testing_1.TestBed.createComponent(inputmask_1.InputMask);
        inputmask = fixture.componentInstance;
    });
});
//# sourceMappingURL=inputmask.spec.js.map