"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var tieredmenu_1 = require("./tieredmenu");
var animations_1 = require("@angular/platform-browser/animations");
describe('TieredMenu', function () {
    var tieredmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tieredmenu_1.TieredMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(tieredmenu_1.TieredMenu);
        tieredmenu = fixture.componentInstance;
    });
});
//# sourceMappingURL=tieredmenu.spec.js.map