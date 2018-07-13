"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var colorpicker_1 = require("./colorpicker");
var animations_1 = require("@angular/platform-browser/animations");
describe('ColorPicker', function () {
    var colorpicker;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                colorpicker_1.ColorPicker
            ]
        });
        fixture = testing_1.TestBed.createComponent(colorpicker_1.ColorPicker);
        colorpicker = fixture.componentInstance;
    });
});
//# sourceMappingURL=colorpicker.spec.js.map