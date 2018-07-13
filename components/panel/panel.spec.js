"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var panel_1 = require("./panel");
var animations_1 = require("@angular/platform-browser/animations");
describe('Panel', function () {
    var panel;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                panel_1.Panel
            ]
        });
        fixture = testing_1.TestBed.createComponent(panel_1.Panel);
        panel = fixture.componentInstance;
    });
    it('should display the header', function () {
        panel.header = 'PrimeNG Panel Header';
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panel-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Panel Header');
    });
    it('should not render toggle icon when not toggleable', function () {
        fixture.detectChanges();
        var togglerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panel-titlebar-toggler'));
        expect(togglerEl).toBeNull();
    });
    it('should render toggle icon when toggleable', function () {
        panel.toggleable = true;
        fixture.detectChanges();
        var togglerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panel-titlebar-toggler'));
        expect(togglerEl).not.toBeNull();
    });
    it('should toggle the panel when toggler is clicked', testing_1.fakeAsync(function () {
        panel.toggleable = true;
        fixture.detectChanges();
        var togglerEl = fixture.nativeElement.querySelector('.ui-panel-titlebar-toggler');
        togglerEl.click();
        expect(panel.collapsed).toEqual(true);
        testing_1.tick(500);
        togglerEl.click();
        expect(panel.collapsed).toEqual(false);
    }));
});
//# sourceMappingURL=panel.spec.js.map