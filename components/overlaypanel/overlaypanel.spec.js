"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var overlaypanel_1 = require("./overlaypanel");
var animations_1 = require("@angular/platform-browser/animations");
describe('OverlayPanel', function () {
    var overlaypanel;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                overlaypanel_1.OverlayPanel
            ]
        });
        fixture = testing_1.TestBed.createComponent(overlaypanel_1.OverlayPanel);
        overlaypanel = fixture.componentInstance;
    });
});
//# sourceMappingURL=overlaypanel.spec.js.map