"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var growl_1 = require("./growl");
var animations_1 = require("@angular/platform-browser/animations");
describe('Growl', function () {
    var growl;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                growl_1.Growl
            ]
        });
        fixture = testing_1.TestBed.createComponent(growl_1.Growl);
        growl = fixture.componentInstance;
    });
});
//# sourceMappingURL=growl.spec.js.map