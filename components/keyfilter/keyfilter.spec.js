"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var keyfilter_1 = require("./keyfilter");
var animations_1 = require("@angular/platform-browser/animations");
describe('KeyFilter', function () {
    var keyfilter;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                keyfilter_1.KeyFilter
            ]
        });
        fixture = testing_1.TestBed.createComponent(keyfilter_1.KeyFilter);
        keyfilter = fixture.componentInstance;
    });
});
//# sourceMappingURL=keyfilter.spec.js.map