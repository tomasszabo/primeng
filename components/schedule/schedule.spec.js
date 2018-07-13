"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var schedule_1 = require("./schedule");
var animations_1 = require("@angular/platform-browser/animations");
describe('Schedule', function () {
    var schedule;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                schedule_1.Schedule
            ]
        });
        fixture = testing_1.TestBed.createComponent(schedule_1.Schedule);
        schedule = fixture.componentInstance;
    });
});
//# sourceMappingURL=schedule.spec.js.map