"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var inputswitch_1 = require("./inputswitch");
var animations_1 = require("@angular/platform-browser/animations");
describe('InputSwitch', function () {
    var inputswitch;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inputswitch_1.InputSwitch
            ]
        });
        fixture = testing_1.TestBed.createComponent(inputswitch_1.InputSwitch);
        inputswitch = fixture.componentInstance;
    });
});
//# sourceMappingURL=inputswitch.spec.js.map