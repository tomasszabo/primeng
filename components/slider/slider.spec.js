"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var slider_1 = require("./slider");
var animations_1 = require("@angular/platform-browser/animations");
describe('Slider', function () {
    var slider;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                slider_1.Slider
            ]
        });
        fixture = testing_1.TestBed.createComponent(slider_1.Slider);
        slider = fixture.componentInstance;
    });
});
//# sourceMappingURL=slider.spec.js.map