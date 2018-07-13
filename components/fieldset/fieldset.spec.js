"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var fieldset_1 = require("./fieldset");
var animations_1 = require("@angular/platform-browser/animations");
describe('Fieldset', function () {
    var fieldset;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                fieldset_1.Fieldset
            ]
        });
        fixture = testing_1.TestBed.createComponent(fieldset_1.Fieldset);
        fieldset = fixture.componentInstance;
    });
    it('should display the legend', function () {
        fieldset.legend = 'PrimeNG Fieldset Legend';
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-fieldset-legend-text'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Fieldset Legend');
    });
    it('should not render toggle icon when not toggleable', function () {
        fixture.detectChanges();
        var toggleIcon = fixture.debugElement.query(platform_browser_1.By.css('.ui-fieldset-toggler'));
        expect(toggleIcon).toBeNull();
    });
    it('should render toggle icon when toggleable', function () {
        fieldset.toggleable = true;
        fixture.detectChanges();
        var toggleIcon = fixture.debugElement.query(platform_browser_1.By.css('.ui-fieldset-toggler'));
        expect(toggleIcon).not.toBeNull();
    });
    it('should toggle the fieldset when toggler is clicked', testing_1.fakeAsync(function () {
        fieldset.toggleable = true;
        fixture.detectChanges();
        var togglerEl = fixture.nativeElement.querySelector('.ui-fieldset-legend').children[0];
        togglerEl.click();
        expect(fieldset.collapsed).toEqual(true);
        testing_1.tick(500);
        togglerEl.click();
        expect(fieldset.collapsed).toEqual(false);
    }));
});
//# sourceMappingURL=fieldset.spec.js.map