"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var spinner_1 = require("./spinner");
var animations_1 = require("@angular/platform-browser/animations");
describe('Spinner', function () {
    var spinner;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                spinner_1.Spinner
            ]
        });
        fixture = testing_1.TestBed.createComponent(spinner_1.Spinner);
        spinner = fixture.componentInstance;
    });
    var triggerEvent = function (el, type) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    };
    it('should have value as 3 when up clicked 3 times', function () {
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();
        expect(spinner.value).toBe(3);
        expect(spinner.valueAsString).toBe('3');
    });
    it('should have value as -3 when down clicked 3 times', function () {
        fixture.detectChanges();
        var spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mousedown');
        fixture.detectChanges();
        expect(spinner.value).toBe(-3);
        expect(spinner.valueAsString).toBe('-3');
    });
    it('Should display the spinner value 0.75  ', function () {
        spinner.step = 0.25;
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        expect(spinner.value).toEqual(0.75);
        expect(spinner.valueAsString).toEqual('0.75');
    });
    it('Should display the formated value with thousand and decimal separator when input is filled by value 1234.1234', function () {
        spinner.precision = 4;
        var spinnerInput = spinner.inputfieldViewChild.nativeElement;
        spinnerInput.value = '1234.1234';
        triggerEvent(spinnerInput, 'keyup');
        fixture.detectChanges();
        expect(spinner.valueAsString).toEqual('1,234.1234');
    });
});
//# sourceMappingURL=spinner.spec.js.map