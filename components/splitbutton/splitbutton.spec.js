"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var splitbutton_1 = require("./splitbutton");
var animations_1 = require("@angular/platform-browser/animations");
describe('SplitButton', function () {
    var splitbutton;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                splitbutton_1.SplitButton
            ]
        });
        fixture = testing_1.TestBed.createComponent(splitbutton_1.SplitButton);
        splitbutton = fixture.componentInstance;
    });
});
//# sourceMappingURL=splitbutton.spec.js.map