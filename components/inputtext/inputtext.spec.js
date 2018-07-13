"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var inputtext_1 = require("./inputtext");
var animations_1 = require("@angular/platform-browser/animations");
describe('InputText', function () {
    var inputtext;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inputtext_1.InputText
            ]
        });
        fixture = testing_1.TestBed.createComponent(inputtext_1.InputText);
        inputtext = fixture.componentInstance;
    });
});
//# sourceMappingURL=inputtext.spec.js.map