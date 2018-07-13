"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var slidemenu_1 = require("./slidemenu");
var animations_1 = require("@angular/platform-browser/animations");
describe('SlideMenu', function () {
    var slidemenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                slidemenu_1.SlideMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(slidemenu_1.SlideMenu);
        slidemenu = fixture.componentInstance;
    });
});
//# sourceMappingURL=slidemenu.spec.js.map