"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tristatecheckbox_1 = require("./tristatecheckbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('TriStateCheckbox', function () {
    var tristate;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tristatecheckbox_1.TriStateCheckbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(tristatecheckbox_1.TriStateCheckbox);
        tristate = fixture.componentInstance;
    });
});
//# sourceMappingURL=tristatecheckbox.spec.js.map