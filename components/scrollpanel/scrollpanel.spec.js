"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var scrollpanel_1 = require("./scrollpanel");
var animations_1 = require("@angular/platform-browser/animations");
describe('ScrollPanel', function () {
    var scrollpanel;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                scrollpanel_1.ScrollPanel
            ]
        });
        fixture = testing_1.TestBed.createComponent(scrollpanel_1.ScrollPanel);
        scrollpanel = fixture.componentInstance;
    });
});
//# sourceMappingURL=scrollpanel.spec.js.map