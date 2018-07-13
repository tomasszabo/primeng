"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var chips_1 = require("./chips");
var animations_1 = require("@angular/platform-browser/animations");
describe('Chips', function () {
    var chips;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                chips_1.Chips
            ]
        });
        fixture = testing_1.TestBed.createComponent(chips_1.Chips);
        chips = fixture.componentInstance;
    });
});
//# sourceMappingURL=chips.spec.js.map