"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var megamenu_1 = require("./megamenu");
var animations_1 = require("@angular/platform-browser/animations");
describe('MegaMenu', function () {
    var megamenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                megamenu_1.MegaMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(megamenu_1.MegaMenu);
        megamenu = fixture.componentInstance;
    });
});
//# sourceMappingURL=megamenu.spec.js.map