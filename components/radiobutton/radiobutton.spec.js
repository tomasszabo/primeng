"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var radiobutton_1 = require("./radiobutton");
var animations_1 = require("@angular/platform-browser/animations");
describe('RadioButton', function () {
    var radiobutton;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                radiobutton_1.RadioButton
            ]
        });
        fixture = testing_1.TestBed.createComponent(radiobutton_1.RadioButton);
        radiobutton = fixture.componentInstance;
    });
    it('should display active state initially when checked by default', function () {
        radiobutton.checked = true;
        fixture.detectChanges();
        var boxEl = fixture.nativeElement.querySelector('.ui-radiobutton-box');
        expect(boxEl.class).toContain('ui-state-active');
    });
});
//# sourceMappingURL=radiobutton.spec.js.map