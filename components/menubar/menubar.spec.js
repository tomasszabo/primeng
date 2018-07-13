"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var menubar_1 = require("./menubar");
var animations_1 = require("@angular/platform-browser/animations");
describe('Menubar', function () {
    var menubar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                menubar_1.Menubar
            ]
        });
        fixture = testing_1.TestBed.createComponent(menubar_1.Menubar);
        menubar = fixture.componentInstance;
    });
});
//# sourceMappingURL=menubar.spec.js.map