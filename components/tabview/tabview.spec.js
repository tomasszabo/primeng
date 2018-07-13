"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tabview_1 = require("./tabview");
var animations_1 = require("@angular/platform-browser/animations");
describe('TabView', function () {
    var tabview;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tabview_1.TabView
            ]
        });
        fixture = testing_1.TestBed.createComponent(tabview_1.TabView);
        tabview = fixture.componentInstance;
    });
});
//# sourceMappingURL=tabview.spec.js.map