"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var togglebutton_1 = require("./togglebutton");
var animations_1 = require("@angular/platform-browser/animations");
describe('ToggleButton', function () {
    var toggleButton;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                togglebutton_1.ToggleButton
            ]
        });
        fixture = testing_1.TestBed.createComponent(togglebutton_1.ToggleButton);
        toggleButton = fixture.componentInstance;
    });
    it('should display the OFF label when value is undefined', function () {
        toggleButton.offLabel = 'NO';
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button-text'));
        expect(labelEl.nativeElement.textContent).toBe('NO');
    });
    it('should display the ON label when clicked', function () {
        toggleButton.onLabel = 'YES';
        fixture.detectChanges();
        var clickEl = fixture.nativeElement.querySelector('.ui-togglebutton');
        clickEl.click();
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button-text'));
        expect(labelEl.nativeElement.textContent).toBe('YES');
    });
    it('Should display as checked when value is true by default', function () {
        toggleButton.checked = true;
        fixture.detectChanges();
        expect(toggleButton.checked).toBe(true);
    });
});
//# sourceMappingURL=togglebutton.spec.js.map