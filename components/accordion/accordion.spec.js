"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var accordion_1 = require("./accordion");
var animations_1 = require("@angular/platform-browser/animations");
describe('Accordion', function () {
    var accordion;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                accordion_1.Accordion
            ]
        });
        fixture = testing_1.TestBed.createComponent(accordion_1.Accordion);
        accordion = fixture.componentInstance;
    });
});
//# sourceMappingURL=accordion.spec.js.map