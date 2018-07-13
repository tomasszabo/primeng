"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var inplace_1 = require("./inplace");
var animations_1 = require("@angular/platform-browser/animations");
describe('Inplace', function () {
    var inplace;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inplace_1.Inplace
            ]
        });
        fixture = testing_1.TestBed.createComponent(inplace_1.Inplace);
        inplace = fixture.componentInstance;
    });
});
//# sourceMappingURL=inplace.spec.js.map