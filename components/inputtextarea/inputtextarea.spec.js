"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var inputtextarea_1 = require("./inputtextarea");
var animations_1 = require("@angular/platform-browser/animations");
describe('InputTextarea', function () {
    var inputtextarea;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inputtextarea_1.InputTextarea
            ]
        });
        fixture = testing_1.TestBed.createComponent(inputtextarea_1.InputTextarea);
        inputtextarea = fixture.componentInstance;
    });
});
//# sourceMappingURL=inputtextarea.spec.js.map