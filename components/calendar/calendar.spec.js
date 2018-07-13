"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var calendar_1 = require("./calendar");
var animations_1 = require("@angular/platform-browser/animations");
describe('Calendar', function () {
    var calendar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                calendar_1.Calendar
            ]
        });
        fixture = testing_1.TestBed.createComponent(calendar_1.Calendar);
        calendar = fixture.componentInstance;
    });
});
//# sourceMappingURL=calendar.spec.js.map