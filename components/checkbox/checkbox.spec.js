"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var checkbox_1 = require("./checkbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('Checkbox', function () {
    var checkbox;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                checkbox_1.Checkbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(checkbox_1.Checkbox);
        checkbox = fixture.componentInstance;
    });
    it('should check the input on click', function () {
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });
});
//# sourceMappingURL=checkbox.spec.js.map